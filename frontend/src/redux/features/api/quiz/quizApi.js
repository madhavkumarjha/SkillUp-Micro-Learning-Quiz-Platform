import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: () => "/quiz/all",
      providesTags: ["Quiz"],
    }),

    getInstructorQuizzes: builder.query({
      query: (instructorId) => `/instructor/${instructorId}/quizzes`,
      providesTags: ["Quiz"],
    }),

    getQuizById: builder.query({
      query: (id) => `/quiz/get/${id}`,
    }),

    createQuiz: builder.mutation({
      query: (body) => ({
        url: "/quiz/upload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Quiz"],
    }),

    updateQuiz: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/quiz/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Quiz"],
    }),

    deleteQuiz: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/quiz/${id}`,
        method: "DELETE",
        body: rest,
      }),
      invalidatesTags: ["Quiz"],
    }),

    updateStatusQuiz: builder.mutation({
      query: ({ id, status }) => ({
        url: `/quiz/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useGetInstructorQuizzesQuery,
  useUpdateStatusQuizMutation,
} = quizApi;
