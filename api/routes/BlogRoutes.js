import express from 'express';
import {
  ListBlog,
  AddBlog,
  RemoveBlog,
  SingleBlog,
  EditBlog,
  getBlogStats
} from '../controllers/BlogController.js';

import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post('/add',authUser, upload.fields([{ name: 'image1', maxCount: 1 }]), AddBlog);
blogRouter.post('/edit', upload.fields([{ name: 'image1', maxCount: 1 }]), EditBlog);
blogRouter.post('/remove', authUser, RemoveBlog);
blogRouter.post('/single', SingleBlog);
blogRouter.get('/list', ListBlog);
// blogRoute.js
blogRouter.get('/stats', getBlogStats);

export default blogRouter;
