import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL
  }),
  endpoints: (builder) => ({
    getAllCoursesPublic: builder.query({
      query: () => "/course/all",
    }),
    getAllInstructorsPublic: builder.query({
      query: () => "/instructor/all",
    }),
  }),
});

export const {
useGetAllCoursesPublicQuery,
useGetAllInstructorsPublicQuery
}=publicApi;
