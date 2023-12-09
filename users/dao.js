import userModel from "./model.js";

export const createUser = (user) => userModel.create(user);
export const findAllUsers = () => userModel.find();
export const findUserById = (userId) => userModel.findById(userId);
export const findUserByUsername = (username) => userModel.findOne({ username: username });
export const findUserByCredentials = async (username, password) => {
    const user = await userModel.findOne({ username, password });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    return user;
};
export const updateUser = (userId, user) => userModel.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });

