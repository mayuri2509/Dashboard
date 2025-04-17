import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/Sidebar";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

const renderWithProviders = (ui: React.ReactElement, isMobile = false) => {
  const theme = createTheme();

  (useMediaQuery as jest.Mock).mockReturnValue(isMobile);

  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
};

describe("Sidebar", () => {
  const mockedUsedNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockedUsedNavigate);
    jest.clearAllMocks();
  });

  test("renders sidebar on desktop (permanent drawer)", () => {
    renderWithProviders(<Sidebar />, false);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
  });

  test("renders sidebar with menu button on mobile", () => {
    renderWithProviders(<Sidebar />, true);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("toggles drawer on mobile", () => {
    renderWithProviders(<Sidebar />, true);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  test("navigates to dashboard", () => {
    renderWithProviders(<Sidebar />, false);
    fireEvent.click(screen.getByText(/Dashboard/i));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("navigates to createpost", () => {
    renderWithProviders(<Sidebar />, false);
    fireEvent.click(screen.getByText(/Create Post/i));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/createpost");
  });
});
