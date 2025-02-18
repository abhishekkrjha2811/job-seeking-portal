import express from "express";
import {jobseekerGetAllApplications,jobseekerDeleteApplication, employeerGetAllApplications, postApplication} from "../controllers/applicationControllers.js";
import {isAuthorized} from "../middlewares/auth.js";

const router = express.Router();

router.get("/jobseeker/getall",isAuthorized,jobseekerGetAllApplications);
router.get("/employer/getall",isAuthorized,employeerGetAllApplications);
router.delete("/delete/:id",isAuthorized,jobseekerDeleteApplication);
router.post("/post",isAuthorized,postApplication);

export default router;