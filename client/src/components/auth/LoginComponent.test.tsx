import * as React from "react";
import {
  render,
  screen,
  fireEvent,
  getByText,
  waitFor,
  findByText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginComponent } from "./LoginComponent";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { logInToChat } from "../../api/authApi";
import { authValidator } from "../../utils/authValidator";
import { BrowserRouter } from "react-router-dom";
import { User } from "../../models/User";

vi.mock("../../hooks/UseAuthUser");
vi.mock("../../api/authApi");

describe("LoginComponent", () => {
  const mockedUseAuthUser = UseAuthUser as jest.MockedFunction<
    typeof UseAuthUser
  >;

  beforeEach(() => {
    mockedUseAuthUser.mockReturnValue({
      setUser: vi.fn(),
      setId: vi.fn(),
      user: "",
      isLoading: false,
      id: "",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders component", () => {
    render(
      <BrowserRouter>
        <LoginComponent />
      </BrowserRouter>
    );
    const logInHeader = screen.getByRole("heading");
    expect(logInHeader).toBeInTheDocument();
  });

  it("renders information about too long password", async () => {
    render(
      <BrowserRouter>
        <LoginComponent />
      </BrowserRouter>
    );

    const mockedUser = {
      username: "John Doe",
      password: "firmlyTooasdasdasdasdLongPassword",
    };

    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const loginButton = screen.getByText("Log in");
    fireEvent.change(usernameInput, { target: { value: mockedUser.username } });
    fireEvent.change(passwordInput, { target: { value: mockedUser.password } });

    fireEvent.click(loginButton);
    await waitFor(() =>
      expect(
        screen.getByText("Password can contain up to 15 characters")
      ).toBeInTheDocument()
    );
  });

  it("renders information about no username or password", async () => {
    render(
      <BrowserRouter>
        <LoginComponent />
      </BrowserRouter>
    );

    const mockedUser = {
      username: "",
      password: "normalPassword",
    };

    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const loginButton = screen.getByText("Log in");

    fireEvent.change(usernameInput, { target: { value: mockedUser.username } });
    fireEvent.change(passwordInput, { target: { value: mockedUser.password } });

    fireEvent.click(loginButton);
    await waitFor(() =>
      expect(
        screen.getByText("Please provide email and password")
      ).toBeInTheDocument()
    );
  });
});
