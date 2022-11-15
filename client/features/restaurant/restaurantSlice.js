import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRestaurant = createAsyncThunk(
  "fetchAllRestaurant", async () => {
      const { data } = await axios.get(
        "https://data.cityofnewyork.us/resource/43nn-pn8j.json"
      );
      return data;
  }
);

export const fetchSingleRestaurant = createAsyncThunk(
  "fetchSingleRestaurant",
  async (camis) => {
      const { data } = await axios.get(
        "https://data.cityofnewyork.us/resource/43nn-pn8j.json",
        {
          params: {
            camis: camis,
          },
        }
      );
      return data[0];
  }
);

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurants: [],
    restaurant: {},
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllRestaurant.fulfilled, (state, action) => {
      state.restaurants = action.payload;
    });
    builder.addCase(fetchAllRestaurant.rejected, (state, action) => {
      state.error = action.payload.errorMessage
    });
    builder.addCase(fetchSingleRestaurant.fulfilled, (state, action) => {
      state.restaurant = action.payload;
    });
    builder.addCase(fetchSingleRestaurant.rejected, (state, action) => {
      state.error = action.payload.errorMessage;
    });
  },
});

export default restaurantSlice.reducer;
