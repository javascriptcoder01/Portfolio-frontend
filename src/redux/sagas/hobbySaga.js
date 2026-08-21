import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import {
    fetchHobbiesRequest,
    fetchHobbiesSuccess,
    fetchHobbiesFailure,

    fetchActiveHobbiesRequest,
    fetchActiveHobbiesSuccess,
    fetchActiveHobbiesFailure,

    fetchHobbyRequest,
    fetchHobbySuccess,
    fetchHobbyFailure,

    createHobbyRequest,
    createHobbySuccess,
    createHobbyFailure,

    updateHobbyRequest,
    updateHobbySuccess,
    updateHobbyFailure,

    deleteHobbyRequest,
    deleteHobbySuccess,
    deleteHobbyFailure,

    statusHobbyRequest,
    statusHobbySuccess,
    statusHobbyFailure,
} from "../slices/hobbySlice";

// GET ALL
function* fetchHobbiesWorker() {
    try {
        const response = yield call(API_ENDPOINTS.HOBBY.GET_ALL);
        yield put(fetchHobbiesSuccess(response.data.data));
    } catch (error) {
        yield put(fetchHobbiesFailure(error.response?.data?.message || "Failed to fetch hobbies"));
    }
}

// GET ACTIVE
function* fetchActiveHobbiesWorker() {
    try {
        const response = yield call(API_ENDPOINTS.HOBBY.GET_ACTIVE);
        yield put(fetchActiveHobbiesSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveHobbiesFailure(error.response?.data?.message || "Failed to fetch active hobbies"));
    }
}

// GET ONE
function* fetchHobbyWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.HOBBY.GET_ONE, action.payload);
        yield put(fetchHobbySuccess(response.data.data));
    } catch (error) {
        yield put(fetchHobbyFailure(error.response?.data?.message || "Failed to fetch hobby"));
    }
}

// CREATE
function* createHobbyWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.HOBBY.CREATE, action.payload);
        yield put(createHobbySuccess(response.data.data));
    } catch (error) {
        yield put(createHobbyFailure(error.response?.data?.message || "Failed to create hobby"));
    }
}

// UPDATE
function* updateHobbyWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.HOBBY.UPDATE, id, data);
        yield put(updateHobbySuccess(response.data.data));
        yield put(fetchActiveHobbiesRequest());
    } catch (error) {
        yield put(updateHobbyFailure(error.response?.data?.message || "Failed to update hobby"));
    }
}

// DELETE
function* deleteHobbyWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.HOBBY.DELETE, id);
        yield put(deleteHobbySuccess(id));
    } catch (error) {
        yield put(deleteHobbyFailure(error.response?.data?.message || "Failed to delete hobby"));
    }
}

// STATUS TOGGLE
function* statusHobbyWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.HOBBY.STATUS, id, isActive);

        const updatedData = response.data?.data?._id ? response.data.data : { _id: id, isActive };

        yield put(statusHobbySuccess(updatedData));

        // true / false dono cases me refetch — carousel live update ke liye
        yield put(fetchActiveHobbiesRequest());
    } catch (error) {
        yield put(statusHobbyFailure(error.response?.data?.message || "Failed to update status"));
    }
}

export default function* hobbySaga() {
    yield takeLatest(fetchHobbiesRequest.type, fetchHobbiesWorker);
    yield takeLatest(fetchActiveHobbiesRequest.type, fetchActiveHobbiesWorker);
    yield takeLatest(fetchHobbyRequest.type, fetchHobbyWorker);
    yield takeLatest(createHobbyRequest.type, createHobbyWorker);
    yield takeLatest(updateHobbyRequest.type, updateHobbyWorker);
    yield takeLatest(deleteHobbyRequest.type, deleteHobbyWorker);
    yield takeLatest(statusHobbyRequest.type, statusHobbyWorker);
}