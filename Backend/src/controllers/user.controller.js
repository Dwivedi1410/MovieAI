import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";
import { emailVerificationTemplate } from "../utils/emailTemplates.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating Access and Refresh Token");
  }
};

const RegisterUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ $or: [{ username }, { email: normalizedEmail }] });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    username,
    email: normalizedEmail,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");


  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENVIRONMENT === "production",
    sameSite: process.env.NODE_ENVIRONMENT === "production" ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User loggedIn successfully"
      )
    );
});

const LogoutUser = asyncHandler(async (req, res) => {
  const user = req.user;


  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENVIRONMENT === "production",
    sameSite: process.env.NODE_ENVIRONMENT === "production" ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User LoggedOut"));
});

const SendEmailOtp = asyncHandler(async (req, res) => {
  const {email} = req.body;

  
  if (!email || email.trim() === "") {
    throw new ApiError(400, "Email is required");
  }

  
  const normalizedEmail = email.toLowerCase().trim();


  const user = await User.findOne({email: normalizedEmail});


  if(!user){
    throw new ApiError(401, "User not found. Please check your email or register first.");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 10 * 60 * 1000;


  user.emailVerified = false;
  user.emailVerificationOTP = otp;
  user.emailVerificationExpiry = otpExpiry;

  const data = await user.save({ validateBeforeSave: false });

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

      user: process.env.GMAIL_USERNAME,

      pass: process.env.GMAIL_APP_PASSWORD,

    },

  });

  const mailOptions = {
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: "Email Verification OTP",
    html: emailVerificationTemplate(otp),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new ApiError(500, "Failed to send email");
    } else {
      console.log("Email sent :" + info.response);
    }
  });

  return res.status(200).json(new ApiResponse(200, {}, "Email OTP sent successfully"));
});

const VerifyEmail = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;
 
  if (!otp) {
    throw new ApiError(400, "OTP is required");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({email: normalizedEmail});

  if(!user){
    throw new ApiError(401, "User not found");
  }

  if (user.emailVerificationOTP !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  if (user.emailVerificationExpiry < Date.now()) {
    throw new ApiError(400, "OTP expired");
  }

  user.emailVerified = true;
  user.emailVerificationOTP = "";
  user.emailVerificationExpiry = 0;

  const data = await user.save({ validateBeforeSave: false });


  return res.status(200).json(new ApiResponse(200, {
    user
  }, "Email verified successfully"));
});

const SetNewPassword = asyncHandler(async (req, res) => {
  const { newPassword, userId } = req.body;


  const user = await User.findById(userId).select("-password -refreshToken");

  if(!user){
    throw new ApiError(401, "User not found");
  }

  if (newPassword.trim() === "") {
    throw new ApiError(400, "Password is required");
  }

  if (user.emailVerified === false) {
    throw new ApiError(400, "Email is not verified");
  }

  user.password = newPassword;

  const data = await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Password set successfully"));
});

const userProfile = asyncHandler(async(req, res) => {
  const user = req.user;
  if(!user){
    throw new ApiError(401, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
})

export { RegisterUser, LoginUser, LogoutUser, SendEmailOtp, VerifyEmail, SetNewPassword, userProfile };
