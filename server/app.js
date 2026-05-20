import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import myWorksRouter from "./routes/myWorksRoutes.js";
import applicationRouter from "./routes/softwareApplicationRoutes.js";
import skillRouter from "./routes/skillRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



app.use(cors({
    origin: function(origin, callback) {
        // Allow all origins
        callback(null, true);
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        mongoUriConfigured: Boolean(process.env.MONGO_URI),
        mongoReadyState: mongoose.connection.readyState,
    });
});

app.use("/api/v1", async (req, res, next) => {
    try {
        await dbConnection();
        next();
    } catch (error) {
        next(error);
    }
});

// Define API routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/myWorks", myWorksRouter);
app.use("/api/v1/softwareApplication", applicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

// Error handling middleware
app.use(errorMiddleware);

export default app;
