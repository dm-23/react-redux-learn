import * as axios from "axios";
const BASE_URL=`https://social-network.samuraijs.com/api/1.0/`;
const API_KEY='65dd1f2b-5347-4797-9ae3-ccd87f6fa1d7';

const axiosInstance=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{
        'API-KEY':API_KEY
    }
});

const baseApiController={
    users: {
        getUsers: (currentPage, usersOnPage) => axiosInstance.get(`users?page=${currentPage}&count=${usersOnPage}`).then(responce => responce.data),
        getProfile: (profileId) => axiosInstance.get(`profile/${profileId}`).then(responce => responce.data),
        getProfileStatus: (profileId) => axiosInstance.get(`profile/status/${profileId}`).then(responce => responce.data),
        setFollow: (userId) => axiosInstance.post(`follow/${userId}`).then(responce => responce.data),
        setUnfollow: (userId) => axiosInstance.delete(`follow/${userId}`).then(responce => responce.data),
        putStatus: (status)=>axiosInstance.put(`profile/status`,{status}).then(responce => responce.data),
        putProfile: (values)=>axiosInstance.put(`profile`,{...values}).then(responce => responce.data),
        putProfilePhoto:(file)=>{
            const formData=new FormData();
            formData.append("image",file);
            return axiosInstance.put(`profile/photo`,
                formData,{headers:{"Content-Type":"multipart/form-data"}}).then(responce => responce.data);
        }
    },
    auth:{
        getMe:()=> axiosInstance.get('auth/me').then(responce=>responce.data),
        login:(email,password,rememberMe,captcha)=>axiosInstance.post('auth/login',{email,password,rememberMe,captcha}).then(responce=>responce.data),
        logout:()=>axiosInstance.delete('auth/login').then(responce=>responce.data)
    }
}

export default baseApiController;

