"use client"

import React, { useState } from 'react';
import { Box, Breadcrumbs, Container, Typography, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import HeaderTitle from '@/components/atoms/header-title/header-title';

const schema = yup
  .object({
    title: yup.string().min(2).max(20).required(),
    description: yup.string().required(),
    categoriesId: yup.string().required(),
  })
  .required();

interface ContactForm {
  title: string;
  description: string;
  categoriesId: string;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const onFormSubmit = (data: ContactForm) => {
    console.log(data);

    fetch('https://apiraphaeldoucet.onrender.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product created:', data);
        reset();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const handleCancelClick = () => {
    window.location.href = "/products";
  };

  return (
    <>
      <Container>
        <Box mt={4} mb={4}>
          <Breadcrumbs>
            <Typography component="span">Home</Typography>
            <Typography variant="h4">Product creation</Typography>
          </Breadcrumbs>
        </Box>

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
            <HeaderTitle title="Create product" />
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    {...register('description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="categoriesId"
                    label="Categories ID"
                    variant="outlined"
                    fullWidth
                    {...register('categoriesId')}
                    error={!!errors.categoriesId}
                    helperText={errors.categoriesId?.message}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2} justifyContent="flex-start">
                    <Grid item>
                      <Button variant="contained" startIcon={<CheckIcon />} color="success" type="submit">
                        CREATE PRODUCT
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" startIcon={<ClearOutlinedIcon />} color="primary" onClick={handleCancelClick}>
                        CANCEL PRODUCT CREATION
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default Contact;
