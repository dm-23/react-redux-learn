import {axiosInstance} from "./api";
import {PhotoType, ProfileType, ResponseApiType} from "../types/types";


const apiProfile={

    getProfile: (profileId: number) => axiosInstance.get<ProfileType>(`profile/${profileId}`).then(responce => responce.data),
    getProfileStatus: (profileId: number) => axiosInstance.get<string>(`profile/status/${profileId}`).then(responce => responce.data),
    putStatus: (status: string) => axiosInstance.put<ResponseApiType>(`profile/status`, {status}).then(responce => responce.data),
    putProfile: (values: any) => axiosInstance.put<ResponseApiType>(`profile`, {...values}).then(responce => responce.data),
    putProfilePhoto: (file: any) => {
        const formData = new FormData();
        formData.append("image", file);
        return axiosInstance.put<ResponseApiType<PhotoType>>(`profile/photo`,
            formData, {headers: {"Content-Type": "multipart/form-data"}}).then(responce => responce.data);
    }
}

export default apiProfile