import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

export default function OtpVerification() {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const forgetPassword = location.state?.forgetPassword;
  const email = location.state?.email;
 

  // console.log("This is the value of forget Password from otp verification page", forgetPassword)

  const handleOtpSubmit =  async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter a valid OTP.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // console.log("BASE_URL:", BASE_URL);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user/verify_email`, {
        otp,
        email
      }, {
        withCredentials: true
      });
      
      dispatch(addUser(response.data.data.user));
      // console.log("API Response:", response?.data?.data?.user);
      // console.log("forgetPassword value:", forgetPassword);
      
      if(forgetPassword) {
        navigate("/authentication/set-new-password")
      } else {
        navigate("/")
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.message || "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="absolute top-1/2 left-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white p-6 sm:p-10 rounded-lg shadow-lg">
    <form onSubmit={handleOtpSubmit}>
      <label className="text-2xl sm:text-3xl font-bold block mb-6">OTP Verification</label>
      <input
        type="text"
        placeholder="Enter Your Received OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border w-full rounded-sm p-3 my-4 block bg-[#3534345d]"
        disabled={isLoading}
      />
      <p className="text-red-600 font-bold mt-3">{error}</p>
      <button
        className="w-full p-3 bg-[rgba(201,13,13,0.87)] mt-4 rounded-sm font-semibold cursor-pointer disabled:opacity-50"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  </div>
  );
}