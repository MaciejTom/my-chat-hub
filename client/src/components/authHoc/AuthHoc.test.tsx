import { render, screen, cleanup } from "@testing-library/react";
import AuthHoc from "./AuthHoc";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";

vi.mock("../../hooks/UseAuthUser");

describe("Register Component", () => {
  const mockedUseAuthUser = UseAuthUser as jest.MockedFunction<
    typeof UseAuthUser
  >;
const mockedAuthUser = {
  setUser: vi.fn(),
  setId: vi.fn(),
  user: "",
  isLoading: true,
  id: "",
}
  beforeEach(() => {
    mockedUseAuthUser.mockReturnValue(mockedAuthUser);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("displays Loading component when isLoading is true", () => {
    const AuthHocWithMocked = AuthHoc(() => <div>Mocked Component</div>);

    render(<AuthHocWithMocked />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("navigate to '/chat' when isLoading is false and there is user", () => {
    const AuthHocWithMocked = AuthHoc(() => <div>Mocked Component</div>);
    mockedUseAuthUser.mockReturnValue({
      setUser: vi.fn(),
      setId: vi.fn(),
      user: "John Doe",
      isLoading: false,
      id: "",
    });
    render(
      <>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthHocWithMocked />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("Mocked Component")).not.toBeInTheDocument();
  });
  
  test("displays mocked component when isLoading is false and there is no user", () => {
    const AuthHocWithMocked = AuthHoc(() => <div>Mocked Component</div>);
    mockedUseAuthUser.mockReturnValue({
      setUser: vi.fn(),
      setId: vi.fn(),
      user: "",
      isLoading: false,
      id: "",
    });

    render(<AuthHocWithMocked />);
    expect(screen.getByText("Mocked Component")).toBeInTheDocument();
  });
});
