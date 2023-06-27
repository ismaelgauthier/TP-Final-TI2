"use client";

import HeaderTitle from "@/components/atoms/header-title/header-title";
import { Button, Container, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



const schema = yup.object({
  title: yup.string().min(2).max(20).required(),
  description: yup.string ().required(),
  categoriesId: yup.string().required(),
  
})
.required();


interface ContactForm{
  title:string;
  description:string;
  categoriesId:string;
  
}

export default function Contact() {
  

  const { register, handleSubmit, watch, formState: { errors, isValid }, } = useForm <ContactForm>({mode: "onBlur", resolver: yupResolver(schema)}); 

  function onFormSubmit(data: ContactForm) {
    console.log(data)
  }

  
  return (
    <>
      <Container>
        <HeaderTitle
          title="Product creation"
        />
        <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container rowSpacing={3}>
          <Grid item sm={12}>
            <TextField id="title" label="Title" variant="outlined" fullWidth  {...register("title")}
            error={!!errors.title }
            helperText={errors.title?.message}
            required/>
            
            
          </Grid>
          <Grid item sm={12}>
            <TextField id="description" label="Description" variant="outlined" fullWidth multiline  {...register("description")}
            error={!!errors.description }
            helperText={errors.description?.message}
            required
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              id="categoriesId"
              label="categoriesId"
              variant="outlined"
              fullWidth
              {...register("categoriesId")} 
              error={!!errors.categoriesId }
              helperText={errors.categoriesId?.message}
              required
            />
          </Grid>
          
          <Grid item sm={12}>
            <Button variant="contained" type="submit" disabled={isValid}>create products</Button>
          </Grid>
        </Grid>
        </form>
      </Container>
    </>
  );
}



