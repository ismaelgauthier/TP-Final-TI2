"use client"
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Card, CardHeader, CardContent, Box, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import Link from 'next/link';
import NewButton from '@/components/molecules/create_button/create_button';

interface Product {
  _id: string;
  name: string;
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Products',
    width: 200,
    renderCell: (params: GridCellParams) => (
      <Link href={`/products/${params.row._id}`} passHref>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {params.value}
          <IconButton disabled>
            <Settings />
          </IconButton>
        </div>
      </Link>
    ),
  },
];

const ProductsList = () => {
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

  const rows = products.map((product, index) => ({
    id: `product-${index}`,
    name: product.name,
    _id: product._id,
  }));

  return (
    <Box mt={4}>
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
              disableRowSelectionOnClick
              getRowId={(row) => row.id}
              hideFooterPagination
            />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductsList;
