import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import {
    fetchEducationsRequest,
    fetchEducationsSuccess,
    fetchEducationsFailure,

    fetchActiveEducationRequest,
    fetchActiveEducationSuccess,
    fetchActiveEducationFailure,

    fetchEducationRequest,
    fetchEducationSuccess,
    fetchEducationFailure,

    createEducationRequest,
    createEducationSuccess,
    createEducationFailure,

    updateEducationRequest,
    updateEducationSuccess,
    updateEducationFailure,

    deleteEducationRequest,
    deleteEducationSuccess,
    deleteEducationFailure,

    statusEducationRequest,
    statusEducationSuccess,
    statusEducationFailure,
} from "../slices/educationSlice";

// GET ALL
function* fetchEducationsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.EDUCATION.GET_ALL);
        yield put(fetchEducationsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchEducationsFailure(error.response?.data?.message || "Failed to fetch educations"));
    }
}

// GET ACTIVE
function* fetchActiveEducationsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.EDUCATION.GET_ACTIVE);
        yield put(fetchActiveEducationSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveEducationFailure(error.response?.data?.message || "Failed to fetch active educations"));
    }
}

// GET ONE
function* fetchEducationWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.EDUCATION.GET_ONE, action.payload);
        yield put(fetchEducationSuccess(response.data.data));
    } catch (error) {
        yield put(fetchEducationFailure(error.response?.data?.message || "Failed to fetch education"));
    }
}

// CREATE
function* createEducationWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.EDUCATION.CREATE, action.payload);
        yield put(createEducationSuccess(response.data.data));
    } catch (error) {
        yield put(createEducationFailure(error.response?.data?.message || "Failed to create education"));
    }
}

// UPDATE
function* updateEducationWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.EDUCATION.UPDATE, id, data);
        yield put(updateEducationSuccess(response.data.data));
        yield put(fetchActiveEducationRequest());
    } catch (error) {
        yield put(updateEducationFailure(error.response?.data?.message || "Failed to update education"));
    }
}

// DELETE
function* deleteEducationWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.EDUCATION.DELETE, id);
        yield put(deleteEducationSuccess(id));
    } catch (error) {
        yield put(deleteEducationFailure(error.response?.data?.message || "Failed to delete education"));
    }
}

// STATUS TOGGLE
function* statusEducationWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.EDUCATION.STATUS, id, isActive);

        const updatedData = response.data.data?._id
            ? response.data.data
            : { _id: id, isActive };

        yield put(statusEducationSuccess(updatedData));

        // true ho ya false, dono cases me refetch — carousel live update ke liye
        yield put(fetchActiveEducationRequest());
    } catch (error) {
        yield put(statusEducationFailure(error.response?.data?.message || "Failed to update status"));
    }
}

// FIX: watcher me sahi worker map kiya hai (Project me jo bug tha wo yahan nahi hai)
export default function* educationSaga() {
    yield takeLatest(fetchEducationsRequest.type, fetchEducationsWorker);
    yield takeLatest(fetchActiveEducationRequest.type, fetchActiveEducationsWorker);
    yield takeLatest(fetchEducationRequest.type, fetchEducationWorker);
    yield takeLatest(createEducationRequest.type, createEducationWorker);
    yield takeLatest(updateEducationRequest.type, updateEducationWorker);
    yield takeLatest(deleteEducationRequest.type, deleteEducationWorker);
    yield takeLatest(statusEducationRequest.type, statusEducationWorker);
}