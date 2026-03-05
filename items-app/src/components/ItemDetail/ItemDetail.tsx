import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Tabs, Tab, Box } from '@mui/material';
import { RootState, AppDispatch } from '../../store';
import { setActiveTab } from '../../store/selectedItemSlice';
import PropertiesTab from '../PropertiesTab/PropertiesTab';
import ImageTab from '../ImageTab/ImageTab';

const ItemDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeTab = useSelector((state: RootState) => state.selectedItem.activeTab);

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Tabs
        value={activeTab}
        onChange={(_, val) => dispatch(setActiveTab(val))}
        sx={{ borderBottom: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}
      >
        <Tab label="Properties" />
        <Tab label="Image" />
      </Tabs>
      <Box>
        {activeTab === 0 && <PropertiesTab />}
        {activeTab === 1 && <ImageTab />}
      </Box>
    </Paper>
  );
};

export default ItemDetail;