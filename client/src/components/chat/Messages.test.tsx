import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Messages } from "./Messages";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { Message } from "../../models/Message";


// mock UseAuthUser hook
vi.mock("../../hooks/UseAuthUser");

describe("Messages component", () => {
  const mockedUseAuthUser = UseAuthUser as jest.MockedFunction<typeof UseAuthUser>;
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  beforeEach(() => {
    mockedUseAuthUser.mockReturnValue({
      setUser: vi.fn(),
      setId: vi.fn(),
      user: "",
      isLoading: true,
      id: "user123",
    });
  });

  const messages: Message[] = [
    { _id: 1, sender: "user123", text: "Hi there!", recipient: "user456" },
    { _id: 2, sender: "user456", text: "Hey!", recipient: "user123" },
    {
      _id: 3,
      sender: "user789",
      text: "Check out this file",
      recipient: "user123",
      file: "example.pdf",
    },
    { _id: 4, sender: "user456", text: "How are you?", recipient: "user123" },
  ];

    it("should render messages", () => {
      render(<Messages messages={messages} />);
      expect(screen.getAllByTestId("msg-list-item")).toHaveLength(messages.length);
    });

    it("should render unique messages", () => {
      const duplicatedMessages = [
        ...messages,
        { _id: 4, sender: "user456", text: "How are you?",  recipient: "user123", },
      ];
      render(<Messages messages={duplicatedMessages} />);
      expect(screen.getAllByTestId("msg-list-item")).toHaveLength(messages.length);
    });

    it("should render attachment icon for messages with file", () => {
      render(<Messages messages={messages} />);
      const attachmentIcons = screen.getAllByRole("fileIcon");
      expect(attachmentIcons).toHaveLength(1);
    });

  it("should apply different styles for own and other user messages", () => {
    render(<Messages messages={messages} />);
    const ownMessage = screen.getByText("Hi there!");
    expect(ownMessage).toHaveClass("bg-blue-500");
    const otherUserMessage = screen.getByText("Hey!");
    expect(otherUserMessage).toHaveClass("bg-white");
  });
});
