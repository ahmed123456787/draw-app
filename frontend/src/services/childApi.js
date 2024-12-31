import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const childApi = createApi({
  reducerPath: "childApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // Include cookies in requests
  }),
  endpoints: (builder) => ({
    loginChild: builder.mutation({
      query: (data) => ({
        url: "user/child-register/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginChildMutation } = childApi;
