import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instructorApi = createApi({
  reducerPath: "instructorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Instructor"],
  endpoints: (builder) => ({
    getAllInstructors: builder.query({
      query: () => "/instructor/all",
      providesTags: ["Instructor"],
    }),

    getInstructorById: builder.query({
      query: (id) => `/instructor/${id}`,
    }),

    createInstructor: builder.mutation({
      query: (body) => ({
        url: "/instructor/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Instructor"],
    }),

    updateInstructor: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/instructor/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Instructor"],
    }),

    // deleteInstructor: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/admin/instructors/${id}`,
    //     method: "DELETE",
    //     body: rest,
    //   }),
    //   invalidatesTags: ["Instructor"],
    // }),
    deleteInstructor: builder.mutation({
      query: (id) => ({
        url: `/admin/instructors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Instructor"],
    }),
  }),
});

export const {
  useGetAllInstructorsQuery,
  useGetInstructorByIdQuery,
  useCreateInstructorMutation,
  useUpdateInstructorMutation,
  useDeleteInstructorMutation,
} = instructorApi;
