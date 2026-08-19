import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import {
    fetchSkillsRequest,
    fetchSkillsSuccess,
    fetchSkillsFailure,

    fetchActiveSkillsRequest,
    fetchActiveSkillsSuccess,
    fetchActiveSkillsFailure,

    fetchSkillRequest,
    fetchSkillSuccess,
    fetchSkillFailure,

    createSkillRequest,
    createSkillSuccess,
    createSkillFailure,

    updateSkillRequest,
    updateSkillSuccess,
    updateSkillFailure,

    deleteSkillRequest,
    deleteSkillSuccess,
    deleteSkillFailure,

    statusSkillRequest,
    statusSkillSuccess,
    statusSkillFailure,

    uploadSkillIconRequest,
    uploadSkillIconSuccess,
    uploadSkillIconFailure,
} from "../slices/skillSlice";

// GET ALL
function* fetchSkillsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.SKILLS.GET_ALL);
        yield put(fetchSkillsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchSkillsFailure(error.response?.data?.message || "Failed to fetch skills"));
    }
}

// GET ACTIVE
function* fetchActiveSkillsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.SKILLS.GET_ACTIVE);
        yield put(fetchActiveSkillsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveSkillsFailure(error.response?.data?.message || "Failed to fetch active skills"));
    }
}

// GET ONE
function* fetchSkillWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.SKILLS.GET_ONE, action.payload);
        yield put(fetchSkillSuccess(response.data.data));
    } catch (error) {
        yield put(fetchSkillFailure(error.response?.data?.message || "Failed to fetch skill"));
    }
}

// CREATE
function* createSkillWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.SKILLS.CREATE, action.payload);
        yield put(createSkillSuccess(response.data.data));
    } catch (error) {
        yield put(createSkillFailure(error.response?.data?.message || "Failed to create skill"));
    }
}

// UPDATE
function* updateSkillWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.SKILLS.UPDATE, id, data);
        yield put(updateSkillSuccess(response.data.data));
    } catch (error) {
        yield put(updateSkillFailure(error.response?.data?.message || "Failed to update skill"));
    }
}

// DELETE
function* deleteSkillWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.SKILLS.DELETE, id);
        yield put(deleteSkillSuccess(id));
    } catch (error) {
        yield put(deleteSkillFailure(error.response?.data?.message || "Failed to delete skill"));
    }
}

// STATUS TOGGLE
function* statusSkillWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.SKILLS.STATUS, id, isActive);

        // FIX: agar backend poora object na de, khud construct karo
        const updatedData = response.data.data?._id
            ? response.data.data
            : { _id: id, isActive };

        yield put(statusSkillSuccess(updatedData));
    } catch (error) {
        yield put(statusSkillFailure(error.response?.data?.message || "Failed to update status"));
    }
}

// ICON UPLOAD
function* uploadSkillIconWorker(action) {
    try {
        const { id, formData } = action.payload;
        const response = yield call(API_ENDPOINTS.SKILLS.UPLOAD, id, formData);
        yield put(uploadSkillIconSuccess(response.data.data));
    } catch (error) {
        yield put(uploadSkillIconFailure(error.response?.data?.message || "Failed to upload icon"));
    }
}

export default function* skillSaga() {
    yield takeLatest(fetchSkillsRequest.type, fetchSkillsWorker);
    yield takeLatest(fetchActiveSkillsRequest.type, fetchActiveSkillsWorker);
    yield takeLatest(fetchSkillRequest.type, fetchSkillWorker);
    yield takeLatest(createSkillRequest.type, createSkillWorker);
    yield takeLatest(updateSkillRequest.type, updateSkillWorker);
    yield takeLatest(deleteSkillRequest.type, deleteSkillWorker);
    yield takeLatest(statusSkillRequest.type, statusSkillWorker);
    yield takeLatest(uploadSkillIconRequest.type, uploadSkillIconWorker);
}