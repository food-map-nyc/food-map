import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getSuggestedResturant  = createAsyncThunk(
  "suggestion", async ({searchParams}) => {
      const { data } = await axios.get(`api/yelp/suggestion`, {searchParams});
      return data;
  }
);



export const suggestionSlice = createSlice({
    name: "suggestion",
    initialState: {
      suggested: [],
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getSuggestedResturant.fulfilled, (state, action) => {
        state.restaurants = action.payload;
      });
      builder.addCase(getSuggestedResturant.rejected, (state, action) => {
        state.error = action.payload.errorMessage
      })
    },
  });
  
  export default suggestionSlice.reducer;
  