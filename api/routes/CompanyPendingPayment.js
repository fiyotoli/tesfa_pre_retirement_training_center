import express from "express";
import {
  AddCompany,
  EditCompany,
  RemoveCompany,
  SingleCompany,
  ListCompanies,
  getCompanyStats,
} from "../controllers/CompanyPendingPayment.js";

import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const router = express.Router();

// Add Company
router.post("/add", AddCompany);

// Edit Company
router.post("/edit", EditCompany);

// Remove Company
router.post("/remove", RemoveCompany);

// Get Single Company
router.post("/single", SingleCompany);

// List All Companies
router.get("/list", ListCompanies);

// Company Stats
router.get("/stats", getCompanyStats);

export default router;
