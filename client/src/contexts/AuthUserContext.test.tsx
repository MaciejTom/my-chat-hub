import { render, waitFor, screen } from "@testing-library/react";
import { useContext } from "react";
import { authUser } from "../api/authApi";
import { AuthUserContext, AuthUserProvider } from "./AuthUserContext";

vi.mock("../api/authApi");

describe("AuthUserProvider", () => {
  const mockedAuthUser = authUser as jest.MockedFunction<typeof authUser>;

  mockedAuthUser.mockReturnValue(
    Promise.resolve({
      username: "mockedUsername",
      userId: "mockedUserId",
    })
  );

  test("should set mocked user and id after authentication", async () => {
    render(
      <AuthUserProvider>
        <TestComponent />
      </AuthUserProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/mockedUsername/)).toBeInTheDocument()
    );
    expect(screen.getByText(/mockedUserId/)).toBeInTheDocument();
  });
  test("shouldn't set user and id after authentication", async () => {
    mockedAuthUser.mockReturnValue(Promise.resolve(null));
    render(
      <AuthUserProvider>
        <TestComponent />
      </AuthUserProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("No user")).toBeInTheDocument()
    );
    expect(screen.getByText("No id")).toBeInTheDocument();
  });
});

function TestComponent() {
  const { user, id } = useContext(AuthUserContext);

  return (
    <div>
      <p>{user ? user : "No user"}</p>
      <p>{id ? id : "No id"}</p>
    </div>
  );
}
