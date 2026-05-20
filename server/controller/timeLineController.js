import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../models/timeLineSchema.js";


// POST: Create a new timeline
export const postTimeLine = catchAsyncErrors(async (req, res, next) => {
    const { title, description, from, to } = req.body;

    // Ensure required fields are provided
    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: 'Title and Description are required.',
        });
    }

    // Create new timeline
    const newTimeline = await Timeline.create({
        title,
        description,
        timeLine: { from, to }
    });

    res.status(200).json({
        success: true,
        message: "Timeline Added",
        newTimeline,
    });
});

export const deleteTimeLine = catchAsyncErrors(async (req, res, next) => {
    const{id} = req.params;
    const timeline = await Timeline.findById(id);
    if(!timeline){
        return next(new ErrorHandler("Timeline not found!", 404))
    }
  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "timeline deleted!",
  })
})

export const getAllTimeLines = catchAsyncErrors(async (req, res, next) => {
const timelines = await Timeline.find();
res.status(200).json({
    success: true,
    timelines,
});
})