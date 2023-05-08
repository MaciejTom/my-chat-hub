import { Message } from "../../models/Message";
import { FormEvent, useEffect, useState } from "react";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { ChatUser } from "../../models/ChatUser";
import { fetchMessages } from "../../api/chatApi";
import { FileObject } from "../../models/FileObject";
import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import { Contacts } from "./Contacts";

export const ChatComponent = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlinePeople, setOnlinePeople] = useState<ChatUser[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newMessageText, setNewMessageText] = useState("");

  const { id } = UseAuthUser();

  useEffect(() => {
    const webSocketUrl = import.meta.env.VITE_WS_URL;
    const ws = new WebSocket(webSocketUrl);
    ws.addEventListener("message", handleMessage);

    ws.onclose = () => {
      console.log("disconnected from WebSocket server");
    };

    setWebSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      if (selectedUserId) {
        const res = await fetchMessages(selectedUserId);
        setMessages(res);
      }
    };
    getMessages();
    webSocket?.removeEventListener("message", handleMessage);
    webSocket?.addEventListener("message", handleMessage);
  }, [selectedUserId]);

  const handleMessage = (ev: MessageEvent) => {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
      return;
    }

    if ("text" in messageData) {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  };

  const showOnlinePeople = (peopleArray: ChatUser[]) => {
    const filteredPeopleArray = peopleArray.filter(
      (person) => person.userId !== id
    );
    const uniqPeople = filteredPeopleArray.filter(
      (element, index, self) =>
        index === self.findIndex((t) => t.userId === element.userId)
    );
    setOnlinePeople(uniqPeople);
  };

  const sendMessage = async (
    e: FormEvent<HTMLFormElement> | null,
    file: FileObject | null = null
  ) => {
    if (e) {
      e.preventDefault();
    }
    if (newMessageText) {
      webSocket?.send(
        JSON.stringify({
          recipient: selectedUserId,
          text: newMessageText,
          file,
        })
      );
      const newMessage: Message = {
        text: newMessageText,
        sender: id,
        recipient: selectedUserId,
        _id: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setNewMessageText("");
    }
    if (file) {
      webSocket?.send(
        JSON.stringify({
          recipient: selectedUserId,
          text: "",
          file,
        })
      );
      const res = await fetchMessages(selectedUserId);
      setMessages(res);
    }
  };

  return (
    <div data-test-id="chat-conatiner" className="flex grow p-10 pt-5 gap-y-4 gap-x-0 container self-center text-black flex-col h-full sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <Contacts
        onlinePeople={onlinePeople}
        setSelectedUserId={setSelectedUserId}
        selectedUserId={selectedUserId}
      />
      <div className="flex flex-col bg-blue-50 p-2 rounded-md sm:w-2/3 flex-2">
        <div className="flex-grow">
          {!selectedUserId ? (
            <div className="flex h-full flex-grow items-center justify-center">
              <div className="text-gray-300 sm:hidden">
                &uarr; Select a person from the topbar
              </div>
              <div className="text-gray-300 hidden sm:inline">
                &larr; Select a person from the sidebar
              </div>
            </div>
          ) : (
            <Messages messages={messages} />
          )}
        </div>
        {!!selectedUserId && (
          <ChatForm
            setNewMessageText={setNewMessageText}
            newMessageText={newMessageText}
            sendMessage={sendMessage}
          />
        )}
      </div>
    </div>
  );
};
