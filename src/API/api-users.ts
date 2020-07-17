import {axiosInstance} from "./api";
import {UserType, ResponseArrayApiType} from "../types/types";


const apiUsers={
    getUsers: (currentPage: number, usersOnPage: number) => axiosInstance.get<ResponseArrayApiType<UserType>>(`users?page=${currentPage}&count=${usersOnPage}`).then(responce => responce.data),
    setFollow: (userId: number) => axiosInstance.post(`follow/${userId}`).then(responce => responce.data),
    setUnfollow: (userId: number) => axiosInstance.delete(`follow/${userId}`).then(responce => responce.data)
}

export default apiUsers
