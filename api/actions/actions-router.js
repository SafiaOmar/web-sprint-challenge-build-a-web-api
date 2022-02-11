// Write your "actions" router here!
const express = require("express");
const { checkActionId, checkActionInfo } = require("./actions-middlware");
const Actions = require("./actions-model");
const router = express.Router();
const Projects = require("../projects/projects-model");

router.get("/", async (req, res, next) => {
  try {
    const action = await Actions.get();
    res.json(action);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkActionId, async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    res.json(action);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkActionInfo, async (req, res, next) => {
  const { project_id } = req.body;
  const project = await Projects.get(project_id);
  try {
    if (project) {
      const action = await Actions.insert(req.body);
      res.status(201).json(action);
    }else{next()}
  } catch (err) {
    next(err);
  }
});

router.put("/:id", checkActionId, checkActionInfo, async (req, res, next) => {
    try {
      const action = await Actions.update(req.params.id, req.update);
      res.status(200).json(action);
    } catch (err) {
      next(err);
    }
  });
  
  router.delete('/:id', checkActionId, async (req, res, next)=> {
      try {
          const action = await Actions.remove(req.params.id)
          res.json(action)
      } catch (err) {
          next(err)
      }
  })
  
  module.exports = router;
  