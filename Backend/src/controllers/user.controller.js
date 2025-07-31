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

  // Normalize email to ensure consistency
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

  // console.log("This is data that is returned to me bu the user", user);

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

  console.log("Hello from the loginUser controller")

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  // Normalize email for consistent searching
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  console.log("This is the user that we get from the database when we try to login", user);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  console.log("NODDDDE_ENVIRONMENT", process.env.NODE_ENVIRONMENT);

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

  console.log(
    "This is the user that we get from the request in the logout controller which is given by the auth middleware",
    user
  );

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

  console.log("Extracted email:", email);
  
  if (!email || email.trim() === "") {
    throw new ApiError(400, "Email is required");
  }

  
  const normalizedEmail = email.toLowerCase().trim();
  console.log("Original email:", email);
  console.log("Normalized email:", normalizedEmail);

  // Debug: Check all users in database

  // console.log("All users in database:", allUsers.map(u => ({ email: u.email, username: u.username })));

  const user = await User.findOne({email: normalizedEmail});
  console.log("Found user:", user);

  if(!user){
    throw new ApiError(401, "User not found. Please check your email or register first.");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  console.log("this is the generated otp", otp);
  console.log("this is expiration time of the otp", otpExpiry);

  user.emailVerified = false;
  user.emailVerificationOTP = otp;
  user.emailVerificationExpiry = otpExpiry;

  const data = await user.save({ validateBeforeSave: false });

  console.log("This is the data that we get after saving the otp and expiry time", data);

  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: false, // Use explicit TLS
  requireTLS: true, // Force TLS
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3' // Bypass security restrictions
  }
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
 
  console.log(`This is the otp that we get from the frontend ${otp} and this is the email ${email}`);
  if (!otp) {
    throw new ApiError(400, "OTP is required");
  }

  // Normalize email for consistent searching
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({email: normalizedEmail});

  if(!user){
    throw new ApiError(401, "User not found");
  }
  console.log("This is the otp from the database", user.emailVerificationOTP)
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

  console.log("This is the data we get after the email is verified", data);

  return res.status(200).json(new ApiResponse(200, {
    user
  }, "Email verified successfully"));
});

const SetNewPassword = asyncHandler(async (req, res) => {
  const { newPassword, userId } = req.body;

  console.log("this is the userId that i get from the reset password page", userId);

  const user = await User.findById(userId).select("-password -refreshToken");

  if(!user){
    throw new ApiError(401, "User not found");
  }

  console.log("This is the data of the user that we get from the auth middleware", user);

  if (newPassword.trim() === "") {
    throw new ApiError(400, "Password is required");
  }

  if (user.emailVerified === false) {
    throw new ApiError(400, "Email is not verified");
  }

  user.password = newPassword;

  const data = await user.save({ validateBeforeSave: false });

  console.log("this is the data that we get after setting the new password", data);

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
