import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import { tokenStorage } from "../../utils/tokenStorage";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    fetchAdminSuccess,
    fetchAdminFailure,
    fetchAdminRequest, // FIX: import missing tha
} from "../slices/authSlice";

// Login Worker saga
function* loginWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.LOGIN, action.payload);
        const { data, accessToken, refreshToken } = response.data;

        tokenStorage.setTokens(accessToken, refreshToken);
        yield put(loginSuccess(data));
    } catch (error) {
        const message = error.response?.data?.message || "Login failed. Try again.";
        yield put(loginFailure(message));
    }
}

// Logout Worker saga
function* logoutWorker() {
    try {
        yield call(API_ENDPOINTS.LOGOUT);
        yield put(logoutSuccess());
    } catch (error) {
        yield put(logoutFailure()); // FIX: loginFailure() nahi, logoutFailure()
    } finally {
        tokenStorage.clearTokens(); // FIX: typo fix kiya
    }
}

// GET - ADMIN / USER
function* fetchAdminWorker() {
    try {
        const response = yield call(API_ENDPOINTS.ADMIN);

        const adminData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;

        // console.log('Data coming from Auth Saga File: ', adminData);

        yield put(fetchAdminSuccess(adminData));

    } catch (error) {
        yield put(fetchAdminFailure(error.response?.data?.message || 'Failed to fetch admin'));
    }
}

export default function* authSaga() {
    yield takeLatest(loginRequest.type, loginWorker);
    yield takeLatest(logoutRequest.type, logoutWorker);
    yield takeLatest(fetchAdminRequest.type, fetchAdminWorker);
}