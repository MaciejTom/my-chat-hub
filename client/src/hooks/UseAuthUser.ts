import { useContext } from "react";
import { AuthUserContext } from "../contexts/AuthUserContext";

export const UseAuthUser = () => {
  const context = useContext(AuthUserContext);
  return context;
};
