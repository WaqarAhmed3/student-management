import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import { Dashboard, People, School, Assignment } from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
    { text: "Students", icon: <People />, path: "/students" },
    { text: "Courses", icon: <School />, path: "/courses" },
    { text: "Enrollments", icon: <Assignment />, path: "/enrollments" },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar /> {/* Spacer for AppBar */}
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
