import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";
import { NotifyAll } from "../nodemailer/Email.js";
import { fetchAllUsers } from "./adminController.js";

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({}).populate('postedBy', 'firstName lastName email role');
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  // Both Students and Professors can post jobs
  if (role !== "Student" && role !== "Professor") {
    return next(
      new ErrorHandler("Only Students and Professors can post jobs.", 400)
    );
  }
  
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary.",
        400
      )
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }

  // Handle optional document/attachment upload
  let jobDocument = {};
  if (req.files && req.files.jobDocument) {
    const { jobDocument: uploadedFile } = req.files;
    
    const allowedFormats = [
      "image/png", 
      "image/jpeg", 
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (!allowedFormats.includes(uploadedFile.mimetype)) {
      return next(
        new ErrorHandler(
          "Invalid file type. Please upload PNG, JPEG, WEBP, PDF, or DOC file.", 
          400
        )
      );
    }

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        uploadedFile.tempFilePath,
        {
          folder: "job_documents"
        }
      );

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed to upload document to Cloudinary", 500)
        );
      }

      jobDocument = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      console.error("Upload error:", error);
      return next(new ErrorHandler("Failed to upload document", 500));
    }
  }

  const postedBy = req.user._id;
  const posterEmail = req.user.email;
  const posterName = `${req.user.firstName} ${req.user.lastName}`;
  
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
    jobDocument: Object.keys(jobDocument).length > 0 ? jobDocument : undefined,
  });

  // Fetch all users and send bulk notification
  try {
    const allUsers = await fetchAllUsers();
    const onlystudents = allUsers.filter(user => user.role === "Student");
    console.log(`Fetched ${allUsers.length} users for notification`);
    
    const postedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    await NotifyAll(
      posterEmail,
      posterName,
      job.title,
      job.description,
      job.salaryFrom ? `₹${job.salaryFrom} - ₹${job.salaryTo}` : `₹${job.fixedSalary}`,
      job.location,
      job.city,
      job.jobDocument,
      
      job.category,
      `${job.city}, ${job.country}`,
      postedDate,
      onlystudents
    );
  } catch (emailError) {
    console.log('Email notification error:', emailError);
    // Don't fail the job posting if email fails
  }

  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  // Only Students and Professors can view their posted jobs
  if (role !== "Student" && role !== "Professor") {
    return next(
      new ErrorHandler("Only Students and Professors can view their jobs.", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Student" && role !== "Professor") {
    return next(
      new ErrorHandler("Only Students and Professors can update jobs.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  // Ensure user can only update their own job
  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not authorized to update this job!", 403));
  }

  // Handle optional document/attachment upload for update
  if (req.files && req.files.jobDocument) {
    const { jobDocument: uploadedFile } = req.files;
    
    const allowedFormats = [
      "image/png", 
      "image/jpeg", 
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (!allowedFormats.includes(uploadedFile.mimetype)) {
      return next(
        new ErrorHandler(
          "Invalid file type. Please upload PNG, JPEG, WEBP, PDF, or DOC file.", 
          400
        )
      );
    }

    // Delete old document from Cloudinary if exists
    if (job.jobDocument && job.jobDocument.public_id) {
      try {
        await cloudinary.uploader.destroy(job.jobDocument.public_id);
      } catch (error) {
        console.error("Error deleting old document:", error);
      }
    }

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        uploadedFile.tempFilePath,
        {
          folder: "job_documents"
        }
      );

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed to upload document to Cloudinary", 500)
        );
      }

      req.body.jobDocument = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      console.error("Upload error:", error);
      return next(new ErrorHandler("Failed to upload document", 500));
    }
  }

  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!",
    job,
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Student" && role !== "Professor") {
    return next(
      new ErrorHandler("Only Students and Professors can delete jobs.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  // Ensure user can only delete their own job
  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not authorized to delete this job!", 403));
  }
  
  // Delete document from Cloudinary if exists
  if (job.jobDocument && job.jobDocument.public_id) {
    try {
      await cloudinary.uploader.destroy(job.jobDocument.public_id);
    } catch (error) {
      console.error("Error deleting document from Cloudinary:", error);
    }
  }
  
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate('postedBy', 'firstName lastName email role');
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
