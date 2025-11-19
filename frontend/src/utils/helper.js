import axiosInstance from "./axiosInstance";

export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get("/course");
    if (!response) return null;
    const courses = response.data.courses;
    return courses;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/student/all");
    if (!response) return null;
    const students = response.data.students;
    return students;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
