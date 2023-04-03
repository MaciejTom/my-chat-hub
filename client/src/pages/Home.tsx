import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UseAuthUser } from "../hooks/UseAuthUser";
import { useNavigate } from "react-router-dom";
import authHoc from "../components/authHoc/authHoc";
type Props = {};

export const Home = (props: Props) => {
  const { user, id, setId, setUser } = UseAuthUser();
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  }
  const navigateToChat = () => {
    navigate("/chat");
  }
  return (
    <div className="mx-36 gap-y-1 ">
      <p className="pb-5 text-3xl font-light ">Welcome to <span className="bg-orangeTransparent rounded p-1">My chat hub</span>, a very simple chat that allows you to
      communicate with other registered
      users, via text messages and sending pictures.</p>
      {user ? <button className="nav-item text-xl bg-white rounded-3xl text-black py-2 px-7" onClick={navigateToChat}>Go to chat</button> : <button className="nav-item bg-white rounded-2xl text-black py-1 px-5" onClick={navigateToLogin}>Go to log in</button>}
      
   
    </div>
  );
};
export default authHoc(Home);
