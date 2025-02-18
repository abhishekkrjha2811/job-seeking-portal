import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name!"],
        minlength:[3,"Name must contain at least 3 character!"],
        maxlength:[30,"Name cannot exceed 30 characters!"],
    },
    email:{
        type:String,
        validator:[validator.isEmail,"Please provide a valid email!"],
        required:[true,"Please provide your email id!"],
    },
    coverLetter:{
        type:String,
        required:[true,"Please provide your cover letter!"],  
    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone number!"], 
    },
    address:{
        type:String,
        required:[true,"Please provide your address!"],
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }

    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        role:{
            type:String,
            enum:["Job seeker"],
            required:true
        }

    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }
});

export const Application = mongoose.model("Application", applicationSchema);