import { randomUUID } from "node:crypto";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    return db.modules.filter((module) => module.course === courseId);
  }

  function findModuleById(moduleId) {
    return db.modules.find((module) => module._id === moduleId);
  }

  function createModule(module) {
    const newModule = { ...module, _id: randomUUID() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function deleteModule(moduleId) {
    db.modules = db.modules.filter((module) => module._id !== moduleId);
    return { acknowledged: true };
  }

  function updateModule(moduleId, moduleUpdates) {
    const moduleDoc = findModuleById(moduleId);
    if (!moduleDoc) {
      return null;
    }
    Object.assign(moduleDoc, moduleUpdates);
    return moduleDoc;
  }

  return {
    findModulesForCourse,
    findModuleById,
    createModule,
    deleteModule,
    updateModule,
  };
}
