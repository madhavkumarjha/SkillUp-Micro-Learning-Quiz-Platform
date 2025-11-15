import axiosInstance from "../../../utils/axiosInstance";


const authAPI = {
    login : async (data)=>{
        const response = await axiosInstance.post("/auth/login",data);
        return response.data;
    },
    register : async (data)=>{
        const response = await axiosInstance.post("/student/create",data);
        return response.data;
    },
};

export default authAPI;