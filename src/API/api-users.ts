import {axiosInstance} from "./api";
import {UserType, ResponseArrayApiType, ResponseApiType} from "../types/types";


const apiUsers={
    getUsers: (currentPage: number, usersOnPage: number) => axiosInstance.get<ResponseArrayApiType<UserType>>(`users?page=${currentPage}&count=${usersOnPage}`).then(responce => responce.data),
    setFollow: (userId: number) => axiosInstance.post<ResponseApiType>(`follow/${userId}`).then(responce => responce.data),
    setUnfollow: (userId: number) => axiosInstance.delete<ResponseApiType>(`follow/${userId}`).then(responce => responce.data)
}

export default apiUsers
