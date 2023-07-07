"use client"
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Card, CardHeader, CardContent } from '@mui/material';
import Link from 'next/link';

interface Category {
  id: string; // Ajout du champ 'id'
  name: string;
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Categories',
    width: 200,
    renderCell: (params: GridCellParams) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link href={`/categories/update/${params.id}`}>
          <a>{params.value}</a>
        </Link>
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
        // Ajout de l'ID unique à chaque catégorie
        const categoriesWithId = data.categories.map((category: Category, index: number) => ({
          ...category,
          id: String(index + 1),
        }));
        setCategories(categoriesWithId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Card>
      <CardHeader title="Categories" />
      <CardContent>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={categories}
            columns={columns}
            disableRowSelectionOnClick
            getRowId={(row) => row.id} // Utilisation de l'ID comme identifiant de ligne
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesList;
