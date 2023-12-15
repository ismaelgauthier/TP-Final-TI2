"use client"

import { Button, Card, Container, Grid, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive("Price must be a positive number"),
  imageUrl: yup.string().required("Image URL is required"),
  categoryId: yup.string().required("Category ID is required"),
});

export default function EditProduct() {
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
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });

  const productId = window.location.pathname.split('/')[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://apiraphaeldoucet.onrender.com/products/${productId}`);
        const data = await response.json();
        const { title, description, price, imageUrl, categoryId } = data;
        setFormData({ title, description, price, imageUrl, categoryId });
        setValue("title", title);
        setValue("description", description);
        setValue("price", price.toString());
        setValue("imageUrl", imageUrl);
        setValue("categoryId", categoryId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId, setValue]);

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (data: any) => {
    fetch(`https://apiraphaeldoucet.onrender.com/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        console.log("Product updated:", updatedProduct);
        window.location.href = "/products";
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleCancelClick = () => {
    window.location.href = "/products";
  };

  const handleDeleteClick = () => {
    fetch(`https://apiraphaeldoucet.onrender.com/products/${productId}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product deleted");
          window.location.href = "/products";
        } else {
          console.error("Error deleting product:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

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
                label="Title"
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
                label="Description"
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
                label="Price"
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
                label="Category ID"
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
                    UPDATE PRODUCT
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteClick}
                  >
                    DELETE PRODUCT
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCancelClick}
                  >
                    CANCEL MODIFICATION
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