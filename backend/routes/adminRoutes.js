import express from "express";
import {
  getAllUsers,
  getAllJobsAdmin,
  getAllApplicationsAdmin,
  getDashboardStats,
  deleteUser,
  updateUserRole,
  deleteJobAdmin,
  deleteApplicationAdmin,
} from "../controllers/adminController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.get("/stats", isAuthenticated, isAdmin, getDashboardStats);
router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.get("/jobs", isAuthenticated, isAdmin, getAllJobsAdmin);
router.get("/applications", isAuthenticated, isAdmin, getAllApplicationsAdmin);
router.delete("/user/:id", isAuthenticated, isAdmin, deleteUser);
router.put("/user/role/:id", isAuthenticated, isAdmin, updateUserRole);
router.delete("/job/:id", isAuthenticated, isAdmin, deleteJobAdmin);
router.delete("/application/:id", isAuthenticated, isAdmin, deleteApplicationAdmin);

export default router;
