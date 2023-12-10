import * as dao from "./dao.js";

function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    app.post("/api/users", createUser);

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    app.delete("/api/users/:userId", deleteUser);

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    app.get("/api/users", findAllUsers);

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    app.get("/api/users/:userId", findUserById);

    const findUserByUsername = async (req, res) => {
        const user = await dao.findUserByUsername(req.params.username);
        res.json(user);
    };
    app.get("/api/users/:username", findUserByUsername);

    const updateUser = async (req, res) => {
        const {userId} = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session["currentUser"] = currentUser;
        res.json(status);
    };
    app.put("/api/users/:userId", updateUser);

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({message: "Username already taken"});
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    app.post("/api/users/signup", signup);

    const signin = async (req, res) => {
        const { username, password } = req.body;
        try {
            const currentUser = await dao.findUserByCredentials(username, password);
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } catch (error) {
            res.status(401).json({ message: "Invalid username or password" });
        }
    };
    app.post("/api/users/signin", signin);

    const signout = async (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    app.post("/api/users/signout", signout);

    const account = async (req, res) => {
        res.json(req.session["currentUser"]);
    };
    app.post("/api/users/account", account);



    app.post("/api/users/:userId/like", async (req, res) => {
        try {
            const { userId } = req.params;
            const { exerciseId } = req.body;
            const updatedUser = await dao.addLikedExercise(userId, exerciseId);
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: "Could not add liked exercise", error: error.message });
        }
    });

    app.post("/api/users/:userId/unlike", async (req, res) => {
        try {
            const { userId } = req.params;
            const { exerciseId } = req.body;
            const updatedUser = await dao.removeLikedExercise(userId, exerciseId);
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: "Could not remove liked exercise", error: error.message });
        }
    });

}

export default UserRoutes;