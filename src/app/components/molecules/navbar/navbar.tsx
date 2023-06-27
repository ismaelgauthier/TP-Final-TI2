import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';

import Sidebar from '../sidebar/sidebar';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFA31A' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleToggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, textAlign: 'center', cursor: 'pointer' }}>
          <Typography variant="h6" component="div">
            <Box component="span" sx={{ color: 'white' }}>
              MyVendorHub
            </Box>
          </Typography>
        </Box>
      </Toolbar>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <Sidebar />
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
