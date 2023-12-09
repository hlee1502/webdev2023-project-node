import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        email: String,
        dob: Date,
        role: {type: String, enum: ["PERSONAL", "TRAINER"], default: "PERSONAL"},
        likedExercises: {type: [String], default: []}
    },
    {collection: "users"}
);

export default userSchema;