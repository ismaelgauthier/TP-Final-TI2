"use client"

import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const NewButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      style={{ backgroundColor: '#FFA31A', color: 'black'}}
    >
      NEW
    </Button>
  );
};

export default NewButton;
