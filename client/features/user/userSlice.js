import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("allUsers", async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const { data } = await axios.get(`/api/users`, {
      headers: { authorization: token },
    });
    return data;
  }
});

export const fetchSingleUser = createAsyncThunk("singleUser", async (id) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const { data } = await axios.get(`/api/users/${id}`, {
      headers: { authorization: token },
    });
    return data;
  }
});

export const editSingleUser = createAsyncThunk(
  "editUser",
  async ({
    id,
    username,
    email,
    phone,
    imageUrl,
    preferred,
    cuisine,
    zipcode,
  }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.put(
        `/api/users/${id}`,
        { username, email, phone, imageUrl, preferred, cuisine, zipcode },
        {
          headers: { authorization: token },
        }
      );
      return data;
    }
  }
);

export const deleteSingleUser = createAsyncThunk("deleteUser", async (user) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const { data } = await axios.delete(`/api/users/${user}`, {
      headers: { authorization: token },
    });
    return data;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchSingleUser.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(editSingleUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.users.filter((user) => user.id !== action.payload.id);
      state.users.push(action.payload);
    });
    builder.addCase(editSingleUser.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(deleteSingleUser.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(deleteSingleUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });
  },
});

export default usersSlice.reducer;
