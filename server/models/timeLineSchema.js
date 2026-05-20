import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title Required!"]
    },
    description: {
        type: String,
        required: [true, "Description Required!"]
    },
    timeLine: {
        from: {
            type: String,
            required: [true, "Timeline Starting date is required!"],
           
        },
        to: {
            type: String,
            default: ""
        }
    },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
