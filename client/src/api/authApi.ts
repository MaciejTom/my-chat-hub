import { hashPassword, authController, postRequestInit } from "./shared";
import { TokenResponse } from "../models/authorization/tokenResponse";
import { User } from "../models/user";
import { toast } from "react-toastify";
export const registerEndpoint = `${authController}/register`;
export const loginEndpoint = `${authController}/login`;

export const logInToChat = async (
  user: User
): Promise<TokenResponse | null> => {
  console.log("logInToChat()");

  const body = {
    user,
  };

  try {
    const response = await fetch(loginEndpoint, postRequestInit(body));
    if (response.status === 200) {
      toast.success("You have successfully logied in!");
      console.log("authApi(): logInToChat() Succeded");
      const res = await response.json();
      return {}
    } else {
      return await response.json();
      throw Error(respo)
    }
    
  } catch (err) {
    toast.error("Sorry, login failed!");
    console.log("authApi(): logInToChat() Error: ", err);
  }

  return null;
};
export const registerOnChat = async (
  user: User
): Promise<TokenResponse | null> => {
  console.log("registerOnChat()");

  const body = {
    user
  };

  try {
    const response = await fetch(registerEndpoint, postRequestInit(body));
    if (response.status === 200) {
      toast.success("You have successfully registered!");
      console.log("authApi(): registerOnChat() Succeded");
    }  else {
      toast.error("Sorry, login failed!");
    }
    return await response.json();
  } catch (err) {
    toast.error("Sorry, failed to register!");
    console.log("authApi(): registerOnChat() Error: ", err);
  }

  return null;
};
