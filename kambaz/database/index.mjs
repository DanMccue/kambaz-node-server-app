import fs from "node:fs";
import path from "node:path";

const readJson = (relativePath) => {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const json = fs.readFileSync(absolutePath, "utf8");
  return JSON.parse(json);
};

const courses = readJson("app/(kambaz)/database/courses.json");
const modules = readJson("app/(kambaz)/database/modules.json");
const assignments = readJson("app/(kambaz)/database/assignments.json");
const users = readJson("app/(kambaz)/database/users.json");
const enrollments = readJson("app/(kambaz)/database/enrollments.json");
const grades = [];

const db = { courses, modules, assignments, users, enrollments, grades };

export default db;
