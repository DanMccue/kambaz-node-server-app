import ModulesDao from "./dao.mjs";

export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModuleForCourse = (req, res) => {
    const { courseId } = req.params;
    const moduleData = { ...req.body, course: courseId };
    const newModule = dao.createModule(moduleData);
    res.json(newModule);
  };

  const deleteModule = (req, res) => {
    const { moduleId } = req.params;
    const status = dao.deleteModule(moduleId);
    res.json(status);
  };

  const updateModule = (req, res) => {
    const { moduleId } = req.params;
    const updatedModule = dao.updateModule(moduleId, req.body);
    if (!updatedModule) {
      res.sendStatus(404);
      return;
    }
    res.json(updatedModule);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}
