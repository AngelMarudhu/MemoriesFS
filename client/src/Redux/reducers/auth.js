import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../apiaxios/index.js';

export const createAuth = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    localStorage: null,
    // action creators
  },
  extraReducers: (builder) => {
    builder.addCase(api.signIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });
    builder.addCase(api.signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.result;
      state.localStorage = localStorage.setItem(
        'profile',
        JSON.stringify(action.payload)
      );
      //   console.log(action.payload.result);
      //   console.log(action.payload.token);
    });
    builder.addCase(api.signIn.rejected, (state, action) => {
      //   console.log(action);
      state.isLoading = true;
      state.error = action.error.message;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      console.log(state.error);
    });

    builder.addCase(api.signUp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.user = {};
    });
    builder.addCase(api.signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.result;
      state.localStorage = localStorage.setItem(
        'profile',
        JSON.stringify(action.payload)
      );
      console.log(action.payload.result);
      console.log(action.payload.token);
    });
    builder.addCase(api.signUp.rejected, (state, action) => {
      console.log(action);
      state.isLoading = true;
      state.error = action.error.message;
      state.isAuthenticated = false;
      state.token = null;
      state.user = {};
      console.log(state.error);
    });
  },
});

//export const { logout } = createAuth.actions;

export default createAuth.reducer;
