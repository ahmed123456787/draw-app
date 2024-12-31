import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { parentApi } from "../services/parentApi";
import { drawApi } from "./../services/drawApi";
import { childApi } from "../services/childApi";

import userReducer from "./slicers/userSlice";

export const store = configureStore({
  reducer: {
    [parentApi.reducerPath]: parentApi.reducer,
    auth: userReducer,
    [drawApi.reducerPath]: drawApi.reducer,
    [childApi.reducerPath]: childApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(parentApi.middleware)
      .concat(drawApi.middleware)
      .concat(childApi.middleware),
});

setupListeners(store.dispatch);