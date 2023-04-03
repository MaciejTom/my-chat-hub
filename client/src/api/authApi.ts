import { authController, postRequestInit, getRequestInit } from "./shared";
import { TokenResponse } from "../models/authorization/tokenResponse";
import { User } from "../models/User";
import { toast } from "react-toastify";
import { ChatUser } from "../models/ChatUser";

export const registerEndpoint = `${authController}/register`;
export const loginEndpoint = `${authController}/login`;
export const authUserEndpoint = `${authController}/authUser`;
export const logoutEndpoint = `${authController}/logout`;

export const logInToChat = async (user: User) => {
  console.log("logInToChat()");
  const body = {
    ...user,
  };

  try {
    const response = await fetch(loginEndpoint, postRequestInit(body));
    const json = await response.json();

    if (response.ok) {
      toast.success("You have successfully logged in!");
      console.log("authApi(): loginToChat() Succeded");
      return { respond: json };
    } else {
      throw Error(json.error);
    }
  } catch (err: any) {
    toast.error("Sorry, failed to login!");
    console.log("authApi(): loginForChat() Error: ", err);
    return { error: err.message };
  }
};

export const registerOnChat = async (user: User) => {
  console.log("registerOnChat()");
  const body = {
    ...user,
  };

  try {
    const response = await fetch(registerEndpoint, postRequestInit(body));
    const json = await response.json();

    if (response.ok) {
      toast.success("You have successfully registered!");
      console.log("authApi(): registerOnChat() Succeded");
      return { respond: json };
    } else {
      throw Error(json.error);
    }
  } catch (err: any) {
    toast.error("Sorry, failed to register!");
    console.log("authApi(): registerOnChat() Error: ", err);
    return { error: err.message };
  }
};
export const authUser = async (): Promise<ChatUser | null> => {
  console.log("authUser()");

  try {
    const response = await fetch(authUserEndpoint, getRequestInit());
    if (response.status === 200) {
      console.log("authApi(): authUser() Succeded");
    }
    return await response.json();
  } catch (err) {
    toast.error("Sorry, failed to authenticate!");
    console.log("authApi(): registerOnChat() Error: ", err);
  }

  return null;
};
export const logout = async () => {
  console.log("logout()");

  try {
    const response = await fetch(logoutEndpoint, getRequestInit());
    if (response.status === 200) {
      toast.success("You have successfully logout!");
      console.log("logout(): registerOnChat() Succeded");
    } else {
      toast.error("Sorry, logout failed!");
    }
    return await response.json();
  } catch (err) {
    toast.error("Sorry, failed to logout!");
    console.log("authApi(): registerOnChat() Error: ", err);
  }

  return null;
};
