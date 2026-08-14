import axiosInstance from "./axiosInstance";

export const API_ENDPOINTS = {
    // Login
    LOGIN: (data) => axiosInstance.post('/auth/login', data),
    LOGOUT: () => axiosInstance.post('/auth/logout'),
    REFRESH_TOKEN: (refreshToken) => axiosInstance.post('/auth/refresh', refreshToken),

};