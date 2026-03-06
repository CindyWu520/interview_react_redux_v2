import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer, { selectItem, setActiveTab } from './selectedItemSlice';

const makeStore = () =>
  configureStore({ reducer: { selectedItem: selectedItemReducer } });

test('initial state is correct', () => {
  const store = makeStore();
  const state = store.getState().selectedItem;
  expect(state.guid).toBeNull();
  expect(state.properties).toBeNull();
  expect(state.activeTab).toBe(0);
});

test('selectItem updates guid and properties', () => {
  const store = makeStore();
  store.dispatch(selectItem({
    guid: 'guid1',
    properties: { propString: 'value1' },
  }));
  expect(store.getState().selectedItem.guid).toBe('guid1');
  expect(store.getState().selectedItem.properties).toEqual({ propString: 'value1' });
});

test('setActiveTab updates active tab', () => {
  const store = makeStore();
  store.dispatch(setActiveTab(1));
  expect(store.getState().selectedItem.activeTab).toBe(1);
});

test('switching items preserves active tab', () => {
  const store = makeStore();
  // Set tab to Image tab
  store.dispatch(setActiveTab(1));
  // Switch to different item
  store.dispatch(selectItem({
    guid: 'guid2',
    properties: { propString: 'value2' },
  }));
  // Tab should still be 1
  expect(store.getState().selectedItem.activeTab).toBe(1);
});