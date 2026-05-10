import express from "express";
import {
  getProfessorApplications,
  deleteStudentApplication,
  getStudentApplications,
  applyForJob,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Student applies for a job with resume
router.post("/apply", isAuthenticated, applyForJob);

// Professor/Job poster views applications for their jobs
router.get("/professor/applications", isAuthenticated, getProfessorApplications);

// Student views their own applications
router.get("/student/applications", isAuthenticated, getStudentApplications);

// Student deletes their application
router.delete("/student/delete/:id", isAuthenticated, deleteStudentApplication);

// Professor/Job poster updates application status
router.put("/update-status/:id", isAuthenticated, updateApplicationStatus);

export default router;