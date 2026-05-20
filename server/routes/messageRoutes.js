import express from "express";
import { getAllMessages, sendMessage, deleteMessage } from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js"
const router = express.Router();

// POST route to send a message
router.post("/send", sendMessage);
// Route to send a message
router.get("/getall", getAllMessages);
// delete message
router.delete("/delete/:id", isAuthenticated, deleteMessage);

export default router;

