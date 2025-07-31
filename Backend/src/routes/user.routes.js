import { Router } from "express";
import { 
  RegisterUser, 
  LoginUser, 
  LogoutUser, 
  SendEmailOtp, 
  VerifyEmail, 
  SetNewPassword, 
  userProfile 
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/send-otp").post(SendEmailOtp);
router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/verify_email").post(VerifyEmail);
router.route("/logout").post(verifyJWT, LogoutUser);
router.route("/new-password").post(SetNewPassword);
router.route("/profile").get(verifyJWT, userProfile);

export default router;












