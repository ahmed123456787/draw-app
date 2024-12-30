import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./../services/userApi";
import { drawApi } from "./../services/drawApi";
import userReducer from "./slicers/userSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: userReducer,
    [drawApi.reducerPath]: drawApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(drawApi.middleware),
});

setupListeners(store.dispatch);