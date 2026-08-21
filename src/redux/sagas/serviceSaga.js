import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import {
    createServiceFailure,
    createServiceRequest,
    createServiceSuccess,

    deleteServiceFailure,
    deleteServiceRequest,
    deleteServiceSuccess,

    fetchActiveServicesFailure,
    fetchActiveServicesRequest,
    fetchActiveServicesSuccess,

    fetchServiceFailure,
    fetchServiceRequest,
    fetchServiceSuccess,

    fetchServicesFailure,
    fetchServicesRequest,
    fetchServicesSuccess,

    statusServiceFailure,
    statusServiceRequest,
    statusServiceSuccess,

    updateServiceFailure,
    updateServiceRequest,
    updateServiceSuccess,

    uploadServiceFailure,
    uploadServiceRequest,
    uploadServiceSuccess,
} from "../slices/serviceSlice";

// CREATE
function* createServiceWorker(action) {
    try {
        // FIX: "data" (poora action object) ki jagah "action.payload" bhejna hai
        const response = yield call(API_ENDPOINTS.SERVICE.CREATE, action.payload);
        yield put(createServiceSuccess(response.data.data));

        yield put(fetchServicesRequest());
    } catch (error) {
        yield put(createServiceFailure(error.response?.data?.message || "Failed to create service"));
    }
}

// GET ALL
function* fetchServicesWorker() {
    try {
        const response = yield call(API_ENDPOINTS.SERVICE.GET_ALL);
        yield put(fetchServicesSuccess(response.data.data));
    } catch (error) {
        yield put(fetchServicesFailure(error.response?.data?.message || "Failed to fetch services"));
    }
}

// GET ACTIVE
function* fetchActiveServiceWorker() {
    try {
        const response = yield call(API_ENDPOINTS.SERVICE.GET_ACTIVE);
        yield put(fetchActiveServicesSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveServicesFailure(error.response?.data?.message || "Failed to fetch active service"));
    }
}

// GET ONE
function* fetchServiceWorker(action) {
    try {
        // FIX: "action" parameter add kiya, id bhi bhej rahe hain
        const response = yield call(API_ENDPOINTS.SERVICE.GET_ONE, action.payload);
        yield put(fetchServiceSuccess(response.data.data));
    } catch (error) {
        yield put(fetchServiceFailure(error.response?.data?.message || "Failed to fetch single service"));
    }
}

// UPDATE
function* updateServiceWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.SERVICE.UPDATE, id, data);
        yield put(updateServiceSuccess(response.data.data));

        yield put(fetchActiveServicesRequest());
    } catch (error) {
        yield put(updateServiceFailure(error.response?.data?.message || "Failed to update service"));
    }
}

// DELETE
function* deleteServiceWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.SERVICE.DELETE, id);
        yield put(deleteServiceSuccess(id));

        yield put(fetchServicesRequest());
    } catch (error) {
        yield put(deleteServiceFailure(error.response?.data?.message || "Failed to delete service"));
    }
}

// STATUS TOGGLE
function* statusServiceWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.SERVICE.STATUS, id, isActive);

        const updatedData = response.data?.data?._id ? response.data.data : { _id: id, isActive };

        yield put(statusServiceSuccess(updatedData));

        // true / false dono cases me active list refetch karo — carousel live update
        yield put(fetchActiveServicesRequest());
    } catch (error) {
        yield put(statusServiceFailure(error.response?.data?.message || "Failed to update status"));
    }
}

// ICON/IMAGE UPLOAD
function* uploadServiceWorker(action) {
    try {
        const { id, formData } = action.payload;
        const response = yield call(API_ENDPOINTS.SERVICE.UPLOAD, id, formData);
        yield put(uploadServiceSuccess(response.data.data));
    } catch (error) {
        yield put(uploadServiceFailure(error.response?.data?.message || "Failed to upload"));
    }
}

export default function* serviceSaga() {
    yield takeLatest(fetchServicesRequest.type, fetchServicesWorker);
    yield takeLatest(fetchServiceRequest.type, fetchServiceWorker);
    yield takeLatest(fetchActiveServicesRequest.type, fetchActiveServiceWorker);
    yield takeLatest(createServiceRequest.type, createServiceWorker);
    yield takeLatest(updateServiceRequest.type, updateServiceWorker);
    yield takeLatest(deleteServiceRequest.type, deleteServiceWorker);
    yield takeLatest(statusServiceRequest.type, statusServiceWorker);
    yield takeLatest(uploadServiceRequest.type, uploadServiceWorker);
}