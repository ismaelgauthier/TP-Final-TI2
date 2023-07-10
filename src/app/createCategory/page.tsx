"use client"

import { Button, Card, Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: ""
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleFormSubmit = (data: any) => {
    console.log(data);

    // Make a POST request to your API endpoint with the form data
    fetch("https://apiraphaeldoucet.onrender.com/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Category created:", data);
        // Show a success message or perform any additional actions
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        // Show an error message or handle the error
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
                id="name"
                label="New category"
                variant="outlined"
                fullWidth
                {...register("name")}
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                    CREATE CATEGORY
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => (window.location.href = '/categories')}
                  >
                    CANCEL CATEGORY CREATION
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
