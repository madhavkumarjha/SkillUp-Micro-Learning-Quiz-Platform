import axiosInstance from "./axiosInstance";

export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get("/course");
    if (!response) return null;
    const courses = response.data.courses;
    return courses;
  } catch (error) {
    throw new Error(error);
  }
};
