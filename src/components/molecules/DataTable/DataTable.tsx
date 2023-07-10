import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { Pagination } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'productName', headerName: 'Product', width: 130 },
  { field: 'price', headerName: 'Price', type: 'number', width: 90 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    renderCell: () => <EditIcon style={{ marginLeft: 'auto' }} />,
  },
];

const rows = [
  { id: 1, productName: 'foot-massage', category: 'sports', price: 35 },
  { id: 2, productName: 'foot-massage', category: 'sports', price: 35 },
  { id: 3, productName: 'foot-massage', category: 'sports', price: 35 },
  { id: 4, productName: 'foot-massage', category: 'sports', price: 35 },
  { id: 5, productName: 'foot-massage', category: 'sports', price: 35 },
  { id: 6, productName: 'foot-massage', category: 'sports', price: 35 },
];

export default function DataTable() {
  const navigation = useRouter();

  const handleRowClick = (params: GridValueGetterParams) => {
    const { productName } = params.row;
    navigation.push(`/product/${productName}`);
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const filteredRows = rows.filter((row) =>
    row.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Products</h1>
      <fieldset style={{ width: '300px' }}>
        <legend>Search a product</legend>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter product name..."
        />
      </fieldset>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={paginatedRows}
          columns={columns}
          onRowClick={handleRowClick}
          pageSize={rowsPerPage}
        />
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}