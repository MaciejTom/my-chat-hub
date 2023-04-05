import { chatController, postRequestInit, getRequestInit } from "./shared";
import { toast } from "react-toastify";
import { ChatUser } from "../models/ChatUser";
import { Message } from "../models/Message";

export const messagesEndpoint = (selectedUserId: string) =>
  `${chatController}/messages/${selectedUserId}`;
export const peopleEndpoint = `${chatController}/people`;

export const fetchMessages = async (
  selectedUserId: string
): Promise<Message[] | []> => {
  console.log("fetchMessages()");
  try {
    const response = await fetch(
      messagesEndpoint(selectedUserId),
      getRequestInit()
    );
    if (response.status === 200) {
      console.log("chatApi(): fetchMessages() Succeded");
      return await response.json();
    } else {
      toast.error("Sorry, fetching failed!");
    }
  } catch (err) {
    console.log("chatAapi(): fetchMessages() Error: ", err);
  }

  return [];
};
export const fetchPeople = async (): Promise<ChatUser[] | []> => {
  console.log("fetchPeople()");
  try {
    const response = await fetch(peopleEndpoint, getRequestInit());
    if (response.status === 200) {
      console.log("chatApi(): fetchPeople() Succeded");
      return await response.json();
    } else {
      toast.error("Sorry, fetching failed!");
    }
  } catch (err) {
    console.log("chatAapi(): fetchMessages() Error: ", err);
  }

  return [];
};
