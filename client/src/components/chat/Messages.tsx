import {
  useEffect,
  useRef,
} from "react";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { Message } from "../../models/Message";
import { getAddressToAsset } from "../../utils/getAddressToAsset";
import { PaperClipIcon } from "../icons/PaperClipIcon";

interface MessagesProps {
  messages: Message[];
}

export const Messages = (props: MessagesProps) => {

  const messagesWithoutDupes = props.messages.reduce(
    (acc: Message[], cur: Message) => {
      if (!acc.some((msg) => msg._id === cur._id)) {
        acc.push(cur);
      }
      return acc;
    },
    []
  );

  const { id } = UseAuthUser();
  const divUnderMessages = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = divUnderMessages.current;
    div?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [props.messages]);

  return (
    <div className="relative h-full overflow-y-scroll">
      <div className="absolute top-0 left-0 right-0 bottom-2">
        {messagesWithoutDupes.map((message) => (
          <div
            key={message._id}
            className={message.sender === id ? "text-right" : "text-left"}
          >
            <div
              className={
                "text-left inline-block p-2 my-2 rounded-md text-sm break-all " +
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
                    href={getAddressToAsset(message.file)}
                  >
                   <PaperClipIcon/>
                    {message.file}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={divUnderMessages}></div>
      </div>
    </div>
  );
};
