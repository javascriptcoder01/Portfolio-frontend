import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../api/apiEndpoint";
import {
    fetchTestimonialsRequest,
    fetchTestimonialsSuccess,
    fetchTestimonialsFailure,

    fetchActiveTestimonialsRequest,
    fetchActiveTestimonialsSuccess,
    fetchActiveTestimonialsFailure,

    fetchTestimonialRequest,
    fetchTestimonialSuccess,
    fetchTestimonialFailure,

    createTestimonialRequest,
    createTestimonialSuccess,
    createTestimonialFailure,

    updateTestimonialRequest,
    updateTestimonialSuccess,
    updateTestimonialFailure,

    deleteTestimonialRequest,
    deleteTestimonialSuccess,
    deleteTestimonialFailure,

    statusTestimonialRequest,
    statusTestimonialSuccess,
    statusTestimonialFailure,
} from "../slices/testimonialSlice";

// GET ALL
function* fetchTestimonialsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.TESTIMONIAL.GET_ALL);
        yield put(fetchTestimonialsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchTestimonialsFailure(error.response?.data?.message || "Failed to fetch testimonials"));
    }
}

// GET ACTIVE
function* fetchActiveTestimonialsWorker() {
    try {
        const response = yield call(API_ENDPOINTS.TESTIMONIAL.GET_ACTIVE);
        yield put(fetchActiveTestimonialsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchActiveTestimonialsFailure(error.response?.data?.message || "Failed to fetch active testimonials"));
    }
}

// GET ONE
function* fetchTestimonialWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.TESTIMONIAL.GET_ONE, action.payload);
        yield put(fetchTestimonialSuccess(response.data.data));
    } catch (error) {
        yield put(fetchTestimonialFailure(error.response?.data?.message || "Failed to fetch testimonial"));
    }
}

// CREATE
function* createTestimonialWorker(action) {
    try {
        const response = yield call(API_ENDPOINTS.TESTIMONIAL.CREATE, action.payload);
        yield put(createTestimonialSuccess(response.data.data));
    } catch (error) {
        yield put(createTestimonialFailure(error.response?.data?.message || "Failed to create testimonial"));
    }
}

// UPDATE
function* updateTestimonialWorker(action) {
    try {
        const { id, data } = action.payload;
        const response = yield call(API_ENDPOINTS.TESTIMONIAL.UPDATE, id, data);
        yield put(updateTestimonialSuccess(response.data.data));
        yield put(fetchActiveTestimonialsRequest());
    } catch (error) {
        yield put(updateTestimonialFailure(error.response?.data?.message || "Failed to update testimonial"));
    }
}

// DELETE
function* deleteTestimonialWorker(action) {
    try {
        const id = action.payload;
        yield call(API_ENDPOINTS.TESTIMONIAL.DELETE, id);
        yield put(deleteTestimonialSuccess(id));
    } catch (error) {
        yield put(deleteTestimonialFailure(error.response?.data?.message || "Failed to delete testimonial"));
    }
}

// STATUS TOGGLE
function* statusTestimonialWorker(action) {
    try {
        const { id, isActive } = action.payload;
        const response = yield call(API_ENDPOINTS.TESTIMONIAL.STATUS, id, isActive);

        const updatedData = response.data?.data?._id ? response.data.data : { _id: id, isActive };

        yield put(statusTestimonialSuccess(updatedData));

        // true / false dono cases me refetch — carousel live update ke liye
        yield put(fetchActiveTestimonialsRequest());
    } catch (error) {
        yield put(statusTestimonialFailure(error.response?.data?.message || "Failed to update status"));
    }
}

export default function* testimonialSaga() {
    yield takeLatest(fetchTestimonialsRequest.type, fetchTestimonialsWorker);
    yield takeLatest(fetchActiveTestimonialsRequest.type, fetchActiveTestimonialsWorker);
    yield takeLatest(fetchTestimonialRequest.type, fetchTestimonialWorker);
    yield takeLatest(createTestimonialRequest.type, createTestimonialWorker);
    yield takeLatest(updateTestimonialRequest.type, updateTestimonialWorker);
    yield takeLatest(deleteTestimonialRequest.type, deleteTestimonialWorker);
    yield takeLatest(statusTestimonialRequest.type, statusTestimonialWorker);
}