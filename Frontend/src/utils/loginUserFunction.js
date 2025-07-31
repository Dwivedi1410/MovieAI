import axios from "axios";

export default async function loginUserFunction(email, password) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log(BASE_URL, email, password)

  try{
    const response = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        {
          email: email.trim(),
          password: password.trim(),
        },
        { withCredentials: true }
      );

      return response.data;
  }
  catch(error){
    console.log("Error in loginUserFunction", error);
    return error.response.data;
  }
}
