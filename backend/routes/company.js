const express = require("express");

const {
  createCompany,
  checkcompany,
} = require("../controllers/companyController");
const router = express.Router();
router.post("/createcompany", createCompany);
router.post("/checkcompany", checkcompany);
module.exports = router;
