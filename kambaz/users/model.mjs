import mongoose from "mongoose";
import schema from "./schema.mjs";
const model = mongoose.model("UserModel", schema);
export default model;
