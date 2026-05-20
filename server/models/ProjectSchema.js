import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter project title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter project description"],
  },
  gitRepoLink: {
    type: String,
    required: [true, "Please enter project git repo link"],
  },
  projectLink: {
    type: String,
    required: [true, "Please enter project link"],
  },
  technologies: {
    type: [String],
    required: [true, "Please enter technologies used"],
  },
  stack: {
    type: [String],
    required: [true, "Please enter project stack"],
  },
  deployed: {
    type: Boolean,
    required: [true, "Please specify if the project is deployed"],
  },
  projectBanner: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const Project = mongoose.model("Project", projectSchema);