import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  user: {
    id: null,
    username: "",
    email: "",
  },
  children: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuserData: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.user.id = action.payload.user.id;
      state.user.username = action.payload.user.username;
      state.user.email = action.payload.user.email;
    },
    setChildren: (state, action) => {
      state.children = action.payload;
    },
  },
});

export const { setuserData, setChildren } = userSlice.actions; // export the action
export default userSlice.reducer; // export the reducer
