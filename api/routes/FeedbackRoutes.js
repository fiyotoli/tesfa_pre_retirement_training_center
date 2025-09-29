import express from "express";
import { addFeedback, deleteFeedback, getFeedbackStats, listFeedbacks } from "../controllers/FeedbackController.js";
import authUser from "../middleware/auth.js";

const router = express.Router();

router.post("/add", addFeedback);
router.get("/list", listFeedbacks);
router.delete('/:id', authUser, deleteFeedback);

// feedbackRoute.js
router.get('/stats', getFeedbackStats);
export default router;
