import React from "react";
import AuthHoc from "../components/authHoc/AuthHoc";
import { LoginComponent } from "../components/auth/LoginComponent";
type Props = {};

const LoginPage = (props: Props) => {
  return (
    <>
      <LoginComponent />
    </>
  );
};
export default AuthHoc(LoginPage);
