import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const drawApi = createApi({
  reducerPath: "drawapi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // Include cookies in requests
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
    getDraws: builder.query({
      query: () => "parent/draws/",

      transformResponse: (response) => response || [],
    }),
    updateDraw: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `parent/draws/${id}/`,
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteDraw: builder.mutation({
      query: (id) => ({
        url: `parent/draws/${id}/`,
        method: "DELETE",
      }),
    }),
    getDrawsByChild: builder.query({
      query: () => `child/draws/`,
    }),
  }),
});

export const {
  useGetDrawsQuery,
  useUpdateDrawMutation,
  useDeleteDrawMutation,
  useGetDrawsByChildQuery,
} = drawApi;
