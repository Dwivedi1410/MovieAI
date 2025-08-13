import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((store) => store.user.user);
  // console.log("This is the user from reset password page", user);
  // const userId = user?._id;
  // console.log("This is the userId from reset password page", userId);

  const {id} = useParams();
  // console.log("This is the userId from reset password page", id);
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    try{
        const response = await axios.post(`${BASE_URL}/api/v1/user/new-password`, {
            newPassword,
            userId: id
        }, {
            withCredentials: true
        })

        // console.log(response.data);
        setError(null);
        dispatch(removeUser());
        navigate("/authentication");
    }
    catch(err){
        console.log(err);
        setError(err.response.data.message);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white p-6 sm:p-10 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <label className="text-2xl sm:text-3xl font-bold block mb-6">Reset Password</label>
        <input
          type="text"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border w-full rounded-sm p-3 my-4 block bg-[#3534345d]"
        />

        <input
          type="password"
          placeholder="Retype New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border w-full rounded-sm p-3 my-4 block bg-[#3534345d]"
        />

        <p className="text-red-600 font-bold mt-3">{error}</p>

        <button
          className="w-full p-3 bg-[rgba(201,13,13,0.87)] mt-4 rounded-sm font-semibold cursor-pointer"
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
