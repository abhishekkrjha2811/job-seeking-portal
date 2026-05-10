import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";

// Helper function to fetch all users (no response sent)
export const fetchAllUsers = async () => {
  const users = await User.find().select("email firstName lastName role");
  return users;
};

// Get all users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin" && role !== "Professor") {
    return next(new ErrorHandler("Only Admin can access this resource.", 403));
  }

  const users = await User.find().select("-password");
  
  const stats = {
    totalUsers: users.length,
    students: users.filter(u => u.role === "Student").length,
    Professors: users.filter(u => u.role === "Professor").length,
    admins: users.filter(u => u.role === "Admin").length,
  };

  res.status(200).json({
    success: true,
    users,
    stats,
  });

  return users;
});

// Get all jobs (admin view)
export const getAllJobsAdmin = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(new ErrorHandler("Only Admin can access this resource.", 403));
  }

  const jobs = await Job.find().populate("postedBy", "name email role");
  
  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => !j.expired).length,
    expiredJobs: jobs.filter(j => j.expired).length,
  };

  res.status(200).json({
    success: true,
    jobs,
    stats,
  });
});

// Get all applications (admin view)
export const getAllApplicationsAdmin = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(new ErrorHandler("Only Admin can access this resource.", 403));
  }

  const applications = await Application.find()
    .populate("applicantID.user", "name email role")
    .populate("employerID.user", "name email role")
    .populate("jobId", "title category");
  
  const stats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => a.status === "Pending").length,
    acceptedApplications: applications.filter(a => a.status === "Accepted").length,
    rejectedApplications: applications.filter(a => a.status === "Rejected").length,
  };

  res.status(200).json({
    success: true,
    applications,
    stats,
  });
});

// Get dashboard statistics
export const getDashboardStats = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(new ErrorHandler("Only Admin can access this resource.", 403));
  }

  const totalUsers = await User.countDocuments();
  const totalStudents = await User.countDocuments({ role: "Student" });
  const totalProfessors = await User.countDocuments({ role: "Professor" });
  const totalAdmins = await User.countDocuments({ role: "Admin" });

  const totalJobs = await Job.countDocuments();
  const activeJobs = await Job.countDocuments({ expired: false });
  const expiredJobs = await Job.countDocuments({ expired: true });

  const totalApplications = await Application.countDocuments();
  const pendingApplications = await Application.countDocuments({ status: "Pending" });
  const acceptedApplications = await Application.countDocuments({ status: "Accepted" });
  const rejectedApplications = await Application.countDocuments({ status: "Rejected" });

  // Recent activities
  const recentJobs = await Job.find().sort({ jobPostedOn: -1 }).limit(5).populate("postedBy", "name role");
  const recentApplications = await Application.find()
    .sort({ _id: -1 })
    .limit(5)
    .populate("applicantID.user", "name")
    .populate("jobId", "title");

  res.status(200).json({
    success: true,
    stats: {
      users: {
        total: totalUsers,
        students: totalStudents,
        Professors: totalProfessors,
        admins: totalAdmins,
      },
      jobs: {
        total: totalJobs,
        active: activeJobs,
        expired: expiredJobs,
      },
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
      },
    },
    recentActivities: {
      recentJobs,
      recentApplications,
    },
  });
});

// Delete user (admin only)
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(new ErrorHandler("Only Admin can delete users.", 403));
  }

  const { id } = req.params;
  const user = await User.findById(id);
  
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.user._id.toString()) {
    return next(new ErrorHandler("You cannot delete yourself!", 400));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
  });
});

// Update user role (admin only)
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(new ErrorHandler("Only Admin can update user roles.", 403));
  }

  const { id } = req.params;
  const { newRole } = req.body;

  if (!["Student", "Professor", "Admin"].includes(newRole)) {
    return next(new ErrorHandler("Invalid role!", 400));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  user.role = newRole;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User role updated successfully!",
    user,
  });
});

// Delete job (admin only)
export const deleteJobAdmin = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(new ErrorHandler("Only Admin can delete jobs.", 403));
  }

  const { id } = req.params;
  const job = await Job.findById(id);
  
  if (!job) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted successfully!",
  });
});

// Delete application (admin only)
export const deleteApplicationAdmin = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(new ErrorHandler("Only Admin can delete applications.", 403));
  }

  const { id } = req.params;
  const application = await Application.findById(id);
  
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: "Application deleted successfully!",
  });
});
