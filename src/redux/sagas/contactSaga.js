import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import {
    fetchContactsRequest,
    fetchContactsSuccess,
    fetchContactsFailure,

    fetchActiveContactRequest,
    fetchActiveContactSuccess,
    fetchActiveContactFailure,

    fetchContactRequest,
    fetchContactSuccess,
    fetchContactFailure,

    createContactRequest,
    createContactSuccess,
    createContactFailure,

    updateContactRequest,
    updateContactSuccess,
    updateContactFailure,

    deleteContactRequest,
    deleteContactSuccess,
    deleteContactFailure,

    statusContactRequest,
    statusContactSuccess,
    statusContactFailure,
} from "../slices/contactSlice";

// GET ALL
function* fetchContactsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.CONTACT.GET_ALL);
        yield put(fetchContactsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchContactsFailure(error.response?.data?.message || "Failed to fetch contact list"));
    }
}

// GET ACTIVE
function* fetchActiveContactWorker() {
    try {
        const response = yield call(API_ENDPOINTS.CONTACT.GET_ACTIVE);
        yield put(fetchActiveContactSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveContactFailure(error.response?.data?.message || "Failed to fetch active contact"));
    }
}

// GET ONE
function* fetchContactWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.CONTACT.GET_ONE, action.payload);
        yield put(fetchContactSuccess(response.data.data));
    } catch (error) {
        yield put(fetchContactFailure(error.response?.data?.message || "Failed to fetch contact"));
    }
}

// CREATE
function* createContactWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.CONTACT.CREATE, action.payload);
        yield put(createContactSuccess(response.data.data));

        if (response.data.data?.isActive) {
            yield put(fetchActiveContactRequest());
        }
    } catch (error) {
        yield put(createContactFailure(error.response?.data?.message || "Failed to create contact"));
    }
}

// UPDATE
function* updateContactWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.CONTACT.UPDATE, id, data);
        yield put(updateContactSuccess(response.data.data));

        if (response.data.data?.isActive) {
            yield put(fetchActiveContactRequest());
        }
    } catch (error) {
        yield put(updateContactFailure(error.response?.data?.message || "Failed to update contact"));
    }
}

// DELETE
function* deleteContactWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.CONTACT.DELETE, id);
        yield put(deleteContactSuccess(id));
    } catch (error) {
        yield put(deleteContactFailure(error.response?.data?.message || "Failed to delete contact"));
    }
}

// STATUS TOGGLE
function* statusContactWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.CONTACT.STATUS, id, isActive);
        yield put(statusContactSuccess(response.data.data));

        if (isActive === true) yield put(fetchActiveContactRequest());
    } catch (error) {
        yield put(statusContactFailure(error.response?.data?.message || "Failed to update status"));
    }
}

export default function* contactSaga() {
    yield takeLatest(fetchContactsRequest.type, fetchContactsWorker);
    yield takeLatest(fetchActiveContactRequest.type, fetchActiveContactWorker);
    yield takeLatest(fetchContactRequest.type, fetchContactWorker);
    yield takeLatest(createContactRequest.type, createContactWorker);
    yield takeLatest(updateContactRequest.type, updateContactWorker);
    yield takeLatest(deleteContactRequest.type, deleteContactWorker);
    yield takeLatest(statusContactRequest.type, statusContactWorker);
}