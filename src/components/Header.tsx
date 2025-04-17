import React from "react";
import { AppBar, Toolbar, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useThemeContext } from "./ThemeProvider";
import { useTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Header: React.FC = () => {
  const { darkMode, setDarkMode } = useThemeContext();
  const theme = useTheme();

  return (
    <AppBar  position="fixed" sx={{ backgroundColor: theme.palette.background.paper, zIndex: 1300 }}>
      <Toolbar className="bg-cyan-700" >
        <Typography variant="h5" sx={{ flexGrow: 1, color: theme.palette.text.primary,marginLeft:"50px" }}>
          Admin Dashboard
        </Typography>

        <ToggleButtonGroup
          value={darkMode ? "dark" : "light"}
          exclusive
          onChange={() => setDarkMode(!darkMode)}
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <ToggleButton value="light" aria-label="light mode">
            <Brightness7 />
          </ToggleButton>
          <ToggleButton value="dark" aria-label="dark mode">
            <Brightness4 />
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
   
export default Header;
