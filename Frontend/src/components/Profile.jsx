import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE_BACKGROUND_IMAGE } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import Header from "./Header";

export default function Profile() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if(!user){
        return (<h1>Loading ....</h1>)
    }
    const { username, email } = user;
    const handleLogout = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_API_BASE_URL;
            await axios.post(`${BASE_URL}/api/v1/user/logout`, {}, {
                withCredentials: true,
            });
            
            dispatch(removeUser());
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
           
        }
    };

  
    return (
        <div className="relative min-h-screen">
            <Header />
            <div className="absolute inset-0">
                <img 
                    src={LOGIN_PAGE_BACKGROUND_IMAGE} 
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-2xl">
                    <div className="bg-black/80 backdrop-blur-sm text-white p-8 rounded-2xl shadow-2xl border border-white/10">
                        <div className="text-center mb-8">
                            
                            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                                User Profile
                            </h1>
                            
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <h2 className="text-xl font-semibold mb-4 text-center">
                                    Account Information
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold">👤</span>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Username</p>
                                            <p className="text-white font-medium">{username || "Not available"}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold">📧</span>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Email</p>
                                            <p className="text-white font-medium">{email || "Not available"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button 
                                    onClick={handleLogout}
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl py-4 px-8 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Logout
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}