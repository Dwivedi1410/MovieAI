import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const forgetPassword = location.state?.forgetPassword;


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
  
    const normalizedEmail = email.toLowerCase().trim();
  
    if (!normalizedEmail.match(/^[^@ ]+@[^@ ]+\.[^@ ]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }

  
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    axios.post(
      `${BASE_URL}/api/v1/user/send-otp`,
      { email: normalizedEmail },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      setError(null);
      navigate("/authentication/otp-verification", { state: { forgetPassword, email: normalizedEmail } });
    })
    .catch((err) => {
      setError(err?.response?.data?.message || "An error occurred.");
    });
  
    console.log("Email entered successfully");
  };
  

  return (
    <div className="absolute top-1/2 left-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white p-6 sm:p-10 rounded-lg shadow-lg">
      <form onSubmit={handleEmailSubmit}>
        <label className="text-2xl sm:text-3xl font-bold block mb-6">Email Verification</label>
        <input
          type="email"
          placeholder="Enter Your Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full rounded-sm p-3 my-4 block bg-[#3534345d]"
        />
        <p className="text-red-600 font-bold mt-3">{error}</p>
        <button
          className="w-full p-3 bg-[rgba(201,13,13,0.87)] mt-4 rounded-sm font-semibold cursor-pointer"
          type="submit"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
}
