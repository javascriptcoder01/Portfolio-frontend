import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import {
    fetchExperiencesRequest,
    fetchExperiencesSuccess,
    fetchExperiencesFailure,

    fetchActiveExperiencesRequest,
    fetchActiveExperiencesSuccess,
    fetchActiveExperiencesFailure,

    fetchExperienceRequest,
    fetchExperienceSuccess,
    fetchExperienceFailure,

    createExperienceRequest,
    createExperienceSuccess,
    createExperienceFailure,

    updateExperienceRequest,
    updateExperienceSuccess,
    updateExperienceFailure,

    deleteExperienceRequest,
    deleteExperienceSuccess,
    deleteExperienceFailure,

    statusExperienceRequest,
    statusExperienceSuccess,
    statusExperienceFailure,
} from "../slices/experienceSlice";

// GET ALL
function* fetchExperiencesWorker() {
    try {
        const response = yield call(API_ENDPOINTS.EXPERIENCE.GET_ALL);
        yield put(fetchExperiencesSuccess(response.data.data));
    } catch (error) {
        yield put(fetchExperiencesFailure(error.response?.data?.message || "Failed to fetch experiences"));
    }
}

// GET ACTIVE
function* fetchActiveExperiencesWorker() {
    try {
        const response = yield call(API_ENDPOINTS.EXPERIENCE.GET_ACTIVE);
        yield put(fetchActiveExperiencesSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveExperiencesFailure(error.response?.data?.message || "Failed to fetch active experiences"));
    }
}

// GET ONE
function* fetchExperienceWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.EXPERIENCE.GET_ONE, action.payload);
        yield put(fetchExperienceSuccess(response.data.data));
    } catch (error) {
        yield put(fetchExperienceFailure(error.response?.data?.message || "Failed to fetch experience"));
    }
}

// CREATE
function* createExperienceWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.EXPERIENCE.CREATE, action.payload);
        yield put(createExperienceSuccess(response.data.data));
    } catch (error) {
        yield put(createExperienceFailure(error.response?.data?.message || "Failed to create experience"));
    }
}

// UPDATE
function* updateExperienceWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.EXPERIENCE.UPDATE, id, data);
        yield put(updateExperienceSuccess(response.data.data));

        yield put(fetchActiveExperiencesRequest());

    } catch (error) {
        yield put(updateExperienceFailure(error.response?.data?.message || "Failed to update experience"));
    }
}

// DELETE
function* deleteExperienceWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.EXPERIENCE.DELETE, id);
        yield put(deleteExperienceSuccess(id));
    } catch (error) {
        yield put(deleteExperienceFailure(error.response?.data?.message || "Failed to delete experience"));
    }
}

// STATUS TOGGLE
function* statusExperienceWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.EXPERIENCE.STATUS, id, isActive);

        yield put(statusExperienceSuccess(response.data.data));

        // FIX: true / false any condition will show next / prev
        yield put(fetchActiveExperiencesRequest());

    } catch (error) {
        yield put(statusExperienceFailure(error.response?.data?.message || "Failed to update status"));
    }
}

export default function* experienceSaga() {
    yield takeLatest(fetchExperiencesRequest.type, fetchExperiencesWorker);
    yield takeLatest(fetchActiveExperiencesRequest.type, fetchActiveExperiencesWorker);
    yield takeLatest(fetchExperienceRequest.type, fetchExperienceWorker);
    yield takeLatest(createExperienceRequest.type, createExperienceWorker);
    yield takeLatest(updateExperienceRequest.type, updateExperienceWorker);
    yield takeLatest(deleteExperienceRequest.type, deleteExperienceWorker);
    yield takeLatest(statusExperienceRequest.type, statusExperienceWorker);
}