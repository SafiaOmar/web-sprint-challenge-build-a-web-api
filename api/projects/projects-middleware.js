// add middlewares here related to projects
const Projects = require("./projects-model");

async function checkProjectId(req, res, next) {
  try {
    const projectId = await Projects.get(req.params.id);
    if (projectId) {
      next();
    } else {
      next({ status: 404, message: "project with that id not found" });
    }
  } catch (err) {
    next(err);
  }
}

async function checkInfoBody(req, res, next) {
  const { name, description, completed } = req.body;
  try {
    if (!name || !description || typeof completed ==='undefined') {
      next({ status: 400, message: "Name and description required" });
    } else {
      req.update = {name, description, completed};
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkProjectId,
  checkInfoBody,
};