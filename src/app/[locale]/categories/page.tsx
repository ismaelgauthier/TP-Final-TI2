"use client"


import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowParams } from '@mui/x-data-grid';
import { Card, CardHeader, CardContent, Box, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import NewButton from '@/components/molecules/create_button/create_button';


interface Category {
  _id: string;
  name: string;
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Categories',

    flex: 1,
    renderCell: (params: GridCellParams) => (
      <div>
        {params.value}
        <IconButton disabled>
          <Settings />
        </IconButton>
      </div>

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


  const rows = categories.map((category) => ({
    id: category._id,
    name: category.name,
  }));

  const handleRowClick = (params: GridRowParams) => {
    window.location.href = `/categories/${params.id}`;
  };

  return (
    <Box mt={12}>
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

              disableColumnMenu
              disableColumnSelector
              disableRowSelectionOnClick
              hideFooterPagination
              components={{
                Toolbar: () => null,
              }}
              getRowClassName={(_params) => 'category-row'}
              onRowClick={handleRowClick}

            />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CategoriesList;


<style jsx>{`
  .category-row {
    cursor: pointer;
  }
  
`}</style>

