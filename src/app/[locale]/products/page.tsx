"use client";

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowParams } from '@mui/x-data-grid';
import { Card, CardHeader, CardContent, Box, IconButton, TextField } from '@mui/material';
import { Settings } from '@mui/icons-material';
import NewButton from '@/components/molecules/create_button/create_button';
import { useTranslations } from "next-intl";
//interface for the product
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}




//the main page for the products
const ProductsPage = () => {
  const t = useTranslations("product");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const columns: GridColDef[] = [
   
    {
      field: 'title',
      headerName: t("title"),
      flex: 1,
    },
    {
      field: 'description',
      headerName: t("description"),
      flex: 1,
    },
    {
      field: 'price',
      headerName: t("price"),
      flex: 1,
    },
  ];


//fetching the data from the api
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://apiraphaeldoucet.onrender.com/products');
        const data = await response.json();

        const filteredProducts = data.products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [searchQuery]);
//mapping for the data grid
  const rows = products.map((product) => ({
    id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
  }));
//handling the click on the row
  const handleRowClick = (params: GridRowParams) => {
    window.location.href = `/products/${params.id}`;
  };
//handling the change of the search query
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
//returning the page

  return (
    <Box mt={12}>
      <Card>
        <CardHeader
          title={t("title2")}
          action={
            <Box display="flex" alignItems="center">
              <NewButton href="/createProduct" />
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                size="small"
                sx={{ marginLeft: '16px' }}
              />
            </Box>
          }
        />
        <CardContent>
          <div style={{ width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              components={{
                Toolbar: () => null,
              }}
              getRowClassName={(_params) => 'product-row'}
              onRowClick={handleRowClick}
            />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductsPage;

<style jsx>{`
  .product-row {
    cursor: pointer;
  }
`}</style>