import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Drawer } from '@mui/material';
import Link from 'next/link';

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: '240px' }}>
      <List>
        <ListItem>
          <ListItemText primary="Page" />
        </ListItem>
        <Link href="/" passHref>
          <ListItem button component="a" sx={{ textDecoration: 'none', color: 'black', width: '100%' }}>
            <HomeIcon />
            <ListItemText primary="Home" sx={{ marginLeft: '10px' }} />
          </ListItem>
        </Link>
        <Link href="/categories" passHref>
          <ListItem button component="a" sx={{ textDecoration: 'none', color: 'black', width: '100%' }}>
            <CategoryIcon />
            <ListItemText primary="Categories" sx={{ marginLeft: '10px' }} />
          </ListItem>
        </Link>
        <Link href="/products" passHref>
          <ListItem button component="a" sx={{ textDecoration: 'none', color: 'black', width: '100%' }}>
            <ShoppingCartIcon />
            <ListItemText primary="Products" sx={{ marginLeft: '10px' }} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}

export default Sidebar;
