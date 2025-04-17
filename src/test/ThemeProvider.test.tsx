import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, useThemeContext } from "../components/ThemeProvider";

const TestComponent = () => {
  const { darkMode, setDarkMode } = useThemeContext();
  return (
    <div>
      <p>Theme: {darkMode ? "Dark" : "Light"}</p>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
    </div>
  );
};              
test("renders child component with ThemeProvider and displays theme", () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
  expect(screen.getByText(/Theme: (Dark|Light)/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
});
test("throws error when useThemeContext is used outside ThemeProvider", () => {
  const BrokenComponent = () => {
    useThemeContext(); 
    return <div>Broken</div>;
  };
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<BrokenComponent />)).toThrow(
    "useThemeContext must be used within a ThemeProvider"
  );
  consoleError.mockRestore();
});
