import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { BrowserRouter } from "react-router-dom";
import { UseAuthUser } from "../../hooks/UseAuthUser";

vi.mock("../../hooks/UseAuthUser");

describe("Footer component", () => {
  test("renders the footer component", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText(/Created by/)).toBeInTheDocument();
  });
});
