import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import restaurantReducer from '../features/restaurant/restaurantSlice'

const store = configureStore({
  reducer: { auth: authReducer,
  restaurant: restaurantReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';