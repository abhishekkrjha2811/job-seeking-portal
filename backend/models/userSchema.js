import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptJs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  
  lastName: {
    type: String
  
  },

  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [3, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  year: {
    type:Number
  },
  branch:{
    type:String,
    required: [true, "Please select a branch"],
    enum:["cse","me","ece"],
  },
  
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Student","Professor","Admin"],
  },
   profilePic: {type: String, default: "/profile.png"},
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    verificationToken: { type: String, default: null },
    verificationTokenExpiresAt: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);