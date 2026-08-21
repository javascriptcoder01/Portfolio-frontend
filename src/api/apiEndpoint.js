import axiosInstance from "./axiosInstance";

export const API_ENDPOINTS = {
    // Login
    LOGIN: (data) => axiosInstance.post('/api/auth/login', data),
    LOGOUT: () => axiosInstance.post('/api/auth/logout'),
    REFRESH_TOKEN: (refreshToken) => axiosInstance.post('/api/auth/refresh', refreshToken),
    ADMIN: () => axiosInstance.get('/api/auth'),

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
    },
    // EXPERIENCE
    PROJECT: {
        CREATE: (data) => axiosInstance.post('/api/project/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/project/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/project/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/project/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/project'),
        GET_ACTIVE: () => axiosInstance.get('/api/project/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/project/${id}`),
        UPLOAD: (id, formData) => axiosInstance.put(`/api/project/${id}/project-image`, formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
    },
    // EDUCARION
    EDUCATION: {
        CREATE: (data) => axiosInstance.post('/api/education/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/education/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/education/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/education/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/education'),
        GET_ACTIVE: () => axiosInstance.get('/api/education/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/education/${id}`),
        UPLOAD: (id, formData) => axiosInstance.put(`/api/education/${id}/education-image`, formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
    },
    // SERVICE
    SERVICE: {
        CREATE: (data) => axiosInstance.post('/api/service/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/service/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/service/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/service/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/service'),
        GET_ACTIVE: () => axiosInstance.get('/api/service/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/service/${id}`),
        UPLOAD: (id, formData) => axiosInstance.put(`/api/service/${id}/service-image`, formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        ),
    },
    // TESTIMONIAL
    TESTIMONIAL: {
        CREATE: (data) => axiosInstance.post('/api/testimonial/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/testimonial/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/testimonial/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/testimonial/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/testimonial'),
        GET_ACTIVE: () => axiosInstance.get('/api/testimonial/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/testimonial/${id}`),
        UPLOAD: (id, formData) => axiosInstance.put(`/api/testimonial/${id}/testimonial-image`, formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        ),
    },
    // LANGUAGE
    LANGUAGE: {
        CREATE: (data) => axiosInstance.post('/api/language/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/language/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/language/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/language/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/language'),
        GET_ACTIVE: () => axiosInstance.get('/api/language/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/language/${id}`),
    },
    // 
    HOBBY: {
        CREATE: (data) => axiosInstance.post('/api/hobby/create', data),
        UPDATE: (id, data) => axiosInstance.put(`/api/hobby/update/${id}`, data),
        DELETE: (id) => axiosInstance.delete(`/api/hobby/delete/${id}`),
        STATUS: (id, isActive) => axiosInstance.patch(`/api/hobby/${id}/status`, { isActive }),
        GET_ALL: () => axiosInstance.get('/api/hobby'),
        GET_ACTIVE: () => axiosInstance.get('/api/hobby/active'),
        GET_ONE: (id) => axiosInstance.get(`/api/hobby/${id}`),
        UPLOAD: (id, formData) => axiosInstance.put(`/api/hobby/${id}/icon`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    },

};