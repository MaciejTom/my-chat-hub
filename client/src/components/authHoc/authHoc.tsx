import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { Loading } from "../layout/Loading";

const authHoc = (Component: React.FC) => () => {
  const { user, isLoading } = UseAuthUser();

  if (isLoading) {
    <Loading/>
  }
  if (!user) {
    return <Component />;
  } 
    return <Navigate to="/chat" />;
  
};

export default authHoc;