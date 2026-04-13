import model from "./model.mjs";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  function findAssignmentById(assignmentId) {
    return model.findById(assignmentId);
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
  }

  function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
