import React from "react";
import authHoc from "../components/authHoc/authHoc";
import { LoginComponent } from "../components/auth/LoginComponent";
type Props = {};

const LoginPage = (props: Props) => {
  return (
    <>
      
      <LoginComponent />
    </>
  );
};
export default authHoc(LoginPage);
