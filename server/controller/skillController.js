import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Skill } from "../models/skillSchema.js";
import ErrorHandler from "../middlewares/error.js"; // Ensure this is the correct path
import cloudinary from "cloudinary"; // Ensure Cloudinary is configured properly

export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
    // Log the entire req.files object for debugging
    console.log("FILES RECEIVED:", req.files);

    // Check if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Skills SVG required!", 400));
    }

    try {
        // Normalize file field names (trim spaces)
        const files = {};
        Object.keys(req.files).forEach((key) => {
            files[key.trim()] = req.files[key];
        });

        // Destructure normalized files and retrieve name from req.body
        const { svg } = files;
        const { title, proficiency } = req.body;

        // Check if the required fields are present
        if (!title || !proficiency) {
            return next(new ErrorHandler("Please fill the full form!", 400));
        }

        if (!svg || !svg.tempFilePath) {
            return next(new ErrorHandler("SVG file is required!", 400));
        }

        // Upload SVG to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
            svg.tempFilePath,
            { folder: "PORTFOLIO_SKILLS_SVGS" }
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
            return next(new ErrorHandler("Failed to upload SVG!", 500));
        }

        // Save the skill to the database
        const newSkill = await Skill.create({
            title,
            proficiency,
            svg: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });

        // Send a success response
        res.status(201).json({
            success: true,
            message: "Skill added successfully",
            skill: newSkill,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
    // Implementation for deleting skill
    const { id } = req.params;

    // Fetch the software application from the database
    const skill = await Skill.findById(id);

    if (!skill) {
        return next(new ErrorHandler("Skill Not Found!", 404));
    }

    const skillSvgId = skill.svg.public_id;

    // Delete the SVG from Cloudinary
    await cloudinary.uploader.destroy(skillSvgId);

    // Delete the software application from the database
    await skill.deleteOne();

    res.status(200).json({
        success: true,
        message: "Skill Deleted!",
    });
});

export const updateSkill = catchAsyncErrors(async (req, res, next) => {
    // Implementation for updating skill
    const { id } = req.params;

    // Fetch the software application from the database
    let skill = await Skill.findById(id);

    if (!skill) {
        return next(new ErrorHandler("Skill Not Found!", 404));
    }

    const {proficiency} = req.body;
     skill = await Skill.findByIdAndUpdate(id, {proficiency},{
        new: true,
        runValidators: true,
        useFindAndModify: false,
     });
     res.status(200).json({
        success: true,
        message: "Skill updated",
        skill,

     })

});

export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
    // Implementation for getting all skills
    const skills = await Skill.find();
    res.status(200).json({
        success: true,
        skills,
    });

});
