"use client"
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Card, CardHeader, CardContent, Box, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import Link from 'next/link';
import NewButton from '@/components/molecules/create_button/create_button';

interface Category {
  _id: string;
  name: string;
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Categories',
    width: 200,
    renderCell: (params: GridCellParams) => (
      <Link href={`/categories/${params.row._id}`} passHref>
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

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://apiraphaeldoucet.onrender.com/categories');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const rows = categories.map((category, index) => ({
    id: `category-${index}`,
    name: category.name,
    _id: category._id,
  }));

  return (
    <Box mt={4}>
      <Card>
        <CardHeader
          title="Categories"
          action={
            <Box display="flex" alignItems="center">
              <NewButton href="/createCategory" />
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

export default CategoriesList;
