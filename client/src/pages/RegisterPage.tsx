import React, { useContext } from 'react'
import AuthHoc from '../components/authHoc/AuthHoc'
import { RegisterComponent } from "../components/auth/RegisterComponent";
type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <>
    <RegisterComponent />
  </>
  )
}
export default AuthHoc(RegisterPage);