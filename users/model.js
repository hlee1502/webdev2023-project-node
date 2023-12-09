import mongoose from "mongoose";
import schema from "./schema.js";

const userModel = mongoose.model("users", schema);

export default userModel;