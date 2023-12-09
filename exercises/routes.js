import * as dao from "./dao.js";

function ExerciseRoutes(app) {
    const searchExercise = async (req, res) => {
    try {
        const { input } = req.body;

        const query = {
            $or: [
                { name: { $regex: new RegExp(input, 'i') } },
                { type: { $regex: new RegExp(input, 'i') } },
                { muscle: { $regex: new RegExp(input, 'i') } },
            ]
        };

        const exercises = await dao.searchExercises(query);
        res.json(exercises);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

    app.post("/api/exercises", searchExercise);
}

export default ExerciseRoutes;