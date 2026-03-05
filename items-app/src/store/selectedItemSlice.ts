import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemProperties } from '../types';

const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState: {
    guid: null as string | null,
    properties: null as ItemProperties | null,
    activeTab: 0,
    loading: false,
  },
  reducers: {
    selectItem: (state, action: PayloadAction<{ guid: string; properties: ItemProperties }>) => {
      state.guid = action.payload.guid;
      state.properties = action.payload.properties;
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { selectItem, setActiveTab } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;