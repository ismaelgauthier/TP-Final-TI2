"use client";
import { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Container, Typography, Card, CardContent } from '@mui/material';

interface Product {
  _id: string;
  name: string;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = window.location.pathname.split('/')[2];
        const response = await fetch(`https://apiraphaeldoucet.onrender.com/products/${productId}`);
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Breadcrumbs>
          <Typography component="span">Home</Typography>
          <Typography variant="h4">Product</Typography>
        </Breadcrumbs>
      </Box>
      <Box display="flex" justifyContent="center">
        <Card>
          <CardContent>
            <Typography variant="h2" align="center">
              {product ? product.name : 'Loading...'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProductPage;
