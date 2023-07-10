"use client"

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowParams } from '@mui/x-data-grid';
import { Card, CardHeader, CardContent, Box, IconButton } from '@mui/material';
import NewButton from '@/components/molecules/create_button/create_button';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 1,
  },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://apiraphaeldoucet.onrender.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const rows = products.map((product) => ({
    id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
  }));

  const handleRowClick = (params: GridRowParams) => {
    window.location.href = `/products/${params.id}`;
  };

  return (
    <Box mt={12}>
      <Card>
        <CardHeader
          title="Products"
          action={
            <Box display="flex" alignItems="center">
              <NewButton href="/createProduct" />
            </Box>
          }
        />
        <CardContent>
          <div style={{ width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableColumnMenu
              disableColumnSelector
              disableRowSelectionOnClick
              hideFooterPagination
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
