import axios from "axios";

const BASE_URL = `https://social-network.samuraijs.com/api/1.0/`;
const API_KEY = '65dd1f2b-5347-4797-9ae3-ccd87f6fa1d7';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'API-KEY': API_KEY
    }
});

const baseApiController = {
    users: {
        getUsers: (currentPage: number, usersOnPage: number) => axiosInstance.get(`users?page=${currentPage}&count=${usersOnPage}`).then(responce => responce.data),
        getProfile: (profileId: number) => axiosInstance.get(`profile/${profileId}`).then(responce => responce.data),
        getProfileStatus: (profileId: number) => axiosInstance.get(`profile/status/${profileId}`).then(responce => responce.data),
        setFollow: (userId: number) => axiosInstance.post(`follow/${userId}`).then(responce => responce.data),
        setUnfollow: (userId: number) => axiosInstance.delete(`follow/${userId}`).then(responce => responce.data),
        putStatus: (status: string) => axiosInstance.put(`profile/status`, {status}).then(responce => responce.data),
        putProfile: (values: any) => axiosInstance.put(`profile`, {...values}).then(responce => responce.data),
        putProfilePhoto: (file: any) => {
            const formData = new FormData();
            formData.append("image", file);
            return axiosInstance.put(`profile/photo`,
                formData, {headers: {"Content-Type": "multipart/form-data"}}).then(responce => responce.data);
        }
    },
    security: {
        getCaptcha: () => axiosInstance.get<CaptchaResponseType>('security/get-captcha-url').then(responce => responce.data),
    },
    auth: {
        getMe: () => axiosInstance.get<MeResponseType>('auth/me').then(responce => responce.data),
        login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => axiosInstance.post<LoginResponseType>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(responce => responce.data),
        logout: () => axiosInstance.delete<LogoutResponseType>('auth/login').then(responce => responce.data)
    }
}

type LogoutResponseType={
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: object
}

type LoginResponseType={
    resultCode: ResultCodeEnum | ResultCodeWithCapchaEnum
    messages: Array<string>,
    data: {
        userId: number
    }
}

type CaptchaResponseType={
    url:string
}

type MeResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}

enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

enum ResultCodeWithCapchaEnum {
    CaptchaIsNeeded = 10
}

export default baseApiController;

