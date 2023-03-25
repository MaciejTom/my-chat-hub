import React, { useContext } from 'react'
import authHoc from '../components/authHoc/authHoc'
import { RegisterComponent } from "../components/auth/RegisterComponent";
type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <>
    <RegisterComponent />
  </>
  )
}
export default authHoc(RegisterPage);