import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: String,
    type: String,
    muscle: String,
    difficulty: String,
    instructions: String
    },
    {collection: "exercises"}
);

export default exerciseSchema;