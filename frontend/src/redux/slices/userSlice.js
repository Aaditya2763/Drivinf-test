import { createSlice } from "@reduxjs/toolkit";
import { loginUserAction, logoutAction, registerUserAction } from "../actions/authActions";
import { drivingTestRegistration,updateUserProfilePhotoAction } from "../actions/userAction";



const initialState={
  user: "",
  testRegistartionData: "",
  loading: false,
  appErr: null,
  serverErr: null,
  updatedProfileImage:""
};
const userSlice = createSlice({
  name: "user",
  initialState,
 
  reducers: {
    clearErrors: (state) => {
      state.appErr = null;
      state.serverErr = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(drivingTestRegistration.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(drivingTestRegistration.fulfilled, (state, action) => {
      state.loading = false;
      
      state.testRegistartionData = action?.payload;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(drivingTestRegistration.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message || 'An error occurred';
      state.serverErr = action?.payload?.message || 'Network error';
    });

    // login
    builder.addCase(updateUserProfilePhotoAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(updateUserProfilePhotoAction.fulfilled, (state, action) => {
      state.registered = "";
      state.updatedProfileImage= action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(updateUserProfilePhotoAction.rejected, (state, action) => {
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

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
