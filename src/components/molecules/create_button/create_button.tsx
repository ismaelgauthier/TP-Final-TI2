"use client"

import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

interface NewButtonProps {
  href: string;
}

const NewButton: React.FC<NewButtonProps> = ({ href }) => {
  return (
    <Link href={href} passHref>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ backgroundColor: '#FFA31A', color: 'black' }}
      >
        NEW
      </Button>
    </Link>
  );
};

export default NewButton;
