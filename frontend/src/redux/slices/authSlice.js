import { createSlice } from "@reduxjs/toolkit";
import { loginUserAction, logoutAction, registerUserAction } from "../actions/authActions";



const initialState={
  user: "",
  registered: "",
  loading: false,
  appErr: null,
  serverErr: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
 
  reducers: {
    clearErrors: (state) => {
      state.appErr = null;
      state.serverErr = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message || 'An error occurred';
      state.serverErr = action?.payload?.message || 'Network error';
    });

    // login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.registered = "";
      state.user = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

    // logoutAction
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;
