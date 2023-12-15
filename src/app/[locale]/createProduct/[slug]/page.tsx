"use client";

//this was made by daniel and raphael, the api part is raph and the yup par is daniel

import { Button, Card, Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive("Price must be a positive number"),
  imageUrl: yup.string().required("Image URL is required"),
  categoryId: yup.string().required("Category ID is required"),
});

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (data: any) => {

    fetch("https://apiraphaeldoucet.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((_data) => {

        window.location.href = "/products";
      })
      .catch((_error) => {
      });
  };

  const handleCancelClick = () => {
    
    window.location.href = "/products";
  };
  const t = useTranslations("createProduct");

  return (
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
          boxShadow: "5px 5px 5px 8px rgba(0, 0, 0, 0.2)"
        }}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                label={t("title")}
                variant="outlined"
                fullWidth
                {...register("title")}
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label={t("description")}
                variant="outlined"
                fullWidth
                multiline
                {...register("description")}
                value={formData.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="price"
                label={t("price")}
                variant="outlined"
                fullWidth
                type="number"
                {...register("price")}
                value={formData.price}
                onChange={handleInputChange}
                error={!!errors.price}
                helperText={errors.price?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="imageUrl"
                label="Image URL"
                variant="outlined"
                fullWidth
                {...register("imageUrl")}
                value={formData.imageUrl}
                onChange={handleInputChange}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="categoryId"
                label={t("category")}
                variant="outlined"
                fullWidth
                {...register("categoryId")}
                value={formData.categoryId}
                onChange={handleInputChange}
                error={!!errors.categoryId}
                helperText={errors.categoryId?.message}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-start">
                <Grid item>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    {t("create")}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancelClick}
                  >
                    {t("cancel")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
}
