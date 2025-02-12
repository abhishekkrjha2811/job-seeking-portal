import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide job tittle"],
        minlength:[3,"Job title must contain at least 3 characters!"],
    },
    description:{
        type:String,
        required:[true,"Please provide job description"],
        minlength:[50,"Job description must contain at least 50 characters!"],
        maxlength:[350,"Job description cannot exceed 350 characters!"],
    },
    category:{
        type:String,
        required:[true,"job category is required"],
    },
    country:{
        type:String,
        required:[true,"Job country is required!"],

    },
    city:{
        type:String,
        required:[true,"Job city is required!"],

    },
    location:{
        type:String,
        required:[true,"Please provide exact location!"],
        minlength:[50,"Job location must contain at least 50 characters!"],
    },
    fixedSalary:{
        type:Number,
        minlength:[4,"Fixed salary must contain at least 4 digits!"],
        maxlength:[9,"Fixed salary cannot exceed 9 digits!"],
    },
    salaryFrom:{
        type:Number,
        minlength:[4,"Fixed from must contain at least 4 digits!"],
        maxlength:[9,"Fixed from cannot exceed 9 digits!"],
    },
    salaryTo:{
        type:Number,
        minlength:[4,"Fixed must contain at least 4 digits!"],
        maxlength:[9,"Fixed cannot exceed 9 digits!"],
    },
    expired:{
        type:Boolean,
        default:false,
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    
});

export const Job = mongoose.model("Job",jobSchema);