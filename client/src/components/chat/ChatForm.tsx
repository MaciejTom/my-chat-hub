import React, { ChangeEvent, FormEvent } from "react";
import { SendMessageIcon } from "../icons/SendMessageIcon";
import { SendFileIcon } from "../icons/SendFileIcon";
import { FileObject } from "../../models/FileObject";

type ChatFormProps = {
  sendMessage: (
    e: FormEvent<HTMLFormElement> | null,
    file: FileObject | null
  ) => void;
  newMessageText: string;
  setNewMessageText: (message: string) => void;
};

export const ChatForm = (props: ChatFormProps) => {
  
  const sendFile = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const reader = new FileReader();
    if (input.files) {
      reader.readAsDataURL(input.files[0]);
      reader.onload = () => {
        if (e.target.files?.[0].name && reader.result) {
          props.sendMessage(null, {
            name: e.target.files[0].name,
            data: reader.result as ArrayBuffer,
          });
        }
      };
    }
  };

  return (
    <form className="flex gap-2 text-black" onSubmit={(e) => props.sendMessage(e, null)}>
      <input
        type="text"
        value={props.newMessageText}
        onChange={(e) => props.setNewMessageText(e.target.value)}
        placeholder="Type your message here"
        className="bg-white border rounded-sm p-2 w-full"
      />
      <label className="bg-blue-200 p-2 text-gray-600 cursor-pointer rounded-sm border border-blue-200">
        <input role="file-input" type="file" className="hidden" onChange={sendFile} />
        <SendFileIcon />
      </label>
      <button role="send-message-button" type="submit" className="bg-blue-500 p-2 text-white rounded-sm">
        <SendMessageIcon />
      </button>
    </form>
  );
};
