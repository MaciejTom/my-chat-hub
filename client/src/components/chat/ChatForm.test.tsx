import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { ChatForm } from "./ChatForm";

describe("ChatForm", () => {

  test("renders the input and button elements", () => {
    render(
      <ChatForm
        sendMessage={expect.any(Function)}
        newMessageText=""
        setNewMessageText={expect.any(Function)}
      />
    );

    expect(
      screen.getByPlaceholderText("Type your message here")
    ).toBeInTheDocument();
    expect(screen.getByRole("send-message-button")).toBeInTheDocument();
  });

  test("renders the input with value passed as props", () => {
    render(
      <ChatForm
        sendMessage={expect.any(Function)}
        newMessageText="Passed message"
        setNewMessageText={expect.any(Function)}
      />
    );

    expect(screen.getByPlaceholderText("Type your message here")).toHaveValue(
      "Passed message"
    );
  });

  test("calls sendMessage prop function when form is submitted", () => {
    const sendMessageMock = vi.fn();
    render(
      <ChatForm
        sendMessage={sendMessageMock}
        newMessageText=""
        setNewMessageText={expect.any(Function)}
      />
    );

    fireEvent.submit(screen.getByRole("send-message-button"));
    expect(sendMessageMock).toHaveBeenCalledTimes(1);
  });

  test("calls setNewMessageText prop function when input value is changed", () => {
    const setNewMessageTextMock = vi.fn();
    render(
      <ChatForm
        sendMessage={expect.any(Function)}
        newMessageText=""
        setNewMessageText={setNewMessageTextMock}
      />
    );

    const input = screen.getByPlaceholderText("Type your message here");
    fireEvent.change(input, { target: { value: "Hello world" } });
    expect(setNewMessageTextMock).toHaveBeenCalledWith("Hello world");
  });

  test("calls sendMessage prop function with file is selected", async () => {
    const sendMessageMock = vi.fn();
    render(
      <ChatForm
        sendMessage={sendMessageMock}
        newMessageText=""
        setNewMessageText={expect.any(Function)}
      />
    );

    const file = new File(["file content"], "test.png", { type: "image/png" });
    Object.defineProperty(screen.getByRole("file-input"), "files", {
      value: [file],
    });

    fireEvent.change(screen.getByRole("file-input"));

    await waitFor(() =>
      expect(sendMessageMock).toHaveBeenCalledWith(null, {
        name: "test.png",
        data: "data:image/png;base64,ZmlsZSBjb250ZW50",
      })
    );
  });
});
