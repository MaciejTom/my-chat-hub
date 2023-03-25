import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/AuthUserContext";
import authHoc from "../components/authHoc/authHoc";
type Props = {};

export const Home = (props: Props) => {
  return <div>Home</div>;
};
export default authHoc(Home);
