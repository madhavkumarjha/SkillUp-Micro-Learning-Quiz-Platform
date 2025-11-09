import axiosInstance from "../../../utils/axiosInstance";

const courseAPI = {
    getAllCourses: async () => {
        const response = await axiosInstance.get("/courses");
        return response.data;
    }
};

export default courseAPI;