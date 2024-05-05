import { configureStore } from '@reduxjs/toolkit';
import problemReducer from './slices/problemSlice';

export const store = configureStore({
  reducer: {
    problem: problemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


