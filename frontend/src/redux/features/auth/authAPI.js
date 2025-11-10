import axiosInstance from "../../../utils/axiosInstance";


const authAPI = {
    login : async (data)=>{
        const response = await axiosInstance.post("/auth/login",data);
        return response.data;
    },
    register : async (data)=>{
        const authRoute = data.role==="user" ? "/student/create":"/instructor/create" ;
        
        const response = await axiosInstance.post(authRoute,data);
        return response.data;
    },
};

export default authAPI;