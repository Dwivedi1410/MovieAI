import axios from "axios";

export default async function registerUserFunction(name, email, password) {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    console.log(BASE_URL, name, email, password)

    try{
        const response = await axios.post(`${BASE_URL}/api/v1/user/register`, {username : name, email, password}, {withCredentials: true})
        return response.data;
    }
    catch(error){
        console.log("Error in registerUserFunction", error);
        return error.response.data;
    }
} 