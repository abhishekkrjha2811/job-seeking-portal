import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";
import { ApplicationStatus } from "../nodemailer/Email.js";

// Student applies for a job with resume upload
export const applyForJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  // Only students can apply for jobs
  if (role !== "Student") {
    return next(
      new ErrorHandler("Only Students are allowed to apply for jobs.", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload PNG, JPEG, WEBP, or PDF file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath,
    {
      folder: "resumes"
    }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Student",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  // Get the job poster's details
  const jobPoster = await User.findById(jobDetails.postedBy);
  if (!jobPoster) {
    return next(new ErrorHandler("Job poster not found!", 404));
  }

  // Job poster can be either Professor or Student
  const employerID = {
    user: jobDetails.postedBy,
    role: jobPoster.role,
  };

  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    jobId,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

// Professor/Job poster gets all applications for their posted jobs
export const getProfessorApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    // Only Professors and Students (who posted jobs) can see applications for their jobs
    if (role === "Admin") {
      return next(
        new ErrorHandler("Admins should use admin route to view all applications.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id })
      .populate("applicantID.user", "firstName lastName email phone branch year")
      .populate("jobId", "title category location");
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// Student gets all their submitted applications
export const getStudentApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    // Only Students can view their applications
    if (role !== "Student") {
      return next(
        new ErrorHandler("Only Students can access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id })
      .populate("employerID.user", "firstName lastName email")
      .populate("jobId", "title category location");
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// Student deletes their own application
export const deleteStudentApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role !== "Student") {
      return next(
        new ErrorHandler("Only Students can delete their applications.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    // Ensure student can only delete their own application
    if (application.applicantID.user.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You are not authorized to delete this application!", 403));
    }
    
    // Delete resume from Cloudinary if exists
    if (application.resume && application.resume.public_id) {
      try {
        await cloudinary.uploader.destroy(application.resume.public_id);
      } catch (error) {
        console.error("Error deleting resume from Cloudinary:", error);
      }
    }
    
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);

// Professor/Job poster updates application status (Accept/Reject)
export const updateApplicationStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Admin") {
      return next(
        new ErrorHandler("Admins cannot update application status.", 400)
      );
    }
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return next(new ErrorHandler("Invalid status value.", 400));
    }

    // Populate the application with user and job details
    const application = await Application.findById(id)
      .populate({
        path: 'applicantID.user',
        select: 'firstName lastName email'
      })
      .populate({
        path: 'employerID.user',
        select: 'firstName lastName companyName'
      })
      .populate({
        path: 'jobId',
        select: 'title category'
      });

    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }

    // Ensure only the job poster can update the application status
    if (application.employerID.user._id.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You are not authorized to update this application!", 403));
    }

    application.status = status;
    await application.save();

    // Send email notification
    const applicantEmail = application.email; // Email is stored directly in application
    const applicantName = application.name; // Name is stored directly in application
    const jobTitle = application.jobId.title;
    const companyName = application.employerID.user.companyName || `${application.employerID.user.firstName} ${application.employerID.user.lastName}`;

    console.log('Sending email to:', applicantEmail, 'Status:', status);
    await ApplicationStatus(applicantEmail, applicantName, jobTitle, companyName, status);

    res.status(200).json({
      success: true,
      message: "Application status updated!",
      application,
    });
  }
);


