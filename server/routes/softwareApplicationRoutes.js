import express from "express";
import { addNewApplication, deleteApplications, getAllApplications  } from "../controller/softwareApplicationController.js";
import { isAuthenticated } from "../middlewares/auth.js"
const router = express.Router();

// POST route to send a message
router.post("/add", isAuthenticated, addNewApplication );
// Route to send a message
router.get("/getall", getAllApplications);
// delete message
router.delete("/delete/:id",isAuthenticated, deleteApplications);

export default router;

