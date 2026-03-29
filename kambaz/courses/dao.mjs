import { randomUUID } from "node:crypto";

export default function CoursesDao(db) {
  function findAllCourses() {
    return db.courses;
  }

  function findCourseById(courseId) {
    return db.courses.find((course) => course._id === courseId);
  }

  function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = db;
    return courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
  }

  function createCourse(course) {
    const newCourse = { ...course, _id: randomUUID() };
    db.courses = [...db.courses, newCourse];
    return newCourse;
  }

  function deleteCourse(courseId) {
    db.courses = db.courses.filter((course) => course._id !== courseId);
    db.enrollments = db.enrollments.filter(
      (enrollment) => enrollment.course !== courseId
    );
    db.modules = db.modules.filter((module) => module.course !== courseId);
    db.assignments = db.assignments.filter(
      (assignment) => assignment.course !== courseId
    );
    return { acknowledged: true };
  }

  function updateCourse(courseId, courseUpdates) {
    const course = findCourseById(courseId);
    if (!course) {
      return null;
    }
    Object.assign(course, courseUpdates);
    return course;
  }

  return {
    findAllCourses,
    findCourseById,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
