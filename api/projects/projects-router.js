// Write your "projects" router here!
const express = require('express')
const { checkProjectId, checkInfoBody } = require('./projects-middleware')
const Projects = require('./projects-model')
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const projects = await Projects.get()
        res.json(projects)
    }catch(err){
        next(err)
    }
})

router.get('/:id', checkProjectId, async (req, res, next) => {
    try{
        const project = await Projects.get(req.params.id)
        res.json(project)
    }catch(err){
        next(err)
    }
})

router.post('/', checkInfoBody, async (req, res, next) => {
    try{
        const project = await Projects.insert(req.body)
        res.status(201).json(project)
    }catch(err){
        next(err);
    }
})

router.put("/:id", checkProjectId, checkInfoBody, async (req, res, next) => {
    try {
      const project = await Projects.update(req.params.id, req.update);
      res.status(200).json(project);
    } catch (err) {
      next(err);
    }
  });
  
  router.delete("/:id", checkProjectId, async (req, res, next) => {
    try {
      const project = await Projects.remove(req.params.id);
      res.json(project);
    } catch (err) {
      next(err);
    }
  });
  
  router.get("/:id/actions", checkProjectId, async (req, res, next) => {
    try {
      const project = await Projects.getProjectActions(req.params.id);
      res.json(project);
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router;