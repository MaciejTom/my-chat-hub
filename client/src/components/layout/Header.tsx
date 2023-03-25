import React, { useContext } from "react";
import logo from "../../../public/chat-logo.png";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { logout } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const { user, isLoading, setUser } = UseAuthUser();
  const handleGoToLogIn = () => {
    navigate('/login')
  }
  
  const handleLogOut = async () => {
    const res = await logout();
    setUser(null);
  }

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 text-white font-DM text-3xl">
        <div className="container px-4 mx-auto flex">
          <div className="w-full flex items-center ">
            <img
              src={logo}
              alt="chat-logo"
              className="object-contain h-24 w-40"
            />
            <h1 className="text-2xl font-bold">MY CHAT HUB</h1>
          </div>
          {user ? (
            <ul className="flex items-center whitespace-nowrap text-base">
              <li className="nav-item pr-4">Hey {user}!</li>
              <li>
              <button className="nav-item bg-white rounded-2xl text-black py-1 px-5" onClick={handleLogOut}>Log out</button>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center whitespace-nowrap text-base">
              <li >
                <button className="nav-item bg-white rounded-2xl text-black py-1 px-5" onClick={handleGoToLogIn}>Log in!</button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
