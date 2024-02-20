import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {apiSlice} from '../redux/features/api/apiSlice';
import { apiSliceHR } from '../redux/features/api/apiSliceHR';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSliceHR.reducerPath]: apiSliceHR.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(apiSliceHR.middleware),
});

setupListeners(store.dispatch);