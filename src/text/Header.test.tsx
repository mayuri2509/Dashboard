import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { useThemeContext } from '../components/ThemeProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';

jest.mock('../components/ThemeProvider', () => ({
    useThemeContext: jest.fn(),
  }));
const mockSetDarkMode = jest.fn();
const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Header Component', () => {
  beforeEach(() => {
        (useThemeContext as jest.Mock).mockReturnValue({
      darkMode: false,
      setDarkMode: mockSetDarkMode,
    });
  });

  test('renders the header with title', () => {
    renderWithTheme(<Header />);
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });

  test('renders toggle buttons', () => {
    renderWithTheme(<Header />);
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument(); 
    expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument(); 
  });

  test('toggles theme on button click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const darkToggle = screen.getByRole('button', { name: /light mode/i });
    await user.click(darkToggle);
    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });
});
