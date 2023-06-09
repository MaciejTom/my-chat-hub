import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

import "@testing-library/jest-dom";

describe("Avatar component", () => {
  test("renders the component", () => {
    render(<Avatar userId="1" username="John Doe" online={true} />);
    expect(screen.getByText(/J/)).toBeInTheDocument();
  });

  test("renders the online status", () => {
    render(<Avatar userId="1" username="John Doe" online={true} />);
    expect(screen.getByTestId("online-user")).toBeInTheDocument();
  });

  test("renders the offline status", () => {
    render(<Avatar userId="1" username="John Doe" online={false} />);
    expect(screen.getByTestId("offline-user")).toBeInTheDocument();
  });
});
