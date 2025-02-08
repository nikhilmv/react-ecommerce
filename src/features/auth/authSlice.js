import { createSlice } from "@reduxjs/toolkit";


const storedAdminAuth = JSON.parse(localStorage.getItem("adminAuth"));

const initialState = {
  accessToken: storedAdminAuth?.accessToken || undefined,
  admin: storedAdminAuth?.admin || undefined,
};

const authSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLoggedIn: (state, action) => { 
      state.accessToken = action.payload.accessToken;
      state.admin = action.payload.admin;
    },
    adminLoggedOut: (state) => {
      state.accessToken = undefined;
      state.admin = undefined;
       // Remove from localStorage
      localStorage.removeItem("adminAuth");
    },
  },
});

export default authSlice.reducer;
export const { adminLoggedIn, adminLoggedOut } = authSlice.actions;
