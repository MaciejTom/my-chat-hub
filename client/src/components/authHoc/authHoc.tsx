import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { Loading } from "../layout/Loading";

const AuthHoc = (Component: React.FC) => () => {
  const { user, isLoading } = UseAuthUser();

  if (isLoading) {
    return <Loading/>
  }
  if (!user) {
    return <Component />;
  } 
    return <Navigate to="/chat" />;
  
};

export default AuthHoc;