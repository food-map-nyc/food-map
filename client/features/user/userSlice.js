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

export const fetchSingleUserHistory = createAsyncThunk(
  "userHistory",
  async (id) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.get(`/api/users/${id}/history`, {
        headers: { authorization: token },
      });
      return data;
    }
  }
);

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

export const editSingleUserHistory = createAsyncThunk(
  "editUserHistory",
  async ({ id, userId }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.put(
        `/api/users/${id}/history`,
        { id },
        {
          headers: { authorization: token },
        }
      );
      return data;
    }
  }
);

// export const addOrRemoveFromFavorites = createAsyncThunk("addOrRemoveFromFavorites", async ({ id, userId }) => {
//   const token = window.localStorage.getItem("token");
//   if (token) {
//     const { data } = await axios.put(`api/users/${userId}/history`, {id}, {
//       headers: { authorization: token },
//     })
//     return data;
//   }
// })

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
    currentUserHistory: [],
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
    builder.addCase(fetchSingleUserHistory.fulfilled, (state, action) => {
      state.currentUserHistory = action.payload;
    });
    builder.addCase(fetchSingleUserHistory.rejected, (state, action) => {
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
    builder.addCase(editSingleUserHistory.fulfilled, (state, action) => {
      state.currentUserHistory.map((restaurant) => {
        if (restaurant.id === action.payload.id) {
          restaurant = action.payload;
        }
      });
    });
    builder.addCase(editSingleUserHistory.rejected, (state, action) => {
      state.error = action.error.message;
    });
    // builder.addCase(addOrRemoveFromFavorites.fulfilled, (state, action) => {
    //   state.currentUserHistory.map((restaurant) => {
    //     if (restaurant.id === action.payload.id) {
    //       restaurant = action.payload;
    //     }
    //   });
    // });
    // builder.addCase(addOrRemoveFromFavorites.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
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
