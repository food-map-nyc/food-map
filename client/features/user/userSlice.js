import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("allUsers", async () => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.get(`/api/users`, {
        headers: { authorization: token },
      });
      return data;
    }
  } catch (err) {
    // o: avoid try catches in thunks
    console.log(`${err} from get all users`);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    })
    
    builder.addCase(fetchUsers.rejected, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUsers = (state) => {
  return state.users;
};

export default usersSlice.reducer;
