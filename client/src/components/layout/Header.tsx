import React from "react";
import logo from "../../../public/chat-logo.png";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { logout } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";

export const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, setId, isLoading } = UseAuthUser();

  const handleGoToLogIn = () => {
    navigate("/login");
  };
  const handleGoToHome = () => {
    navigate("/");
  };

  const handleLogOut = async () => {
    await logout();
    setUser("");
    setId("");
  };

  return (
    <>
      <header className="relative flex flex-wrap items-center justify-between px-2 py-3 text-white font-DM text-3xl">
        <nav className="container px-4 mx-auto flex">
          <div className="w-full flex ">
            <div
              className="flex cursor-pointer items-center"
              onClick={handleGoToHome}
            >
              <img
                src={logo}
                alt="chat-logo"
                className="object-contain h-24 w-40"
              />
              <h1 className="text-2xl font-normal hidden sm:inline">
                MY CHAT HUB
              </h1>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center">
              <Loading />
            </div>
          ) : user ? (
            <ul className="flex items-center whitespace-nowrap text-base pl-3">
              <li className="nav-item pr-4">Hey {user}!</li>
              <li>
                <button
                  className="nav-item bg-white rounded-2xl text-black py-1 px-5"
                  onClick={handleLogOut}
                >
                  Log out
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center whitespace-nowrap text-base">
              <li>
                <button
                  className="nav-item bg-white rounded-2xl text-black py-1 px-5"
                  onClick={handleGoToLogIn}
                >
                  Log in!
                </button>
              </li>
            </ul>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
