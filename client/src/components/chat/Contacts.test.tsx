import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Contacts } from "./Contacts";
import { fetchPeople } from "../../api/chatApi";

describe("Contacts component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const onlinePeopleArray = [
    { userId: "1", username: "TestUser1" },
    { userId: "2", username: "TestUser2" },
    { userId: "3", username: "TestUser3" },
  ];
  const props = {
    onlinePeople: onlinePeopleArray,
    setSelectedUserId: expect.any(Function),
    selectedUserId: "3",
  };

  test("renders loading component", () => {
    render(<Contacts {...props} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders contact list after loading data", async () => {
    render(<Contacts {...props} />);

    await waitFor(() =>
      expect(screen.getByText("TestUser1")).toBeInTheDocument()
    );
    expect(screen.getByText("TestUser2")).toBeInTheDocument();
    expect(screen.getByText("TestUser3")).toBeInTheDocument();
  });

  test("contact item receives correct props and onClick works", async () => {
    const setSelectedUserId = vi.fn();
    render(<Contacts {...props} setSelectedUserId={setSelectedUserId} />);

    const firstContactItem = await screen.findByText("TestUser1");

    await waitFor(() => fireEvent.click(firstContactItem));

    await waitFor(() => expect(setSelectedUserId).toHaveBeenCalledTimes(1));
    expect(setSelectedUserId).toHaveBeenCalledWith("1");
  });
});
