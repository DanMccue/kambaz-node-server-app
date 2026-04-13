import mongoose from "mongoose";
import schema from "./schema.mjs";
const model = mongoose.model("AssignmentModel", schema);
export default model;
