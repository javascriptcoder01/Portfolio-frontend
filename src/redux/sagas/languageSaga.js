import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import {
    fetchLanguagesRequest,
    fetchLanguagesSuccess,
    fetchLanguagesFailure,

    fetchActiveLanguagesRequest,
    fetchActiveLanguagesSuccess,
    fetchActiveLanguagesFailure,

    fetchLanguageRequest,
    fetchLanguageSuccess,
    fetchLanguageFailure,

    createLanguageRequest,
    createLanguageSuccess,
    createLanguageFailure,

    updateLanguageRequest,
    updateLanguageSuccess,
    updateLanguageFailure,

    deleteLanguageRequest,
    deleteLanguageSuccess,
    deleteLanguageFailure,

    statusLanguageRequest,
    statusLanguageSuccess,
    statusLanguageFailure,
} from "../slices/languageSlice";

// GET ALL
function* fetchLanguagesWorker() {
    try {
        const response = yield call(API_ENDPOINTS.LANGUAGE.GET_ALL);
        yield put(fetchLanguagesSuccess(response.data.data));
    } catch (error) {
        yield put(fetchLanguagesFailure(error.response?.data?.message || "Failed to fetch languages"));
    }
}

// GET ACTIVE
function* fetchActiveLanguagesWorker() {
    try {
        const response = yield call(API_ENDPOINTS.LANGUAGE.GET_ACTIVE);
        yield put(fetchActiveLanguagesSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveLanguagesFailure(error.response?.data?.message || "Failed to fetch active languages"));
    }
}

// GET ONE
function* fetchLanguageWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.LANGUAGE.GET_ONE, action.payload);
        yield put(fetchLanguageSuccess(response.data.data));
    } catch (error) {
        yield put(fetchLanguageFailure(error.response?.data?.message || "Failed to fetch language"));
    }
}

// CREATE
function* createLanguageWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.LANGUAGE.CREATE, action.payload);
        yield put(createLanguageSuccess(response.data.data));
    } catch (error) {
        yield put(createLanguageFailure(error.response?.data?.message || "Failed to create language"));
    }
}

// UPDATE
function* updateLanguageWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.LANGUAGE.UPDATE, id, data);
        yield put(updateLanguageSuccess(response.data.data));
        yield put(fetchActiveLanguagesRequest());
    } catch (error) {
        yield put(updateLanguageFailure(error.response?.data?.message || "Failed to update language"));
    }
}

// DELETE
function* deleteLanguageWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.LANGUAGE.DELETE, id);
        yield put(deleteLanguageSuccess(id));
    } catch (error) {
        yield put(deleteLanguageFailure(error.response?.data?.message || "Failed to delete language"));
    }
}

// STATUS TOGGLE
function* statusLanguageWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.LANGUAGE.STATUS, id, isActive);

        const updatedData = response.data?.data?._id ? response.data.data : { _id: id, isActive };

        yield put(statusLanguageSuccess(updatedData));

        // true / false dono cases me refetch — carousel live update ke liye
        yield put(fetchActiveLanguagesRequest());
    } catch (error) {
        yield put(statusLanguageFailure(error.response?.data?.message || "Failed to update status"));
    }
}

export default function* languageSaga() {
    yield takeLatest(fetchLanguagesRequest.type, fetchLanguagesWorker);
    yield takeLatest(fetchActiveLanguagesRequest.type, fetchActiveLanguagesWorker);
    yield takeLatest(fetchLanguageRequest.type, fetchLanguageWorker);
    yield takeLatest(createLanguageRequest.type, createLanguageWorker);
    yield takeLatest(updateLanguageRequest.type, updateLanguageWorker);
    yield takeLatest(deleteLanguageRequest.type, deleteLanguageWorker);
    yield takeLatest(statusLanguageRequest.type, statusLanguageWorker);
}