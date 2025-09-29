// routes/testimonialRoute.js
import express from 'express';
import { createTestimonial, deleteTestimonial, getAllTestimonials, getTestimonialStats, updateTestimonial } from '../controllers/testimonialController.js';
import authUser from '../middleware/auth.js';

const router = express.Router();

router.post('/add',authUser, createTestimonial);     // Admin adds testimonial
router.get('/all', getAllTestimonials);     // Frontend displays

router.post('/edit', authUser, updateTestimonial);
router.post('/remove', authUser, deleteTestimonial);
// testimonialRoute.js
router.get('/stats', getTestimonialStats);
export default router;
