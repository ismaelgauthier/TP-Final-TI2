"use client";

import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Container, Typography, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import HeaderTitle from '@/components/atoms/header-title/header-title';

const schema = yup
  .object({
    updatecategory: yup.string().min(2).max(20).required(),
  })
  .required();

interface ContactForm {
  updatecategory: string;
}

const CategoryPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const [category, setCategory] = useState<{ _id: string; name: string } | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const onFormSubmit = (data: ContactForm) => {
    console.log(data);

    const categoryId = "id";
    fetch(`https://apiraphaeldoucet.onrender.com/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatecategory: data.updatecategory }),
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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryId = window.location.pathname.split('/')[2];
        const response = await fetch(`https://apiraphaeldoucet.onrender.com/categories/${categoryId}`);
        const data = await response.json();
        setCategory(data.category);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, []);

  const confirmDelete = () => {
    setOpenDialog(false);
    reset();

    const categoryId = "id";
    fetch(`https://apiraphaeldoucet.onrender.com/categories/${categoryId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Category deleted');
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

  const cancelMod = () => {
    reset();
  };

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Breadcrumbs>
          <Typography component="span">Home</Typography>
          <Typography variant="h4">Category</Typography>
        </Breadcrumbs>
      </Box>
      <Box display="flex" justifyContent="center">
        <Card>
          <CardContent>
            <Typography variant="h2" align="center">
              {category ? category.name : 'Loading...'}
            </Typography>
          </CardContent>
        </Card>
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
          <HeaderTitle title="Category Update" />
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="updatecategory"
                  label="Update category"
                  variant="outlined"
                  fullWidth
                  {...register('updatecategory')}
                  error={!!errors.updatecategory}
                  helperText={errors.updatecategory?.message}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="flex-start">
                  <Grid item>
                    <Button variant="contained" startIcon={<CheckIcon />} color="success" type="submit">
                      UPDATE CATEGORY
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" onClick={cancelMod}>
                      CANCEL MODIFICATION
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" startIcon={<ClearOutlinedIcon />} color="error" onClick={deleteCategory}>
                      DELETE CATEGORY
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>

      <Dialog open={openDialog} onClose={cancelDelete} style={{ boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' }}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to permanently delete this category? This action cannot be restored.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="error" variant="contained">
            YES
          </Button>
          <Button onClick={cancelDelete} color="primary" variant="outlined">
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CategoryPage;
