import CoursesDao from "./dao.mjs";
import EnrollmentsDao from "../enrollments/dao.mjs";

export default function CourseRoutes(app, db) {
  const coursesDao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findAllCourses = (req, res) => {
    const courses = coursesDao.findAllCourses();
    res.json(courses);
  };

  const findCourseById = (req, res) => {
    const { courseId } = req.params;
    const course = coursesDao.findCourseById(courseId);
    if (!course) {
      res.sendStatus(404);
      return;
    }
    res.json(course);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = coursesDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const newCourse = coursesDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = coursesDao.deleteCourse(courseId);
    res.json(status);
  };

  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const updated = coursesDao.updateCourse(courseId, req.body);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.json(updated);
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId", findCourseById);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
}
