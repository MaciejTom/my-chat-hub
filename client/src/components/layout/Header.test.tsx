import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Header } from "./Header";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { BrowserRouter } from "react-router-dom";

const mockedUseAuthData = {
  setUser: vi.fn(),
  setId: vi.fn(),
  user: "",
  isLoading: true,
  id: "user123",
};

vi.mock("../../hooks/UseAuthUser");

describe("Header component", () => {
  const mockedUseAuthUser = UseAuthUser as jest.MockedFunction<
    typeof UseAuthUser
  >;

  beforeEach(() => {
    mockedUseAuthUser.mockReturnValue(mockedUseAuthData);
  });

  test("renders the Header component correctly", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText("MY CHAT HUB")).toBeInTheDocument();
  });

  test("renders loading component correctly", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders the log out button correctly", async () => {
    mockedUseAuthUser.mockReturnValue({
      ...mockedUseAuthData,
      isLoading: false,
    });
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.getByText("Log in!")).toBeInTheDocument()
    );
  });
});
