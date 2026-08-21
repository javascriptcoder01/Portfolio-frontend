import { createSlice } from "@reduxjs/toolkit";

const testimonialSlice = createSlice({
    name: "testimonial",
    initialState: {
        testimonials: [],       // GET ALL
        activeTestimonials: [],  // GET ACTIVE
        selected: null,            // GET ONE
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        // GET ALL
        fetchTestimonialsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTestimonialsSuccess: (state, action) => {
            state.loading = false;
            state.testimonials = action.payload;
        },
        fetchTestimonialsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveTestimonialsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveTestimonialsSuccess: (state, action) => {
            state.loading = false;
            state.activeTestimonials = action.payload;
        },
        fetchActiveTestimonialsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchTestimonialRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTestimonialSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchTestimonialFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createTestimonialRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createTestimonialSuccess: (state, action) => {
            state.actionLoading = false;
            state.testimonials.push(action.payload);
        },
        createTestimonialFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateTestimonialRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateTestimonialSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.testimonials.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.testimonials[index] = action.payload;
        },
        updateTestimonialFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteTestimonialRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteTestimonialSuccess: (state, action) => {
            state.actionLoading = false;
            state.testimonials = state.testimonials.filter((item) => item._id !== action.payload);
        },
        deleteTestimonialFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusTestimonialRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusTestimonialSuccess: (state, action) => {
            state.actionLoading = false; // zaroori — warna buttons permanently disabled reh jayenge
            const updatedItem = action.payload;
            if (!updatedItem || !updatedItem._id) return; // "||" use kiya, "&&" nahi

            const index = state.testimonials.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.testimonials[index] = updatedItem;
        },
        statusTestimonialFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
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
} = testimonialSlice.actions;

export default testimonialSlice.reducer;