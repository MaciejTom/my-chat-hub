import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { ChatComponent } from "./ChatComponent";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { Message } from "../../models/Message";

vi.mock("../../hooks/UseAuthUser");

declare global {
  var sendMsg: ((data: wsData) => void) | null;
}
interface wsData {
  data: string;
}

const onlinePeopleArray = [
  { userId: "1", username: "TestUser1" },
  { userId: "2", username: "TestUser2" },
  { userId: "3", username: "TestUser3" },
];
const mockedOnlineUsers = {
  online: onlinePeopleArray,
};

const mockedMessage: Message = {
  _id: 1,
  sender: "1",
  text: "Hi there!",
  recipient: "user456",
};

describe("ChatComponent", () => {
  const mockedUseAuthUser = UseAuthUser as jest.MockedFunction<
    typeof UseAuthUser
  >;

  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  beforeEach(() => {
    mockedUseAuthUser.mockReturnValue({
      setUser: vi.fn(),
      setId: vi.fn(),
      user: "",
      isLoading: false,
      id: "",
    });
  });
  global.sendMsg = null;
  global.WebSocket = class extends WebSocket {
    constructor(url: any) {
      super("wss://localhost");
      global.sendMsg = null;
    }

    addEventListener(event: string, cb: any) {
      if (event === "open") {
        cb();
      } else if (event === "message") {
        global.sendMsg = cb;
      }
    }
  };

  test("renders online users who came through websocket", async () => {
    render(<ChatComponent />);
    act(() => {
      global.sendMsg?.({ data: JSON.stringify(mockedOnlineUsers) });
    });

    await waitFor(() =>
      expect(screen.getByText("TestUser1")).toBeInTheDocument()
    );
    expect(screen.getByText("TestUser2")).toBeInTheDocument();
    expect(screen.getByText("TestUser3")).toBeInTheDocument();
  });
  test("renders a message that came through websockets", async () => {
    const { rerender } = render(<ChatComponent />);

    act(() => {
      global.sendMsg?.({ data: JSON.stringify(mockedOnlineUsers) });
    });

    await waitFor(() => fireEvent.click(screen.getByText("TestUser1")));

    fireEvent.click(screen.getByText("TestUser1"));

    act(() => {
      global.sendMsg?.({ data: JSON.stringify(mockedMessage) });
    });

    rerender(<ChatComponent />);
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });
});
