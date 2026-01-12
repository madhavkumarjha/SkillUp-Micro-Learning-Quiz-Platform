import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../redux/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://skillup-micro-learning-quiz-platform.onrender.com/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());
  }

  return result;
};
