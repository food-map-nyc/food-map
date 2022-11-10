import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRestaurant = createAsyncThunk(
  "fetchAllRestaurant",
  async () => {
    try {
      const { data } = await axios.get(
        "https://data.cityofnewyork.us/resource/43nn-pn8j.json"
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchSingleRestaurant = createAsyncThunk(
  "fetchSingleRestaurant",
  async (camis) => {
    try {
      const { data } = await axios.get(
        "https://data.cityofnewyork.us/resource/43nn-pn8j.json",
        {
          params: {
            camis: camis,
          },
        }
      );
      return data[0];
    } catch (err) {
      console.log(err);
    }
  }
);

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurants: [],
    restaurant: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllRestaurant.fulfilled, (state, action) => {
      state.restaurants = action.payload;
    });
    builder.addCase(fetchSingleRestaurant.fulfilled, (state, action) => {
      state.restaurant = action.payload;
    });
  },
});

export default restaurantSlice.reducer;
