import { Outlet } from "react-router-dom";
import { LOGIN_PAGE_BACKGROUND_IMAGE } from "../utils/constants";
import Header from "./Header";

export default function Authentication() {
  return (
      <div className="relative h-screen w-screen">
      <Header />
      <img
        className="h-full w-full object-cover"
        src={LOGIN_PAGE_BACKGROUND_IMAGE}
        alt="background"
      />
      <Outlet />
    </div>
  );
}