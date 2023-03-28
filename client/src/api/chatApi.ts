import { chatController, postRequestInit, getRequestInit } from "./shared";
import { toast } from "react-toastify";

export const messagesEndpoint = (selectedUserId: string) => `${chatController}/messages/${selectedUserId}`;

export const fetchMessages = async (selectedUserId: string) => {
  console.log("fetchMessages()");
  try {
    const response = await fetch(messagesEndpoint(selectedUserId), getRequestInit());
    if (response.status === 200) {
      console.log("chatAapi(): fetchMessages() Succeded");
      return await response.json();
    } else {
      toast.error("Sorry, fetching failed!");
    }
  } catch (err) {
    console.log("chatAapi(): fetchMessages() Error: ", err);
  }

  return null;
};
