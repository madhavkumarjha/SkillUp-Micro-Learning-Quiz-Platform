import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { courseApi } from "./features/api/course/courseApi";
import { publicApi } from "./features/api/publicApi";
import { instructorApi } from "./features/api/instructor/instructorApi";
import { studentApi } from "./features/api/student/studentApi";
import { helperApi } from "./features/api/helperApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [instructorApi.reducerPath]: instructorApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [helperApi.reducerPath]: helperApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      courseApi.middleware,
      publicApi.middleware,
      instructorApi.middleware,
      studentApi.middleware,
      helperApi.middleware
    ),
});
export default store;
