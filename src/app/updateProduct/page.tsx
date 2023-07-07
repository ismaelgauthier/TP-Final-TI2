"use client"

import HeaderTitle from "@/components/atoms/header-title/header-title";
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckIcon from "@mui/icons-material/Check";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useState } from "react";

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

export default function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ContactForm>({ mode: "onBlur", resolver: yupResolver(schema) });

  const [openDialog, setOpenDialog] = useState(false);

  function onFormSubmit(data: ContactForm) {
    console.log(data);
  }

  function DeleteProduct() {
    setOpenDialog(true);
    
  }

  function ConfirmDelete() {
    setOpenDialog(false);
    console.log("Product deleted");
    
   
  }

  function CancelDelete() {
    setOpenDialog(false);
  }

  


  return (
    <>
      <Container>
        <Card
          className="Card"
          style={{
            width: "75%",
            maxWidth: "800px",
            backgroundColor: "white",
            border: "1px solid white",
            padding: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            alignItems: "center",
            boxShadow: "5px 5px 5px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <HeaderTitle title="Product/id Update" />
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  {...register("title")}
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
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="categoriesId"
                  label="categoriesId"
                  variant="outlined"
                  fullWidth
                  {...register("categoriesId")}
                  error={!!errors.categoriesId}
                  helperText={errors.categoriesId?.message}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="flex-start">
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<CheckIcon />}
                      color="success"
                    >
                      UPDATE PRODUCT
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" startIcon={<ClearOutlinedIcon />}>
                      CANCEL MODIFICATION
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<ClearOutlinedIcon />}
                      color="error"
                      onClick={DeleteProduct}
                    >
                      DELETE PRODUCT
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>

      <Dialog open={openDialog} onClose={CancelDelete}
      style={{
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
  }}
  
  >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to permanently delete this category? This action cannot be restored.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={ConfirmDelete} color="error" variant="contained">
            YES
          </Button>
          <Button onClick={CancelDelete} color="primary" variant="outlined">
            NO
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
}

