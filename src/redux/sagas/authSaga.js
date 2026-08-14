import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import { tokenStorage } from "../../utils/tokenStorage";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    logoutFailure, // FIX: import missing tha
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

export default function* authSaga() {
    yield takeLatest(loginRequest.type, loginWorker);
    yield takeLatest(logoutRequest.type, logoutWorker);
}