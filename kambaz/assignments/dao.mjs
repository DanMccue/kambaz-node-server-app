import { randomUUID } from "node:crypto";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return db.assignments.filter((assignment) => assignment.course === courseId);
  }

  function findAssignmentById(assignmentId) {
    return db.assignments.find((assignment) => assignment._id === assignmentId);
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: randomUUID() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter(
      (assignment) => assignment._id !== assignmentId
    );
    return { acknowledged: true };
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = findAssignmentById(assignmentId);
    if (!assignment) {
      return null;
    }
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
