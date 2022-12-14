import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRestaurant = createAsyncThunk(
  "fetchAllRestaurant",
  async (pageNumber) => {
    const { data } = await axios.get(`/api/restaurants/page/${pageNumber}`);
    return data;
  }
);

export const fetchByBorough = createAsyncThunk(
  "fetchByBorough",
  async ({ borough, page }) => {
    const { data } = await axios.get(`/api/restaurants/${borough}/${page}`);
    return data;
  }
);

export const fetchByCuisine = createAsyncThunk(
  "fetchByCuisine",
  async ({ cuisine, page }) => {
    const { data } = await axios.get(`/api/restaurants/${cuisine}/${page}`);
    return data;
  }
);

export const fetchByBoroughCuisine = createAsyncThunk(
  "fetchByBoroughCuisine",
  async ({ borough, cuisine, page }) => {
    const { data } = await axios.get(
      `/api/restaurants/${borough}/${cuisine}/${page}`
    );
    return data;
  }
);

export const fetchSingleRestaurant = createAsyncThunk(
  "fetchSingleRestaurant",
  async (id) => {
    const { data } = await axios.get(`/api/restaurants/${id}`);
    return data;
  }
);

export const fetchResturantReviews = createAsyncThunk(
  "resturantReviews",
  async (id) => {
    const { data } = await axios.get(`api/yelp/${id}/reviews`);
    return data;
  }
);


export const fetchFeatured = createAsyncThunk(
  "fetchFeatured",
  async () => {
    const { data } = await axios.get(`/api/restaurants/featured`);
    return data;
  }
);

export const fetchReviews = createAsyncThunk(
  "fetchReviews",
  async (id) => {
    const { data } = await axios.get(`/api/suggestion/${id}`);
    return data;
  }
);

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurants: [],
    restaurant: {},
    featured: [],
    reviews: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllRestaurant.fulfilled, (state, action) => {
      state.restaurants = action.payload;
    });
    builder.addCase(fetchAllRestaurant.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(fetchByBorough.fulfilled, (state, action) => {
      state.restaurants = action.payload;
    });
    builder.addCase(fetchByBorough.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(fetchByCuisine.fulfilled, (state, action) => {
      state.restaurants = action.payload;
    });
    builder.addCase(fetchByCuisine.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(fetchByBoroughCuisine.fulfilled, (state, action) => {
      state.restaurants = action.payload;
    });
    builder.addCase(fetchByBoroughCuisine.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(fetchSingleRestaurant.fulfilled, (state, action) => {
      state.restaurant = action.payload;
    });
    builder.addCase(fetchSingleRestaurant.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(fetchFeatured.fulfilled, (state, action) => {
      state.featured = action.payload;
    });
    builder.addCase(fetchFeatured.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
  },
});

export default restaurantSlice.reducer;
