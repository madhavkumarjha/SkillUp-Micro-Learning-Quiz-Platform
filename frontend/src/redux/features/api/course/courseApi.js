import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => "/course/all",
      providesTags: ["Course"],
    }),

    getCourseById: builder.query({
      query: (id) => `/course/${id}`,
    }),

    createCourse: builder.mutation({
      query: (body) => ({
        url: "/course/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

    updateCourse: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/course/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteCourse: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/course/${id}`,
        method: "DELETE",
        body: rest,
      }),
      invalidatesTags: ["Course"],
    }),

    publishCourse: builder.mutation({
      query: ({ id, isPublished }) => ({
        url: `/course/publish/${id}`,
        method: "PATCH",
        body: { isPublished },
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  usePublishCourseMutation,
} = courseApi;