import express from 'express';
import {
  ListJobs,
  AddJob,
  RemoveJob,
  SingleJob,
  EditJob,
  getJobStats,
} from '../controllers/jobController.js';

import authUser from '../middleware/auth.js';

const router = express.Router();

router.post('/add', authUser, AddJob);

router.post('/edit', authUser, EditJob);

router.post('/remove', authUser, RemoveJob);

router.post('/single', SingleJob);

router.get('/list', ListJobs);

router.get('/stats', getJobStats);

export default router;
