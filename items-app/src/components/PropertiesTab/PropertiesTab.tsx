import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, CircularProgress, Divider } from '@mui/material';
import { RootState } from '../../store';

const PropertiesTab: React.FC = () => {
  const { properties, loading } = useSelector((state: RootState) => state.selectedItem);

  if (loading) return <CircularProgress size={24} sx={{ m: 2 }} />;
  if (!properties) return <Typography sx={{ p: 2, color: 'text.secondary' }}>Select an item to view properties</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      {Object.entries(properties).map(([key, value], idx) => (
        <Box key={key}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{key}</Typography>
            <Typography
              sx={{
                textAlign: 'right',
                fontVariantNumeric: 'tabular-nums',
                color: typeof value === 'number' ? '#1976d2' : 'text.primary',
              }}
            >
              {String(value)}
            </Typography>
          </Box>
          {idx < Object.entries(properties).length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
};

export default PropertiesTab;