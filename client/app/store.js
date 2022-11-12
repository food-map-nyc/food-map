
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";
import userReducer from "../features/user/userSlice";
import singleUserReducer from "../features/user/singleUserSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    user: userReducer,
    singleUser: singleUserReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
