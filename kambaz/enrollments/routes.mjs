import EnrollmentsDao from "./dao.mjs";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForCurrentUser = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const enrollments = dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };

  const enrollCurrentUserInCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollCurrentUserFromCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const status = dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(status);
  };

  const findEnrollmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  app.get("/api/users/current/enrollments", findEnrollmentsForCurrentUser);
  app.post(
    "/api/users/current/courses/:courseId/enrollment",
    enrollCurrentUserInCourse
  );
  app.delete(
    "/api/users/current/courses/:courseId/enrollment",
    unenrollCurrentUserFromCourse
  );
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
}
