import React, { useContext, ReactNode } from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { UseAuthUser } from "../hooks/UseAuthUser";
import { Loading } from "../components/layout/Loading";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = UseAuthUser();

  if (isLoading) {
    return  <Loading/>
  }
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
