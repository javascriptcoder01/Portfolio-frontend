import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import {
    fetchAboutsRequest,
    fetchAboutsSuccess,
    fetchAboutsFailure,

    fetchActiveAboutRequest,
    fetchActiveAboutSuccess,
    fetchActiveAboutFailure,

    fetchAboutRequest,
    fetchAboutSuccess,
    fetchAboutFailure,

    createAboutRequest,
    createAboutSuccess,
    createAboutFailure,

    updateAboutRequest,
    updateAboutSuccess,
    updateAboutFailure,

    deleteAboutRequest,
    deleteAboutSuccess,
    deleteAboutFailure,

    statusAboutRequest,
    statusAboutSuccess,
    statusAboutFailure,
} from "../slices/aboutSlice";

// GET ALL
function* fetchAboutsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.ABOUT.GET_ALL);
        yield put(fetchAboutsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchAboutsFailure(error.response?.data?.message || "Failed to fetch about list"));
    }
}

// GET ACTIVE
function* fetchActiveAboutWorker() {
    try {
        const response = yield call(API_ENDPOINTS.ABOUT.GET_ACTIVE);
        // console.log('Active About Data from Saga: ', response.data.data);
        yield put(fetchActiveAboutSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveAboutFailure(error.response?.data?.message || "Failed to fetch active about"));
    }
}

// GET ONE
function* fetchAboutWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.ABOUT.GET_ONE, action.payload);
        yield put(fetchAboutSuccess(response.data.data));
    } catch (error) {
        yield put(fetchAboutFailure(error.response?.data?.message || "Failed to fetch about"));
    }
}

// CREATE
function* createAboutWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.ABOUT.CREATE, action.payload);
        yield put(createAboutSuccess(response.data.data));

        // FIX: naya record create hua aur wo active hai to form turant refresh karo
        if (response.data.data?.isActive) {
            yield put(fetchActiveAboutRequest());
        }
    } catch (error) {
        yield put(createAboutFailure(error.response?.data?.message || "Failed to create about"));
    }
}

// UPDATE
function* updateAboutWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.ABOUT.UPDATE, id, data);
        yield put(updateAboutSuccess(response.data.data));

        if (response.data.data?.isActive) {
            yield put(fetchActiveAboutRequest());
        }
    } catch (error) {
        yield put(updateAboutFailure(error.response?.data?.message || "Failed to update about"));
    }
}

// DELETE
function* deleteAboutWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.ABOUT.DELETE, id);
        yield put(deleteAboutSuccess(id));
    } catch (error) {
        yield put(deleteAboutFailure(error.response?.data?.message || "Failed to delete about"));
    }
}

// STATUS TOGGLE
function* statusAboutWorker(action) {
    try {
        const { id, isActive } = action.payload;

        const response = yield call(API_ENDPOINTS.ABOUT.STATUS, id, isActive);

        yield put(statusAboutSuccess(response.data.data));

        // FIX: status "true" hua to upar wala form bhi turant refresh ho jaye
        if (isActive === true) yield put(fetchActiveAboutRequest());

    } catch (error) {
        yield put(statusAboutFailure(error.response?.data?.message || "Failed to update status"));
    }
}

export default function* aboutSaga() {
    yield takeLatest(fetchAboutsRequest.type, fetchAboutsWorker);
    yield takeLatest(fetchActiveAboutRequest.type, fetchActiveAboutWorker);
    yield takeLatest(fetchAboutRequest.type, fetchAboutWorker);
    yield takeLatest(createAboutRequest.type, createAboutWorker);
    yield takeLatest(updateAboutRequest.type, updateAboutWorker);
    yield takeLatest(deleteAboutRequest.type, deleteAboutWorker);
    yield takeLatest(statusAboutRequest.type, statusAboutWorker);
}