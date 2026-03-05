import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { RootState } from '../../store';
import { getImageUrl } from '../../api/itemsApi';

const ImageTab: React.FC = () => {
  const guid = useSelector((state: RootState) => state.selectedItem.guid);

  if (!guid) return <Typography sx={{ p: 2, color: 'text.secondary' }}>Select an item to view image</Typography>;

  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
      <img
        src={getImageUrl(guid)}
        alt={`Item ${guid}`}
        style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8, objectFit: 'contain' }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </Box>
  );
};

export default ImageTab;