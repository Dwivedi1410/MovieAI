import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import EmailVerification from "./components/EmailVerification";
import Authentication from "./components/Authentication";
import OtpVerification from "./components/OtpVerification";
import ResetPassword from "./components/ResetPassword";
import AiSearch from "./components/AiSearch";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/home/ai-search",
          element: <AiSearch />,
        },
        {
          path: "/movie-detail/:id",
          element: <MovieDetails />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/authentication",
      element: <Authentication />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "/authentication/email-verification",
          element: <EmailVerification />,
        },
        {
          path: "/authentication/otp-verification",
          element: <OtpVerification />,
        },
        {
          path: "/authentication/set-new-password/:id",
          element: <ResetPassword />,
        },
      ],
    },
  ]);

  return (
    <Provider store={appStore}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
};

export default App;
