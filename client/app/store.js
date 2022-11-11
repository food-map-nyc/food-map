import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import restaurantReducer from '../features/restaurant/restaurantSlice'
import singleUserReducer from '../features/user/singleUserSlice';
const store = configureStore({
  reducer: { auth: authReducer,
  restaurant: restaurantReducer, 
  user: singleUserReducer,
},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';