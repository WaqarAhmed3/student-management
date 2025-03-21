// src/components/layout/AppBar.tsx
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const TopAppBar: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Student Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
