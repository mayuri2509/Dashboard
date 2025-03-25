
import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, useMediaQuery } from "@mui/material";
import { Menu, Dashboard, PostAdd } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);
  const handleDashboardClick = () => navigate("/dashboard");
  const handleCreatePostClick = () => navigate("/createpost");

  return (
    <>
      {isMobile && (
        <IconButton 
          onClick={toggleDrawer} 
          sx={{ position: "absolute", top: 16, left: 16, zIndex: 1300 }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            top: isMobile ? 0 : 64,
            height: "100vh",
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItemButton onClick={handleDashboardClick}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText secondary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={handleCreatePostClick}>
            <ListItemIcon><PostAdd /></ListItemIcon>
            <ListItemText secondary="Create Post" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
