import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

// Middleware to check if user has admin role
export const isAdmin = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "Admin") {
    return next(new ErrorHandler("Access denied. Admin role required.", 403));
  }
  next();
});

// Middleware to check if user is Student or Professor
export const isStudentOrProfessor = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "Student" && req.user.role !== "Professor") {
    return next(new ErrorHandler("Access denied. Student or Professor role required.", 403));
  }
  next();
});

// Middleware to check if user is Student
export const isStudent = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "Student") {
    return next(new ErrorHandler("Access denied. Student role required.", 403));
  }
  next();
});

// Middleware to check if user is Professor
export const isProfessor = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "Professor") {
    return next(new ErrorHandler("Access denied. Professor role required.", 403));
  }
  next();
});

// Middleware to authorize multiple roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

