import * as projectService from '../services/projectService.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects(req.userId);
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, description, content } = req.body;
    const project = await projectService.createProject(req.userId, { name, description, content });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { name, description, content } = req.body;
    const project = await projectService.updateProject(req.params.id, req.userId, { name, description, content });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProject(req.params.id, req.userId);
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id, req.userId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
