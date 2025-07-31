import { useState } from "react";
import { LOGIN_PAGE_BACKGROUND_IMAGE } from "../utils/constants";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validate";
import loginUserFunction from "../utils/loginUserFunction";
import registerUserFunction from "../utils/registerUserFunction";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [forgetPassword, setForgetPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSignUp = () => {
    setError(null);
    setForgetPassword(false);
    setName("");
    setEmail("");
    setPassword("");
    setIsSignInPage(!isSignInPage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(email, password);
    if (error) {
      setError(error);
      return;
    }

    if (isSignInPage) {
      const loginResponse = await loginUserFunction(email, password);
      console.log("This is the login response", loginResponse);

      if (loginResponse && loginResponse.success === false) {
        setError(loginResponse.message || "Login failed");

        if (loginResponse.message === "Invalid Password") {
          setForgetPassword(true);
        }

        return;
      }

      setError(null);
      setForgetPassword(false);
      dispatch(addUser(loginResponse.data));
    } else {
      const registerResponse = await registerUserFunction(name, email, password);
      console.log("This is the register response", registerResponse);

      if (registerResponse && registerResponse.success === false) {
        setError(registerResponse.message || "Registration failed");
        return;
      }

      navigate("/authentication/email-verification");
      setError(null);
    }
  };

  return (
      <div className="absolute top-1/2 left-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white p-6 sm:p-10 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <label className="text-2xl sm:text-3xl font-bold block mb-6">
            {isSignInPage ? "Sign In" : "Sign Up"}
          </label>

          {!isSignInPage && (
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full rounded-sm p-3 block mt-6 bg-[#3534345d]"
            />
          )}

          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full rounded-sm p-3 my-4 block bg-[#3534345d]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full rounded-sm p-3 bg-[#3534345d]"
          />

          <div className="text-red-600 font-bold mt-3">
            {error}
            {forgetPassword && (
              <div className="text-red-600 font-bold mt-3">
                Forgot Password?
                <span
                  className="font-semibold cursor-pointer hover:text-[#c90d0dde] ml-1"
                  onClick={() => navigate("/authentication/email-verification", {state : {forgetPassword}})}
                >
                  Click here to reset.
                </span>
              </div>
            )}
          </div>

          <button
            className="w-full p-3 bg-[rgba(201,13,13,0.87)] mt-4 rounded-sm font-semibold cursor-pointer"
            type="submit"
          >
            {isSignInPage ? "Sign In" : "Sign Up"}
          </button>

          <div className="mt-6 text-sm sm:text-base">
            {isSignInPage ? (
              <p>
                New to MovieAI?
                <span
                  className="font-semibold cursor-pointer hover:text-[#c90d0dde] ml-1"
                  onClick={handleSignUp}
                >
                  Sign Up Now.
                </span>
              </p>
            ) : (
              <p>
                Already a User?
                <span
                  className="font-semibold cursor-pointer hover:text-[#c90d0dde] ml-1"
                  onClick={handleSignUp}
                >
                  Sign In Now.
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
  );
};

export default Login;
