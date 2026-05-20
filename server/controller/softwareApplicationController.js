import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Timeline } from "../models/timeLineSchema.js";
import { softwareApplication } from "../models/softwareApplicationSchema.js";
import ErrorHandler from "../middlewares/error.js"; // Ensure this is the correct path
import cloudinary from "cloudinary"; // Ensure Cloudinary is configured properly

// Add new software application
export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
    // Log the entire req.files object for debugging
    console.log("FILES RECEIVED:", req.files);

    // Check if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Software application Icon/svg required!", 400));
    }

    try {
        // Normalize file field names (trim spaces)
        const files = {};
        Object.keys(req.files).forEach((key) => {
            files[key.trim()] = req.files[key];
        });

        // Destructure normalized files and retrieve name from req.body
        const { svg } = files;
        const { name } = req.body;

        // Check if the required fields are present
        if (!svg || !svg.tempFilePath) {
            return next(new ErrorHandler("SVG file is required!", 400));
        }

        if (!name) {
            return next(new ErrorHandler("Software name is required!", 400));
        }

        // Upload SVG to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
            svg.tempFilePath, 
            { folder: "PORTFOLIO_SOFTWARE_APPLICATIONS" }
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
            return next(new ErrorHandler("Failed to upload SVG!", 500));
        }

        // Create a new software application in the database
        const newSoftwareApplication = await softwareApplication.create({
            name,
            svg: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            }
        });

        // Return the success response
        res.status(200).json({
            success: true,
            message: "New software application added!",
            softwareApplication: newSoftwareApplication,
        });
    } catch (error) {
        return next(new ErrorHandler("Error while processing the files", 500));
    }
});

// Delete application
export const deleteApplications = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    // Fetch the software application from the database
    const appToDelete = await softwareApplication.findById(id);

    if (!appToDelete) {
        return next(new ErrorHandler("Software Application Not Found!", 404));
    }

    const softwareApplicationSvgId = appToDelete.svg.public_id;

    // Delete the SVG from Cloudinary
    await cloudinary.uploader.destroy(softwareApplicationSvgId);

    // Delete the software application from the database
    await appToDelete.deleteOne();

    res.status(200).json({
        success: true,
        message: "Software Application Deleted!",
    });
});

// Get all applications
export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
    const softwareApplications = await softwareApplication.find();
res.status(200).json({
    success: true,
    softwareApplications ,
});
});
