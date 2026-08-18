import axiosInstance from "./axiosInstance";

export const API_ENDPOINTS = {
    // Login
    LOGIN: (data) => axiosInstance.post('/api/auth/login', data),
    LOGOUT: () => axiosInstance.post('/api/auth/logout'),
    REFRESH_TOKEN: (refreshToken) => axiosInstance.post('/api/auth/refresh', refreshToken),

    // Introduction
    INTRODUCTION: {
        CREATE: (data) => axiosInstance.post('/api/introduction/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/introduction/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/introduction/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/introduction/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/introduction'),
        GET_ACTIVE: () => axiosInstance.get('/api/introduction/active'),
        GET_ONE: (id) => axiosInstance.get('/api/introduction/active'),
    },

    // About
    ABOUT: {
        CREATE: (data) => axiosInstance.post('/api/about/create', data),
        UPDATE: (id, data) => axiosInstance.patch(`/api/about/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/about/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/about/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/about'),
        GET_ACTIVE: () => axiosInstance.get('/api/about/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/about/${id}`),
    },
    // EXPERIENCE - pending
    TESTIMONIAL: {
        CREATE: (data) => axiosInstance.post('/api/about/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/about/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/about/delete/${id}`),
        STATUS: (id, status) => axiosInstance.patch(`/api/about/${id}/status`, status),
        GET_ALL: () => axiosInstance.get('/api/about'),
        GET_ACTIVE: () => axiosInstance.get('/api/about/active'),
        GET_ONE: (id) => axiosInstance.get('/api/about/active'),
    }

};