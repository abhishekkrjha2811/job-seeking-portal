import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please provide your name!"],
        minLength: [3,"Name must be at least 3 characters!"],
        maxLenght:[30,"Name cannt be exceed 30 characters!"],
    },
    email:{
        type: String,
        required :[true,"Please provide your email!"],
        validate:[validator.isEmail,"Please provide correct email id!"],
    },
    phone:{
        type:Number,
        required :[true,"Please provide your phone number"],
    },
    password:{
        type:String,
        required:[true,"Please enter the password !"],
        minLength: [8,"Password must be at least 8 characters!"],
        maxLenght:[32,"Password cannt be exceed 32 characters!"],
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["Job seeker","Employer"], 
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },

});

//hashing the password before saving in database

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

//comparing password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
    
};

//generating a jwt token for authorization

userSchema.method.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    });

};


export const User = mongoose.model("User",userSchema);