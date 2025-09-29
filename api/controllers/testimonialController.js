import Testimonial from '../models/testimonialModel.js';

// Create
export const createTestimonial = async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    await newTestimonial.save();
    res.status(201).json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateTestimonial = async (req, res) => {
  try {
    const { _id, name, title, gender, feedback } = req.body;

    const updated = await Testimonial.findByIdAndUpdate(
      _id,
      { name, title, gender, feedback },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.status(200).json({ success: true, testimonial: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.body;

    const deleted = await Testimonial.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// GET /api/testimonials/stats
export const getTestimonialStats = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get testimonial stats" });
  }
};
