import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/ProjectSchema.js";
import cloudinary from "cloudinary";

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    // Normalize field names (remove leading spaces)
    const normalizeField = (obj, field) => obj[` ${field}`] || obj[field];

    // Check if the request contains files
    const projectBanner = normalizeField(req.files, 'projectBanner');
    if (!projectBanner) {
      return next(new ErrorHandler("Project Banner Image Required", 400));
    }

    const title = normalizeField(req.body, 'title');
    const description = normalizeField(req.body, 'description');
    const gitRepoLink = normalizeField(req.body, 'gitRepoLink');
    const projectLink = normalizeField(req.body, 'projectLink');
    const technologies = normalizeField(req.body, 'technologies');
    const stack = normalizeField(req.body, 'stack');
    const deployed = normalizeField(req.body, 'deployed');

    // Validate required fields
    if (
      !title ||
      !description ||
      !gitRepoLink ||
      !projectLink ||
      !technologies ||
      !stack ||
      deployed === undefined
    ) {
      return next(new ErrorHandler("Please Provide All Details!", 400));
    }

    // Parse technologies and stack, ensuring they are arrays
    const parseTechnologiesOrStack = (input) => {
      if (Array.isArray(input)) return input;
      if (typeof input === 'string') {
        try {
          const parsed = JSON.parse(input);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {
          // If JSON parsing fails, split by comma
          return input.split(',').map(item => item.trim());
        }
      }
      return [];
    };

    const parsedTechnologies = parseTechnologiesOrStack(technologies);
    const parsedStack = parseTechnologiesOrStack(stack);

    // Upload image to Cloudinary
    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        { folder: "PROJECT IMAGE" }
      );
    } catch (uploadError) {
      console.error("Cloudinary Upload Error:", uploadError);
      return next(new ErrorHandler("Failed to upload image!", 500));
    }

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary Error"
      );
      return next(new ErrorHandler("Failed to upload image!", 500));
    }

    // Create a new project in the database
    const newProject = await Project.create({
      title,
      description,
      gitRepoLink,
      projectLink,
      technologies: parsedTechnologies,
      stack: parsedStack,
      deployed: deployed === "true" || deployed === true,
      projectBanner: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "New Project Added!",
      project: newProject,
    });
  } catch (error) {
    console.error("Error Adding Project:", error);
    return next(new ErrorHandler(error.message || "Failed to add project", 500));
  }
});


// update project
export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    technologies: req.body.technologies,
    stack: req.body.stack,
    deployed: req.body.deployed,
  };

  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler('Project not found', 404));
  }

  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;

    // Delete old project banner if it exists
    if (project.projectBanner && project.projectBanner.public_id) {
      await cloudinary.uploader.destroy(project.projectBanner.public_id);
    }

    // Upload new project banner to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "PROJECT IMAGE" }
    );

    newProjectData.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const updatedProject = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Project Updated",
    project: updatedProject,
  });

});


/// delete project
export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  
  const project = await Project.findById(id);
  
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  await project.deleteOne();
  
  res.status(200).json({
    success: true,
    message: "Project Deleted",
  });
});


// get all projects
export const getAllProjects = catchAsyncErrors(async(req, res, next)=>{
const projects = await Project.find();
res.status(200).json({
  success: true,
  projects,
})
})


// get single project

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  
  if (!id) {
    return next(new ErrorHandler("Project ID is required", 400));
  }

  const project = await Project.findById(id);
  
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});