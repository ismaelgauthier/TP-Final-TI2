"use client"

import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useTranslations } from "next-intl";

interface NewButtonProps {
  href: string;
}

const NewButton: React.FC<NewButtonProps> = ({ href }) => {
  const t = useTranslations("buttonNew");
  return (
    <Link href={href} passHref>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ backgroundColor: '#FFA31A', color: 'black' }}
      >
        {t("buttonNew")}
      </Button>
    </Link>
  );
};

export default NewButton;
