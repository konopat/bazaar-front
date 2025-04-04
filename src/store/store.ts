import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Создаем rootReducer для повторного использования с SSR
export const rootReducer = {
  cart: cartReducer,
};

// Создаем store без начального состояния
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 