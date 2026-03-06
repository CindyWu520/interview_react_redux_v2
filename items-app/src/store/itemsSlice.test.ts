import { configureStore } from '@reduxjs/toolkit';
import itemsReducer, { loadItems } from './itemsSlice';

// ✅ Mock API
jest.mock('../api/itemsApi', () => ({
  fetchItems: jest.fn(),
}));

import { fetchItems } from '../api/itemsApi';

const makeStore = () =>
  configureStore({ reducer: { items: itemsReducer } });

const mockItems = [
  {
    guid: 'guid1',
    name: 'name1',
    path: ['path1', 'path2'],
    properties: { propString: 'value1' },
  },
];

test('initial state is correct', () => {
  const store = makeStore();
  const state = store.getState().items;
  expect(state.items).toEqual([]);
  expect(state.loading).toBe(false);
  expect(state.error).toBeNull();
});

test('sets loading true when fetching items', () => {
  const store = makeStore();
  store.dispatch(loadItems());
  expect(store.getState().items.loading).toBe(true);
});

test('stores items on successful fetch', async () => {
  (fetchItems as jest.Mock).mockResolvedValue(mockItems);
  const store = makeStore();
  await store.dispatch(loadItems());
  expect(store.getState().items.items).toEqual(mockItems);
  expect(store.getState().items.loading).toBe(false);
});

test('sets error on failed fetch', async () => {
  (fetchItems as jest.Mock).mockRejectedValue(new Error('Network error'));
  const store = makeStore();
  await store.dispatch(loadItems());
  expect(store.getState().items.error).toBe('Network error');
  expect(store.getState().items.loading).toBe(false);
});