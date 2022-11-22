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
  "fetchUserHistory",
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

export const fetchUserWishlist = createAsyncThunk(
  "fetchUserWishlist",
  async (id) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.get(`/api/users/${id}/wishlist`, {
        headers: { authorization: token },
      });
      return data;
    }
  }
);

export const editSingleUser = createAsyncThunk(
  "editUser",
  async ({ id, username, email, phone, imageUrl, cuisine, zipcode }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.put(
        `/api/users/${id}`,
        { username, email, phone, imageUrl, cuisine, zipcode },
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
        `/api/users/${userId}/history`,
        { id },
        {
          headers: { authorization: token },
        }
      );
      return data;
    }
  }
);

export const createNewUserHistory = createAsyncThunk(
  "createUserHistory",
  async ({ id, userId, name }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(
        `/api/users/${userId}/history`,
        { id, name },
        {
          headers: { authorization: token },
        }
      );
      return data;
    }
  }
);

export const createNewWishlistItem = createAsyncThunk(
  "createWishlistItem",
  async ({ id, userId, name }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(
        `/api/users/${userId}/wishlist`,
        { id, name },
        {
          headers: { authorization: token },
        }
      );
      return data;
    }
  }
);

export const addOrRemoveFromFavorites = createAsyncThunk(
  "addOrRemoveFromFavorites",
  async ({ id, userId }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.put(
        `/api/users/${userId}/favorites`,
        { id },
        {
          headers: { authorization: token },
        }
      );
      return data;
    }
  }
);

export const deleteWishlistItem = createAsyncThunk(
  "deleteWishlist",
  async ({ id, userId }) => {
    const token = window.localStorage.getItem("token");
    // if (token) {
    const { data } = await axios.delete(
      `/api/restaurants/${userId}`,
      { id }
      // {
      //   headers: { authorization: token },
      // }
    );
    return data;
    // }
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
    currentUserHistory: [],
    currentUserWishlist: [],
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
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(fetchUserWishlist.fulfilled, (state, action) => {
      state.currentUserWishlist = action.payload;
    });
    builder.addCase(fetchUserWishlist.rejected, (state, action) => {
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
    builder.addCase(editSingleUserHistory.fulfilled, (state, action) => {
      state.currentUserHistory = action.payload;
    });
    builder.addCase(editSingleUserHistory.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(addOrRemoveFromFavorites.fulfilled, (state, action) => {
      state.currentUserHistory = action.payload;
    });
    builder.addCase(addOrRemoveFromFavorites.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(createNewUserHistory.fulfilled, (state, action) => {
      state.currentUserHistory.push(action.payload);
    });
    builder.addCase(createNewUserHistory.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(createNewWishlistItem.fulfilled, (state, action) => {
      state.currentUserWishlist.push(action.payload);
    });
    builder.addCase(createNewWishlistItem.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteWishlistItem.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      }
      state.error = action.error.message;
    });
    builder.addCase(deleteWishlistItem.fulfilled, (state, action) => {
      state.currentUserWishlist = state.currentUserWishlist.filter(
        (restaurant) => restaurant.restaurantId !== action.payload.restaurantId
      );
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
