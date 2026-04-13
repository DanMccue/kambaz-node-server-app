import mongoose from "mongoose";
import schema from "./schema.mjs";
const model = mongoose.model("CourseModel", schema);
export default model;
