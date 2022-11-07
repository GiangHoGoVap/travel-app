import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice.js';

export const store = configureStore({
  reducer: {
    order: orderReducer,
  },
});
