import users from "./users.mjs";
import courses from "./courses.mjs";
import modules from "./modules.mjs";
import assignments from "./assignments.mjs";
import enrollments from "./enrollments.mjs";
import grades from "./grades.mjs";

const db = { users, courses, modules, assignments, enrollments, grades };

export default db;
