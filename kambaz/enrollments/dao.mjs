import { randomUUID } from "node:crypto";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const existingEnrollment = db.enrollments.find(
      (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
    if (existingEnrollment) {
      return existingEnrollment;
    }

    const enrollment = { _id: randomUUID(), user: userId, course: courseId };
    db.enrollments.push(enrollment);
    return enrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    return { acknowledged: true };
  }

  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((enrollment) => enrollment.user === userId);
  }

  function findEnrollmentsForCourse(courseId) {
    return db.enrollments.filter((enrollment) => enrollment.course === courseId);
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
  };
}
