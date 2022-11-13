import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk("singleUser", async (id) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: { authorization: token },
      });
      return data;
    }
  } catch (err) {
    console.log(`${err} from get single users`);
  }
});


export const editSingleUser = createAsyncThunk("editUser", async ({id,username, email,phone,imageUrl,preferred,zipcode}) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.put(`/api/users/${id}`, {username, email,phone,imageUrl,preferred,zipcode}, {
        headers: { authorization: token },
      });
      return data;
    }
  } catch (err) {
    console.log(`${err} from  edit user`);
  }
});

export const deleteSingleUser = createAsyncThunk("deleteUser", async (user) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.delete(`/api/users/${user}`, {
        headers: { authorization: token },
      });
      return data;
    }
  } catch (err) {
    console.log(`${err} from  delete user`);
  }
});

const singleUserSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUsers = (state) => {
  return state.singleUser;
};

export default singleUserSlice.reducer;
