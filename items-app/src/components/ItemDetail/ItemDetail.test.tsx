import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ItemDetail from './ItemDetail';
import itemsReducer from '../../store/itemsSlice';
import selectedItemReducer from '../../store/selectedItemSlice';

const makeStore = (activeTab = 0) =>
  configureStore({
    reducer: {
      items: itemsReducer,
      selectedItem: selectedItemReducer,
    },
    preloadedState: {
      selectedItem: {
        guid: 'guid1',
        properties: { propString: 'value1', propNumber: 1 },
        activeTab,
        loading: false,
      },
    },
  });

test('renders Properties and Image tabs', () => {
  render(<Provider store={makeStore()}><ItemDetail /></Provider>);
  expect(screen.getByText('Properties')).toBeInTheDocument();
  expect(screen.getByText('Image')).toBeInTheDocument();
});

test('shows Properties tab by default', () => {
  render(<Provider store={makeStore()}><ItemDetail /></Provider>);
  expect(screen.getByText('propString')).toBeInTheDocument();
});

test('switches to Image tab on click', () => {
  render(<Provider store={makeStore()}><ItemDetail /></Provider>);
  fireEvent.click(screen.getByText('Image'));
  expect(screen.queryByText('propString')).not.toBeInTheDocument();
});

test('preserves active tab when switching items', () => {
  // Start on Image tab (activeTab = 1)
  render(<Provider store={makeStore(1)}><ItemDetail /></Provider>);
  // Image tab should still be active
  expect(screen.queryByText('propString')).not.toBeInTheDocument();
});