const express = require("express");

const {
  project,
  changepersentage,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/creatproject", project);
router.get("/showproject", getProjects);
router.get("/:id", getProject);
router.delete("/:id", deleteProject);
router.patch("/:id", updateProject);
router.post("/changepersentage", changepersentage);

module.exports = router;
