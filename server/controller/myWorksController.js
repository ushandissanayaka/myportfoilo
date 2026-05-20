import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { MyWorks } from "../models/myWorksSchema.js";

// POST: Create a new work entry
export const postMyWork = catchAsyncErrors(async (req, res, next) => {
    const { title, description, from, to } = req.body;

    if (!title || !description || !from) {
        return next(new ErrorHandler("Title, Description and From date are required!", 400));
    }

    const newWork = await MyWorks.create({
        title,
        description,
        timeLine: { from, to }
    });

    res.status(200).json({
        success: true,
        message: "Work Added Successfully!",
        newWork,
    });
});

// DELETE: Remove a work entry
export const deleteMyWork = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const work = await MyWorks.findById(id);
    if (!work) {
        return next(new ErrorHandler("Work not found!", 404));
    }
    await work.deleteOne();
    res.status(200).json({
        success: true,
        message: "Work deleted successfully!",
    });
});

// GET: Fetch all work entries
export const getAllMyWorks = catchAsyncErrors(async (req, res, next) => {
    const myWorks = await MyWorks.find();
    res.status(200).json({
        success: true,
        myWorks,
    });
});
