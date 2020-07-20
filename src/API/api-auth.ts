import {axiosInstance} from "./api";
import {ResponseApiType, ResultCodeEnum, ResultCodeWithCapchaEnum} from "../types/types";

type ResponseMeType={
    id:number
    email:string
    login: string
}

type LoginResponseDataType={
    userId:number
}

type CaptchaType={
    url:string
}

const apiAuth={
    getMe: () => axiosInstance.get<ResponseApiType<ResponseMeType>>('auth/me').then(responce => responce.data),
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => axiosInstance.post<ResponseApiType<LoginResponseDataType,ResultCodeEnum | ResultCodeWithCapchaEnum>>('auth/login', {
        email,
        password,
        rememberMe,
        captcha
    }).then(responce => responce.data),
    logout: () => axiosInstance.delete<ResponseApiType>('auth/login').then(responce => responce.data),
    getCaptcha: () => axiosInstance.get<CaptchaType>('security/get-captcha-url').then(responce => responce.data)
}

export default apiAuth