import React from "react";
import { Navigate} from "react-router-dom";
import { UseAuthUser } from "../hooks/UseAuthUser";
import { Loading } from "../components/layout/Loading";

interface PrivateRouteProps {
  children: JSX.Element;
}
export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = UseAuthUser();

  if (isLoading) {
    return <Loading />;
  }
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
