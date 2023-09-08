import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("userss", JSON.stringify(action.payload));
      Cookies.set("userss", JSON.stringify(action.payload));
    },

    logout(state, action) {
      localStorage.clear();
      Cookies.remove();
      state = null;
    },
  },
});

export const { addUser, logout } = UserSlice.actions;
export default UserSlice.reducer;

