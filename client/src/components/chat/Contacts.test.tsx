import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Contacts } from "./Contacts";

const onlinePeopleArray = [
  { userId: "1", username: "TestUser1" },
  { userId: "2", username: "TestUser2" },
  { userId: "3", username: "TestUser3" },
];
const contactsProps = {
  onlinePeople: onlinePeopleArray,
  setSelectedUserId: expect.any(Function),
  selectedUserId: "3",
};


describe("Contacts component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders loading component", () => {
    render(<Contacts {...contactsProps} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders contact list after loading data", async () => {
    render(<Contacts {...contactsProps} />);

    await waitFor(() =>
      expect(screen.getByText("TestUser1")).toBeInTheDocument()
    );
    expect(screen.getByText("TestUser2")).toBeInTheDocument();
    expect(screen.getByText("TestUser3")).toBeInTheDocument();
  });

  test("contact item receives correct props and onClick works", async () => {
    const setSelectedUserId = vi.fn();

    render(
      <Contacts {...contactsProps} setSelectedUserId={setSelectedUserId} />
    );

    const firstContactItem = await screen.findByText("TestUser1");

    await waitFor(() => fireEvent.click(firstContactItem));

    await waitFor(() => expect(setSelectedUserId).toHaveBeenCalledTimes(1));
    expect(setSelectedUserId).toHaveBeenCalledWith("1");
  });
});
