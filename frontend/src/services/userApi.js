import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.access) {
        // If the token exists, set it in the Authorization header
        headers.set("Authorization", `Bearer ${user.access}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "user/token/",
        method: "POST",
        body: data,
      }),
    }),
    loginChild: builder.mutation({
      query: (data) => ({
        url: "user/child-register/",
        method: "POST",
        body: data,
      }),
    }),
    userChildren: builder.query({
      query: () => "user/children/",

      transformResponse: (response) => response || [],
    }),
    createChildren: builder.mutation({
      query: (data) => ({
        url: "user/children/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginChildMutation,
  useUserChildrenQuery,
  useCreateChildrenMutation,
} = userApi;
