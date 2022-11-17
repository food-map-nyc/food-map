import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllRestaurant = createAsyncThunk(
  "fetchAllRestaurant", async () => {
      const { data } = await axios.get(`api/yelp`);
      return data;
  }
);

export const fetchSingleRestaurant = createAsyncThunk(
  "fetchSingleRestaurant",
  async (id) => {
      const  data  = await axios.get(`api/yelp/${id}`);
      console.log(data, "data from single fetch")
      console.log (id,"id from slice")
      return data[0];
  }
);

export const fetchResturantReviews = createAsyncThunk(
  "resturantReviews",
  async (id) => {
      const { data } = await axios.get(`api/yelp/${id}/reviews`);
      return data;
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
