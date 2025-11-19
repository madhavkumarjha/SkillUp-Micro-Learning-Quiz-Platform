import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => "/student/all",
      providesTags: ["Student"],
    }),

    getStudentById: builder.query({
      query: (id) => `/student/${id}`,
    }),

    createStudent: builder.mutation({
      query: (body) => ({
        url: "/student/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Student"],
    }),

    updateStudent: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/student/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Student"],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/admin/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),

    enrolledCourse: builder.mutation({
      query: ({ studentId, courseId }) => ({
        url: `/student/enroll/${studentId}/${courseId}`,
        method: "PATCH",
        // body: { studentId, courseId },
      }),
      invalidatesTags: ["Student"],
    }),

    studentCourses: builder.query({
      query: ({ studentId }) => ({
        url: `/student/courses/${studentId}`,
        method: "GET",
        // body: { studentId },
      }),
      invalidatesTags: ["Student"],
    }),

    studentQuizLeaderboard: builder.query({
      query: ({ studentId }) => ({
        url: `/student/leaderboard/${studentId}`,
        method: "GET",
        // body: { studentId },
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useEnrolledCourseMutation,
  useStudentCoursesQuery,
} = studentApi;
