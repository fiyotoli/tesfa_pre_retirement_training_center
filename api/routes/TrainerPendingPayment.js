import express from 'express';
import {
  ListEmployee,
  AddEmployee,
  RemoveEmployee,
  SingleEmployee,
  EditEmployee,
  getEmployeeStats,
  ListFeaturedEmployees,  // <-- import new controller
} from '../controllers/TrainerPendingPayment.js';

import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const router = express.Router();

router.post('/add', upload.fields([{ name: 'image1', maxCount: 1 }]), AddEmployee);

router.post('/edit', upload.fields([{ name: 'image1', maxCount: 1 }]), EditEmployee);

router.post('/remove', RemoveEmployee);

router.post('/single', SingleEmployee);

router.get('/list', ListEmployee);

// New route to get featured employees
router.get('/featured', ListFeaturedEmployees);

router.get('/stats', getEmployeeStats);

export default router;
