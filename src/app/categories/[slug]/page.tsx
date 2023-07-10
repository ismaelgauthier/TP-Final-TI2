"use client";
import { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Container, Typography, Card, CardContent } from '@mui/material';

interface Category {
  _id: string;
  name: string;
}

const CategoryPage = () => {
  const [category, setCategory] = useState<Category | null>(null);

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
    </Container>
  );
};

export default CategoryPage;
