import mongoose from "mongoose";
import schema from "./schema.js";

const exerciseModel = mongoose.model("exercises", schema);

export default exerciseModel;