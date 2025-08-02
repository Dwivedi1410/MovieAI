import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);
  const user = userState?.user;

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!user) {
        try {
          const BASE_URL = import.meta.env.VITE_API_BASE_URL;
          const response = await axios.get(`${BASE_URL}/api/v1/user/profile`, {
            withCredentials: true,
          });
          
          if (response.data.success) {
            dispatch(addUser(response.data.data));
          }
        } catch (error) {
          console.log("User not authenticated:", error.message);
        }
      }
    };

    checkAuthStatus();
  }, [user, dispatch]);

  return (
    <div className="no-scrollbar">
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
