import { Message } from "../../models/Message";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { ChatUser } from "../../models/ChatUser";
import { People } from "../../models/People";
import Contact from "./Contact";
import { fetchMessages } from "../../api/chatApi";

type Props = {};

export interface Person {
  url: string;
  body?: string;
  payload: RequestInit;
}

export const ChatComponent = (props: Props) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlinePeople, setOnlinePeople] = useState<People>({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState<string>("");

  const divUnderMessages = useRef<HTMLDivElement | null>(null);
  const { user, id, setId, setUser } = UseAuthUser();

  useEffect(() => {
    if (user) {
      connectToWs();
    }
  }, [selectedUserId]);

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessaged = async () => {
      if (selectedUserId) {
        const res = await fetchMessages(selectedUserId);
        setMessages(res);
      }
    };

    fetchMessaged();
  }, [selectedUserId]);
  function connectToWs() {
    const wsUrl = import.meta.env.VITE_WS_URL;
    const ws = new WebSocket(wsUrl);
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Disconnected. Trying to reconnect.");
        connectToWs();
      }, 1000);
    });
  }

  const handleMessage = (ev: MessageEvent) => {
    const messageData = JSON.parse(ev.data);
    console.log({ ev, messageData });
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  };

  const showOnlinePeople = (peopleArray: ChatUser[]) => {
    const people: People = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    console.log(people);
    setOnlinePeople(people);
  };

  const sendMessage = (ev: FormEvent<HTMLFormElement>, file = null) => {
    ev.preventDefault();
    ws?.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
        file,
      })
    );
    // if (file) {
    //   axios.get('/messages/'+selectedUserId).then(res => {
    //     setMessages(res.data);
    //   });
    // } else {
    setNewMessageText("");
    // setMessages(prev => ([...prev,{
    //   text: newMessageText,
    //   sender: id,
    //   recipient: selectedUserId,
    //   _id: Date.now(),
    // }]));
    if (id && selectedUserId) {
      const newMessage: Message = {
        text: newMessageText,
        sender: id,
        recipient: selectedUserId,
        _id: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  };
  const changeSelectedUser = (id: string) => {
    setSelectedUserId(id);
  };
  const onlinePeopleExclOurUser = { ...onlinePeople };
  if (id) {
    delete onlinePeopleExclOurUser[id];
  }

  const messagesWithoutDupes = messages.reduce(
    (acc: Message[], cur: Message) => {
      if (!acc.some((msg) => msg._id === cur._id)) {
        acc.push(cur);
      }
      return acc;
    },
    []
  );

  return (
    <div className="flex grow p-10 pt-5 gap-x-4 container self-center text-black">
      <div className="bg-white w-1/3 flex flex-col rounded-md">
        <div className="flex-grow text-black pt-5">
          {Object.keys(onlinePeopleExclOurUser).map((userId: string) => (
            <Contact
              key={userId}
              id={userId}
              online={true}
              username={onlinePeopleExclOurUser[userId]}
              onClick={() => {
                changeSelectedUser(userId);
              }}
              selected={userId === selectedUserId}
            />
          ))}
          {/* {Object.keys(offlinePeople).map(userId => (
                <Contact
                  key={userId}
                  id={userId}
                  online={false}
                  username={offlinePeople[userId].username}
                  onClick={() => setSelectedUserId(userId)}
                  selected={userId === selectedUserId} />
              ))} */}
        </div>
        <div className="p-2 text-center flex items-center justify-center">
          <span className="mr-2 text-sm text-gray-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
            {user}
          </span>
          <button
            // onClick={logout}
            className="text-sm bg-blue-100 py-1 px-2 text-gray-500 border rounded-sm"
          >
            logout
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-blue-50 w-2/3 p-2 rounded-md">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="flex h-full flex-grow items-center justify-center">
              <div className="text-gray-300">
                &larr; Select a person from the sidebar
              </div>
            </div>
          )}
          {!!selectedUserId && (
            <div className="relative h-full">
              <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                {/* {messagesWithoutDupes.map(message => ( */}
                {messagesWithoutDupes.map((message) => (
                  <div
                    key={message._id}
                    className={
                      message.sender === id ? "text-right" : "text-left"
                    }
                  >
                    <div
                      className={
                        "text-left inline-block p-2 my-2 rounded-md text-sm " +
                        (message.sender === id
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-500")
                      }
                    >
                      {message.text}
                      {/* {message.file && (
                        <div className="">
                          <a target="_blank" className="flex items-center gap-1 border-b" href={axios.defaults.baseURL + '/uploads/' + message.file}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                            </svg>
                            {message.file}
                          </a>
                        </div>
                      )} */}
                    </div>
                  </div>
                ))}
                {/* {messages.map((message) => (
                  <div>{message.text}</div>
                ))} */}
                <div ref={divUnderMessages}></div>
              </div>
            </div>
          )}
          {/* {!!selectedUserId && (
            <div className="relative h-full">
              <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                {messagesWithoutDupes.map((message) => (
                  <div
                    key={message._id}
                    className={
                      message.sender === id ? "text-right" : "text-left"
                    }
                  >
                    <div
                      className={
                        "text-left inline-block p-2 my-2 rounded-md text-sm " +
                        (message.sender === id
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-500")
                      }
                    >
                      {message.text}
                      {message.file && (
                        <div className="">
                          <a
                            target="_blank"
                            className="flex items-center gap-1 border-b"
                            href={
                              axios.defaults.baseURL +
                              "/uploads/" +
                              message.file
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {message.file}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))} */}
          {/* <div ref={divUnderMessages}></div> */}
          {/* </div>
            </div>
          )} */}
        </div>
        {!!selectedUserId && (
          <form className="flex gap-2 text-black" onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessageText}
              onChange={(ev) => setNewMessageText(ev.target.value)}
              placeholder="Type your message here"
              className="bg-white flex-grow border rounded-sm p-2"
            />
            <label className="bg-blue-200 p-2 text-gray-600 cursor-pointer rounded-sm border border-blue-200">
              {/* <input type="file" className="hidden" onChange={sendFile} /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <button
              type="submit"
              className="bg-blue-500 p-2 text-white rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
