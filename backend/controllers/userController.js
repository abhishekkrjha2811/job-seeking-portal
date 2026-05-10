import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

import { sendVerificationEamil ,sendWelcomeEmail } from "../nodemailer/Email.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { firstName,lastName, email, phone, password, role,branch,year } = req.body;
  if (!firstName || !email || !phone || !password || !role ||!branch ||!year) {
    return next(new ErrorHandler("Please fill full form!"));
  }


  console.log(firstName,email,branch,phone,password,role,year);


  const isEmail = await User.findOne({ email });
  // if (isEmail) {
  //   return next(new ErrorHandler("Email already registered!"));
  // }
  // const user = await User.create({
  //   firstName,
  //   lastName,
  //   email,
  //   phone,
  //   password,
  //   role,
  //   branch,
  //   year
  // });
  // sendToken(user, 201, res, "User Registered!");



  if (isEmail) {
            // Check if user is not verified and OTP has expired
            if (!exist.isVerified || exist.verificationTokenExpiresAt < Date.now()) {
                // Delete the expired user entry
                await userModel.deleteOne({ email: exist.email });

                // Log message to indicate entry deletion
                console.log("User OTP expired. Old entry deleted. Creating a new one.");

                // Generate new OTP and set new expiration time
                const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
                const verificationTokenExpiresAt = new Date(Date.now() + 1 * 60 * 1000); // OTP expiry in 5 minutes

               

                const newUser = new userModel({
                    name,
                    email,
                    password,
                    isVerified: false,
                    verificationToken, // New OTP
                    verificationTokenExpiresAt, // New expiry
                    lastLogin: new Date(),
                });

                // Save new user and send verification email
                await newUser.save();
                await sendVerificationEamil(newUser.email, verificationToken);

                // Return response with success and the new token
                const token = createToken(newUser._id);
                return res.status(200).json({
                    success: true,
                    message: "User registered successfully. A new OTP has been sent.",
                    newUser,
                    token,
                });
            } else {
                // If OTP has not expired or user is already verified
                return res.status(409).json({ success: false, message: "User already exists" });
            }
        }

   try{
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = new Date(Date.now() + 1 * 60 * 1000); // OTP expiry in 5 minutes

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            phone,
            role,
            branch,
            year,
            isVerified: false,
            verificationToken, // OTP
            verificationTokenExpiresAt, // Expiry
            lastLogin: new Date(),
        });

        await newUser.save();
        await sendVerificationEamil(newUser.email, verificationToken);

        //  sendToken(newUser, 201, res, " OTP Sent To your Email Please Verify!");
        res.status(201).json({
            success: true,
            message: " OTP has been sent to your email Please verify.",
            
        });

   }catch(err){
    console.log(err);
   }
});

export const VerfiyEmail=async(req,res)=>{
    try {
        const {otp}=req.body 
        console.log("received code from body",otp);
        const userp= await User.findOne({
            verificationToken:otp,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })

        console.log("user details with code",userp);
        if (!userp) {
            return res.status(400).json({success:false,message:"Inavlid or Expired Code"})
                
            }
          
     userp.isVerified=true;
     userp.verificationToken=undefined;
     userp.verificationTokenExpiresAt=undefined;
     await userp.save()
     await sendWelcomeEmail(userp.email,userp.name)
     sendToken(userp,201,res,"Email Verified Successfully")
           
    } catch (error) {
        console.log(error)
        return res.status(400).json({success:false,message:"internal server error"})
    }
}



export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role ,branch} = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, `User Logged In with role ${role} !`);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});