import React, { useContext, ReactNode } from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { UseAuthUser } from "../hooks/UseAuthUser";
import { Loading } from "../components/layout/Loading";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = UseAuthUser();
  console.log(user, isLoading);

  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
