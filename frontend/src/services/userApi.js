import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useNavigate } from "react-router-dom";

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
      // Handling errors in the userChildren query here.
      // You can return a default state if needed, for example:
      transformResponse: (response) => response || [],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginChildMutation,
  useUserChildrenQuery,
} = userApi;
