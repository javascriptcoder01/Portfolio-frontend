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
        UPDATE: (id, data) => axiosInstance.put(`/api/about/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/about/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/about/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/about'),
        GET_ACTIVE: () => axiosInstance.get('/api/about/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/about/${id}`),
    },
    // CONTACT
    CONTACT: {
        CREATE: (data) => axiosInstance.post('/api/contact/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/contact/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/contact/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/contact/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/contact'),
        GET_ACTIVE: () => axiosInstance.get('/api/contact/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/contact/${id}`),
    },

    // SKILLS
    SKILLS: {
        CREATE: (data) => axiosInstance.post('/api/skills/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/skills/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/skills/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/skills/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/skills'),
        GET_ACTIVE: () => axiosInstance.get('/api/skills/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/skills/${id}`),
        UPLOAD: (id, formData) => axiosInstance.put(`/api/skills/${id}/icon`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    },
    // EXPERIENCE
    EXPERIENCE: {
        CREATE: (data) => axiosInstance.post('/api/experience/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/experience/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/experience/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/experience/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/experience'),
        GET_ACTIVE: () => axiosInstance.get('/api/experience/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/experience/${id}`),
    }

};