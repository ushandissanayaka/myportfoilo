import express from "express";
import {postTimeLine, deleteTimeLine, getAllTimeLines  } from "../controller/timeLineController.js";
import { isAuthenticated } from "../middlewares/auth.js"
const router = express.Router();

// POST route to send a message
router.post("/add", isAuthenticated, postTimeLine);
// Route to send a message
router.get("/getall", getAllTimeLines);
// delete message
router.delete("/delete/:id",isAuthenticated, deleteTimeLine);

export default router;

