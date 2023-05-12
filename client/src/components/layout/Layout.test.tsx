import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";
import { BrowserRouter } from "react-router-dom";
import { UseAuthUser } from "../../hooks/UseAuthUser";

vi.mock("../../hooks/UseAuthUser");

describe("Layout component", () => {
  const mockedUseAuthUser = UseAuthUser as jest.MockedFunction<
    typeof UseAuthUser
  >;

  beforeEach(() => {
    mockedUseAuthUser.mockReturnValue({
      setUser: vi.fn(),
      setId: vi.fn(),
      user: "",
      isLoading: true,
      id: "user123",
    });
  });

  test("renders the footer component", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByText(/Created by/)).toBeInTheDocument();
  });
  
  test("renders the header component", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByText("MY CHAT HUB")).toBeInTheDocument();
  });
});
