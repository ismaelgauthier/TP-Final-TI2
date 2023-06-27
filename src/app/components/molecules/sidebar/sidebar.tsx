import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Hidden from '@mui/material/Hidden';

const Sidebar = () => {
  return (
    <Hidden mdDown>
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListItem>
            <ListItemText primary="Page" />
          </ListItem>
          <ListItem button>
            <HomeIcon />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <CategoryIcon />
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem button>
            <ShoppingCartIcon />
            <ListItemText primary="Products" />
          </ListItem>
        </List>
      </Drawer>
    </Hidden>
  );
};

export default Sidebar;
