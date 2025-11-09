import axiosInstance from "../../../utils/axiosInstance";

const quizAPI = {
    getAllQuizzes: async () => {
        const response = await axiosInstance.get("/quizzes");
        return response.data;
    }
};

export default quizAPI;