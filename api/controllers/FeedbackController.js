import FeedbackModel from "../models/FeedbackModel.js";

// Add new feedback
export const addFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newFeedback = new FeedbackModel({ name, email, message });
    await newFeedback.save();

    res.json({ success: true, message: "Feedback submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// List all feedbacks (for admin)
export const listFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params; // note this change
    const deleted = await FeedbackModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Feedback not found." });
    }

    res.json({ success: true, message: "Feedback deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// GET /api/feedback/stats
export const getFeedbackStats = async (req, res) => {
  try {
    const count = await FeedbackModel.countDocuments();
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get feedback stats" });
  }
};
