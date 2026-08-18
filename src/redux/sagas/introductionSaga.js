import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import { createIntroductionFailure, createIntroductionRequest, createIntroductionSuccess, deleteIntroductionFailure, deleteIntroductionRequest, deleteIntroductionSuccess, fetchActiveIntroductionFailure, fetchActiveIntroductionRequest, fetchActiveIntroductionSuccess, fetchIntroductionFailure, fetchIntroductionRequest, fetchIntroductionsFailure, fetchIntroductionsRequest, fetchIntroductionsSuccess, fetchIntroductionSuccess, statusIntroductionFailure, statusIntroductionRequest, statusIntroductionSuccess, updateIntroductionFailure, updateIntroductionRequest, updateIntroductionSuccess } from "../slices/introductionSlice";


// GET ALL
function* fetchIntroductionsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.INTRODUCTION.GET_ALL);
        yield put(fetchIntroductionsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchIntroductionsFailure(error.response?.data?.message || 'Failed to fetch introductions'));
    }
}

// GET ACTIVE
function* fetchActiveIntroductionWorker() {
    try {
        const response = yield call(API_ENDPOINTS.INTRODUCTION.GET_ACTIVE);
        // console.log("Incoming Data from Introduction Saga: ", response.data.data);
        yield put(fetchActiveIntroductionSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveIntroductionFailure(error.response?.data?.message || 'Failed to fetch active introduction'));
    }
}

// GET ONE
function* fetchIntroductionWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.INTRODUCTION.GET_ONE, action.payload);
        yield put(fetchIntroductionSuccess(response.data.data));
    } catch (error) {
        yield put(fetchIntroductionFailure(error.response?.data?.message || 'Failed to fetch introduction'));
    }
}

// CREATE
function* createIntroductionWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.INTRODUCTION.CREATE, action.payload);
        yield put(createIntroductionSuccess(response.data.data));
    } catch (error) {
        yield put(createIntroductionFailure(error.response?.data?.message || 'Failed to create introduction'));
    }
}

// UPDATE
function* updateIntroductionWorker(action) {
    try {
        const { id, data } = action.payload; // Find id, data from action Data
        const response = yield call(API_ENDPOINTS.INTRODUCTION.UPDATE, id, data);
        yield put(updateIntroductionSuccess(response.data.data));
    } catch (error) {
        yield put(updateIntroductionFailure(error.response?.data?.message || 'Failed to update introduction'));
    }
}

// DELETE
function* deleteIntroductionWorker(action) {
    try {
        const id = action.payload;  // Find Id from action data
        yield call(API_ENDPOINTS.INTRODUCTION.DELETE, id);
        yield put(deleteIntroductionSuccess(id));
    } catch (error) {
        yield put(deleteIntroductionFailure(error.response?.data?.message || 'Failed to delete introduction'));
    }
}

// STATUS TOGGLE
function* statusIntroductionWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.INTRODUCTION.STATUS, id, isActive);
        yield put(statusIntroductionSuccess(response.data.data));

        // FIX: status change hote hi active introduction dobara fetch karo
        // taaki upar ka form turant naye active data se update ho jaye
        if (isActive === true) yield put(fetchActiveIntroductionRequest());
    } catch (error) {
        yield put(statusIntroductionFailure(error.response?.data?.message || 'Failed to update status'));
    }
}

export default function* introductionSaga() {
    yield takeLatest(fetchIntroductionsRequest.type, fetchIntroductionsWorker);
    yield takeLatest(fetchActiveIntroductionRequest.type, fetchActiveIntroductionWorker);
    yield takeLatest(fetchIntroductionRequest.type, fetchIntroductionWorker);
    yield takeLatest(createIntroductionRequest.type, createIntroductionWorker);
    yield takeLatest(updateIntroductionRequest.type, updateIntroductionWorker);
    yield takeLatest(deleteIntroductionRequest.type, deleteIntroductionWorker);
    yield takeLatest(statusIntroductionRequest.type, statusIntroductionWorker);

}