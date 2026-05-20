import express from "express";
import { postMyWork, deleteMyWork, getAllMyWorks } from "../controller/myWorksController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postMyWork);
router.get("/getall", getAllMyWorks);
router.delete("/delete/:id", isAuthenticated, deleteMyWork);

export default router;
