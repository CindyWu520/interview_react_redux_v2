import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchItems } from '../api/itemsApi';
import { Item } from '../types';

export const loadItems = createAsyncThunk('items/loadItems', async () => {
  return await fetchItems();
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [] as Item[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => { state.loading = true; })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load';
      });
  },
});

export default itemsSlice.reducer;