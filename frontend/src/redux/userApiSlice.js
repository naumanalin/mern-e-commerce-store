import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const signUp = createAsyncThunk('user/signUp', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, formData, { withCredentials: true });
    toast.success("Account created successfully!");
    return response.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Signup failed");
    return rejectWithValue(error.response.data);
  }
});

export const logIn = createAsyncThunk('user/logIn', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, formData, { withCredentials: true });
    toast.success("Logged in successfully!");
    return response.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed");
    return rejectWithValue(error.response.data);
  }
});

export const logOut = createAsyncThunk('user/logOut', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    toast.success("Logged out");
    return true;
  } catch (error) {
    toast.error( error.message || "Logout failed",{position:'bottom-right'});
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        // signUp
      .addCase(signUp.pending, state => { state.isLoading = true; })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(signUp.rejected, state => { state.isLoading = false; state.isError = true; })

      // logIn
      .addCase(logIn.pending, state => { state.isLoading = true; })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(logIn.rejected, state => { state.isLoading = false; state.isError = true; })

      // logIn
      .addCase(logOut.fulfilled, state => {
        state.user = null;
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export default userSlice.reducer;
