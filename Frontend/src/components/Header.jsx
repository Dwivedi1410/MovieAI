import { useDispatch, useSelector } from "react-redux";
import { HEADER_LOGO, USER_PROFILE_ICON } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser, setLoading, setError } from "../utils/userSlice";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  
  useEffect(() => {
    if(!user && !isLoading){
      dispatch(setLoading(true));
      axios
      .get(`${BASE_URL}/api/v1/user/profile`, { withCredentials: true })
      .then((res) => {
        console.log("This is the response that we get from the userProfile", res);
        dispatch(addUser(res.data.data));
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setError(error.message));
      });
    }
    
  }, [user, isLoading, dispatch]);

  const handleProfileIconClick = () => {
    if (!user) {
      navigate("/authentication");
    } else {
      navigate("/profile");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black via-black/60-to-transparent px-4 sm:px-6 md:px-8 py-3 flex flex-row items-center justify-between z-20 ">
      <img
        className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 object-contain"
        src={HEADER_LOGO}
        onClick={() => navigate("/")}
        alt="Netflix logo"
      />
      {user && (
        <div className="flex items-center gap-2">
          <button
            className="bg-white cursor-pointer rounded-2xl p-1 sm:p-2 hover:bg-gray-100 transition-colors"
            aria-label="AI Search"
            onClick={() => navigate("/home/ai-search")}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 md:w-6 md:h-6 text-red-700 font-"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-700"
            onClick={handleProfileIconClick}
            aria-label="Profile"
            type="button"
          >
            <img
              src={USER_PROFILE_ICON}
              alt="User Profile"
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg object-cover"
            />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
