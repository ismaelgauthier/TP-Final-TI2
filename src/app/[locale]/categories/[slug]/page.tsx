"use client";

import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Container, Typography, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useTranslations } from "next-intl";

const schema = yup
  .object({
    name: yup.string().min(2).max(20).required(),
  })
  .required();

interface ContactForm {

  name: string;
}

const CategoryPage = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ContactForm>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const [category, setCategory] = useState<{ _id: string; name: string } | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isTextFieldEmpty, setIsTextFieldEmpty] = useState(true);

  const categoryId = window.location.pathname.split('/')[3];


  useEffect(() => {
    const fetchCategory = async () => {
      try {

        const response = await fetch(`https://apiraphaeldoucet.onrender.com/categories/${categoryId}`);
        const data = await response.json();
        setCategory(data.category);
        setValue('name', data.category.name);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();

  }, [categoryId, setValue]);

  const onFormSubmit = (data: ContactForm) => {
    console.log(data);
    setIsTextFieldEmpty(true);
    
    fetch(`https://apiraphaeldoucet.onrender.com/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Category updated:', data);
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };

  const deleteCategory = () => {
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    setOpenDialog(false);
    reset();

    fetch(`https://apiraphaeldoucet.onrender.com/categories/${categoryId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Category deleted');
          window.location.href = '/categories';
        } else {
          console.error('Error deleting category:', response.status);
        }
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTextFieldEmpty(event.target.value === '');
  };
  const t = useTranslations("updateCategory");
  return (
    <Container>
      <Container>
        <Card
          className="Card"
          style={{
            width: '75%',
            maxWidth: '800px',
            backgroundColor: 'white',
            border: '1px solid white',
            padding: '10px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            alignItems: 'center',
            boxShadow: '5px 5px 5px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  label={t("update")}
                  variant="outlined"
                  fullWidth
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="flex-start">
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<CheckIcon />}
                      color="success"
                      type="submit"
                      disabled={isTextFieldEmpty}
                    >
                      {t("update1")}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" onClick={() => window.location.href = '/categories'}>
                      {t("cancel")}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" startIcon={<ClearOutlinedIcon />} color="error" onClick={deleteCategory}>
                      {t("delete")}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>

      <Dialog open={openDialog} onClose={cancelDelete} style={{ boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' }}>
        <DialogTitle>{t("warning")}</DialogTitle>
        <DialogContent>
          <p>{t("message")}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="error" variant="contained">
            {t("yes")}
          </Button>
          <Button onClick={cancelDelete} color="primary" variant="outlined">
            {t("no")}
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default CategoryPage;
