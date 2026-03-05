import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress, Typography
} from '@mui/material';
import { RootState, AppDispatch } from '../../store';
import { loadItems } from '../../store/itemsSlice';
import { selectItem } from '../../store/selectedItemSlice';
import { Item } from '../../types';

const ItemsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.items);
  const selectedGuid = useSelector((state: RootState) => state.selectedItem.guid);

  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  const handleRowClick = (item: Item) => {
    dispatch(selectItem({
      guid: item.guid,
      properties: item.properties
    }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1976d2' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>GUID</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Path</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.guid}
              onClick={() => handleRowClick(item)}
              selected={item.guid === selectedGuid}
              sx={{
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#e3f2fd' },
                '&.Mui-selected': { backgroundColor: '#bbdefb !important' },
              }}
            >
              <TableCell>{item.guid}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.path.join('/')}</TableCell> {/* ← join array with / */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;