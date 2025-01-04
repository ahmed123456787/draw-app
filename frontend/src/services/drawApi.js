import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;


export const drawApi = createApi({
  reducerPath: "drawapi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { endpoint }) => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const child = JSON.parse(localStorage.getItem("child"));
        // Add Authorization header if user exists
        if (user?.access) {
          headers.set("Authorization", `Bearer ${user.access}`);
          headers.set("Auth", `Token ${child.token}`);

          console.log("Added Authorization header");
        } else {
          console.warn("No user access token found");
        }

        return headers;
      } catch (error) {
        console.error("Error preparing headers:", error);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getDraws: builder.query({
      query: () => ({
        url: "parent/draws/",
        // Explicitly set method for clarity
        method: "GET",
      }),
      transformResponse: (response) => response || [],
    }),
    updateDraw: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `parent/draws/${id}/`,
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteDrawByParent: builder.mutation({
      query: (id) => ({
        url: `parent/draws/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetDrawsQuery, useUpdateDrawMutation, useDeleteDrawByParentMutation } =
  drawApi;





