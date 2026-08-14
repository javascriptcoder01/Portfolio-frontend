import axios from "axios";
import { tokenStorage } from "../utils/tokenStorage";

export const BACKEND_URL = import.meta.env.VITE_URL; // FIX: .env add kiya

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = tokenStorage.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((req) => {
        if (error) req.reject(error);
        else req.resolve(token);
    });
    failedQueue = [];
};

const EXCLUDED_URLS = ["/api/auth/login", "/api/auth/refresh", "/api/auth/logout", "/api/auth/register"];

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isExcluded = EXCLUDED_URLS.some((url) => originalRequest.url?.includes(url));

        // FIX: poora refresh logic ab if ke andar hai
        if (error.response?.status === 401 && !originalRequest._retry && !isExcluded) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = tokenStorage.getRefreshToken();

            if (!refreshToken) {
                tokenStorage.clearTokens();
                isRefreshing = false;
                return Promise.reject(error);
            }

            try {
                // FIX: axiosInstance use karo, aur direct path do (function nahi)
                const { data } = await axiosInstance.post("/api/auth/refresh", { refreshToken });

                const newAccessToken = data.accessToken;
                tokenStorage.setTokens(newAccessToken, data.refreshToken || refreshToken);

                axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                tokenStorage.clearTokens(); // FIX: typo fix
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // FIX: 401 na ho ya excluded ho, to seedha error return karo
        return Promise.reject(error);
    }
);

export default axiosInstance;