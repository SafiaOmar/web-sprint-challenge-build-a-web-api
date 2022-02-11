// add middlewares here related to actions
const Actions = require('./actions-model')

async function checkActionId(req, res, next) {
    try {
      const projectId = await Actions.get(req.params.id);
      if (projectId) {
        next();
      } else {
        next({ status: 404, message: "project with that id not found" });
      }
    } catch (err) {
      next(err);
    }
  }

  async function checkActionInfo(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    try {
      if (!project_id || !description || !notes) {
        next({ status: 400, message: "Name and description required" });
      } else {
        req.update = {project_id, description, notes, completed};
        next();
      }
    } catch (err) {
      next(err);
    }
  }

  module.exports = {
    checkActionId,
    checkActionInfo,
  }; 