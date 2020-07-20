import axios from "axios";

const BASE_URL = `https://social-network.samuraijs.com/api/1.0/`;
const API_KEY = '65dd1f2b-5347-4797-9ae3-ccd87f6fa1d7';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'API-KEY': API_KEY
    }
});

