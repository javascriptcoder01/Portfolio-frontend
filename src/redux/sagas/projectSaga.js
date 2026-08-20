import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import { createProjectFailure, createProjectRequest, createProjectSuccess, deleteProjectFailure, deleteProjectRequest, deleteProjectSuccess, fetchActiveProjectFailure, fetchActiveProjectRequest, fetchActiveProjectSuccess, fetchProjectFailure, fetchProjectRequest, fetchProjectsFailure, fetchProjectsRequest, fetchProjectsSuccess, fetchProjectSuccess, statusProjectFailure, statusProjectRequest, statusProjectSuccess, updateProjectFailure, updateProjectRequest, updateProjectSuccess } from "../slices/projectSlice";

// GET ALL
function* fetchProjectsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.PROJECT.GET_ALL);
        yield put(fetchProjectsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchProjectsFailure(error.response?.data?.message || "Failed to fetch experiences"));
    }
}

// GET ACTIVE
function* fetchActiveProjectsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.PROJECT.GET_ACTIVE);
        yield put(fetchActiveProjectSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveProjectFailure(error.response?.data?.message || "Failed to fetch active experiences"));
    }
}

// GET ONE
function* fetchProjectWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.PROJECT.GET_ONE, action.payload);
        yield put(fetchProjectSuccess(response.data.data));
    } catch (error) {
        yield put(fetchProjectFailure(error.response?.data?.message || "Failed to fetch experience"));
    }
}

// CREATE
function* createProjectWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.PROJECT.CREATE, action.payload);
        yield put(createProjectSuccess(response.data.data));
    } catch (error) {
        yield put(createProjectFailure(error.response?.data?.message || "Failed to create experience"));
    }
}

// UPDATE
function* updateProjectWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.PROJECT.UPDATE, id, data);
        yield put(updateProjectSuccess(response.data.data));

        yield put(fetchActiveProjectRequest());

    } catch (error) {
        yield put(updateProjectFailure(error.response?.data?.message || "Failed to update experience"));
    }
}

// DELETE
function* deleteProjectWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.PROJECT.DELETE, id);
        yield put(deleteProjectSuccess(id));
    } catch (error) {
        yield put(deleteProjectFailure(error.response?.data?.message || "Failed to delete experience"));
    }
}

// STATUS TOGGLE
function* statusProjectWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.PROJECT.STATUS, id, isActive);

        yield put(statusProjectSuccess(response.data.data));

        // FIX: true / false any condition will show next / prev
        yield put(fetchActiveProjectRequest());

    } catch (error) {
        yield put(statusProjectFailure(error.response?.data?.message || "Failed to update status"));
    }
}

export default function* experienceSaga() {
    yield takeLatest(fetchProjectsRequest.type, fetchProjectsWorker);
    yield takeLatest(fetchActiveProjectRequest.type, fetchActiveProjectsWorker);
    yield takeLatest(fetchProjectRequest.type, fetchProjectWorker);
    yield takeLatest(createProjectRequest.type, createProjectWorker);
    yield takeLatest(updateProjectRequest.type, updateProjectWorker);
    yield takeLatest(deleteProjectRequest.type, deleteProjectWorker);
    yield takeLatest(statusProjectRequest.type, statusProjectWorker);
}