const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    projectname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

projectSchema.statics.createproject = async function (
  projectname,
  description,
  startDate,
  endDate
) {
  if (!projectname || !description || !startDate || !endDate) {
    throw Error("All Field is required");
  }

  const exists = await this.findOne({ projectname });

  if (exists) {
    throw Error("Project Name is already use");
  }
  const project = await this.create({
    projectname,
    description,
    startDate,
    endDate,
  });

  return project;
};

module.exports = mongoose.model("Project", projectSchema);
