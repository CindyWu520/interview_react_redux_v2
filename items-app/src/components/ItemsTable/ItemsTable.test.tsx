import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ItemsTable from './ItemsTable';
import itemsReducer from '../../store/itemsSlice';
import selectedItemReducer from '../../store/selectedItemSlice';

// ✅ Mock API so loadItems doesn't make real HTTP calls
jest.mock('../../api/itemsApi', () => ({
  fetchItems: jest.fn().mockResolvedValue([]),
  getImageUrl: jest.fn().mockReturnValue(''),
}));

const mockItems = [
  {
    guid: 'guid1',
    name: 'name1',
    path: ['path1', 'path2'],
    properties: {
      propString: 'value1',
      propNumber: 1,
      date: '10/10/2014',
    },
  },
  {
    guid: 'guid2',
    name: 'name2',
    path: ['path3', 'path4'],
    properties: {
      property3: 'value3',
      property4: 'value4',
    },
  },
];

// ✅ Factory function - fresh store per test
const makeStore = (itemsState: {
  items: any[];
  loading: boolean;
  error: string | null;
}) =>
  configureStore({
    reducer: {
      items: itemsReducer,
      selectedItem: selectedItemReducer,
    },
    preloadedState: {
      items: itemsState,
    },
  });

const withItemsStore = () =>
  makeStore({ items: mockItems, loading: false, error: null });

const withLoadingStore = () =>
  makeStore({ items: [], loading: true, error: null });

const withErrorStore = () =>
  makeStore({ items: [], loading: false, error: 'Failed to load' });

test('renders table headers correctly', () => {
  render(<Provider store={withItemsStore()}><ItemsTable /></Provider>);
  expect(screen.getByText('GUID')).toBeInTheDocument();
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Path')).toBeInTheDocument();
});

test('renders items from store', () => {
  render(<Provider store={withItemsStore()}><ItemsTable /></Provider>);
  expect(screen.getByText('guid1')).toBeInTheDocument();
  expect(screen.getByText('name1')).toBeInTheDocument();
  expect(screen.getByText('path1/path2')).toBeInTheDocument();
});

test('renders all items', () => {
  render(<Provider store={withItemsStore()}><ItemsTable /></Provider>);
  expect(screen.getByText('guid1')).toBeInTheDocument();
  expect(screen.getByText('guid2')).toBeInTheDocument();
});

test('selects item on row click', () => {
  render(<Provider store={withItemsStore()}><ItemsTable /></Provider>);
  const rows = screen.getAllByRole('row');
  // rows[0] = header, rows[1] = guid1, rows[2] = guid2
  fireEvent.click(rows[1]);
  expect(rows[1]).toHaveClass('Mui-selected');
});

test('shows loading spinner when loading', () => {
  render(<Provider store={withLoadingStore()}><ItemsTable /></Provider>);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('shows error message when error occurs', () => {
  render(<Provider store={withErrorStore()}><ItemsTable /></Provider>);
  expect(screen.getByText('Failed to load')).toBeInTheDocument();
});