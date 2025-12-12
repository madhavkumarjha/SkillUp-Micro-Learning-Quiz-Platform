import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const helperApi = createApi({
  reducerPath: "helperApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Helper"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (id) => `/auth/profile/${id}`,
      providesTags: ["Helper"],
    }),

    updateProfilePic: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/auth/profile/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Helper"],
    }),

    updateUserProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/update/profile/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Helper"],
    }),

    updateUserPassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/change-password/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Helper"],
    }),

    uploadCourseMedia: builder.mutation({
      query: (formData) => ({
        url: "/upload/course",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Helper"],
    }),
  }),
});

export const { useUpdateProfilePicMutation, useGetUserProfileQuery,useUpdateUserPasswordMutation,useUpdateUserProfileMutation,useUploadCourseMediaMutation } =
  helperApi;
