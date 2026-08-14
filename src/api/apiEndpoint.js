import axiosInstance from "./axiosInstance";

export const API_ENDPOINTS = {
    // Login
    LOGIN: (data) => axiosInstance.post('/api/auth/login', data),
    LOGOUT: () => axiosInstance.post('/api/auth/logout'),
    REFRESH_TOKEN: (refreshToken) => axiosInstance.post('/api/auth/refresh', refreshToken),

};