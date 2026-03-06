import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PropertiesTab from './PropertiesTab';
import selectedItemReducer from '../../store/selectedItemSlice';
import itemsReducer from '../../store/itemsSlice';

const makeStore = (properties: any, loading = false) =>
  configureStore({
    reducer: {
      items: itemsReducer,
      selectedItem: selectedItemReducer,
    },
    preloadedState: {
      selectedItem: {
        guid: 'guid1',
        properties,
        activeTab: 0,
        loading,
      },
    },
  });

test('shows placeholder when no item selected', () => {
  render(<Provider store={makeStore(null)}><PropertiesTab /></Provider>);
  expect(screen.getByText('Select an item to view properties')).toBeInTheDocument();
});

test('renders property keys and values', () => {
  render(
    <Provider store={makeStore({ propString: 'value1', propNumber: 1 })}>
      <PropertiesTab />
    </Provider>
  );
  expect(screen.getByText('propString')).toBeInTheDocument();
  expect(screen.getByText('value1')).toBeInTheDocument();
});

test('shows loading spinner when loading', () => {
  render(<Provider store={makeStore(null, true)}><PropertiesTab /></Provider>);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});