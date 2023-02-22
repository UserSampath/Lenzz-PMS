const Project = require("../models/projectmodel");
const jwt = require("jsonwebtoken");
const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const app = express();

//create a new project
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const project = async (req, res) => {
  const { projectname, description, startDate, endDate } = req.body;

  try {
    const project = await Project.createproject(
      projectname,
      description,
      startDate,
      endDate
    );

    res.status(200).json({ project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all projects
const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });

  res.status(200).json({ projects });
};
//get single project

const getProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }
  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "No such project" });
  }

  res.status(200).json({ project });
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }
  const project = await Project.findOneAndDelete({ _id: id });
  if (!project) {
    return res.status(404).json({ error: "No such project" });
  }
  res.status(200).json({ project });
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const project = await Project.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!project) {
    return res.status(404).json({ error: "No such project" });
  }
  res.status(200).json({ project });
};

const changepersentage = async (req, res) => {
  const { startDate, endDate } = req.body;
  const totalMilliseconds = moment(endDate).diff(startDate);
  const remainingMilliseconds = moment(endDate).diff(moment());
  const percentage =
    Math.round((remainingMilliseconds / totalMilliseconds) * 100 * 100) / 100;

  res.status(200).json({ percentage });
};

module.exports = {
  project,
  getProjects,
  getProject,
  changepersentage,
  deleteProject,
  updateProject,
};
