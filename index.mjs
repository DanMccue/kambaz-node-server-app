import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import Hello from "./Hello.mjs";
import Lab5Routes from "./Lab5/index.mjs";
import db from "./kambaz/database/index.mjs";
import UserRoutes from "./kambaz/users/routes.mjs";
import CourseRoutes from "./kambaz/courses/routes.mjs";
import ModulesRoutes from "./kambaz/modules/routes.mjs";
import AssignmentsRoutes from "./kambaz/assignments/routes.mjs";
import EnrollmentsRoutes from "./kambaz/enrollments/routes.mjs";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

const serverEnv = process.env.SERVER_ENV || "development";
if (serverEnv !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
Lab5Routes(app);
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Kambaz server listening on http://localhost:${port}`);
});
