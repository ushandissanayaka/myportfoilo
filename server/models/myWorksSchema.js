import mongoose from "mongoose";

const myWorksSchema = new mongoose.Schema({
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
            required: [true, "Starting date is required!"],
        },
        to: {
            type: String,
            default: ""
        }
    },
});

export const MyWorks = mongoose.model("MyWorks", myWorksSchema);
