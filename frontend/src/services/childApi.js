import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const childApi = createApi({
  reducerPath: "childApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const child = JSON.parse(localStorage.getItem("child"));

      if (child?.token) {
        headers.set("Authorization", `Token ${child.token}`);
        console.log("Added Authorization header for child");
      } else {
        console.warn("No child token found");
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginChild: builder.mutation({
      query: (data) => ({
        url: "user/child-register/",
        method: "POST",
        body: data,
      }),
    }),
    getDrawsByChild: builder.query({
      query: () => ({
        url: "child/draws/",
        method: "GET",
      }),
    }),
    deleteDrawByChild: builder.mutation({
      query: (drawId) => ({
        url: `child/draws/${drawId}/`,
        method: "DELETE",
      }),
    }),
    createDraw: builder.mutation({
      query: (data) => ({
        url: "child/draws/",
        method: "POST",
        body: data,
      }),
    }),
    updateDraw: builder.mutation({
      query: (data) => ({
        url: `child/draws/${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDrawsByChildQuery,
  useLoginChildMutation,
  useDeleteDrawByChildMutation,
  useCreateDrawMutation,
  useUpdateDrawMutation,
} = childApi;