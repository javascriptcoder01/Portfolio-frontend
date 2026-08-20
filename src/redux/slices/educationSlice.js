import { createSlice } from "@reduxjs/toolkit";

const educationSlice = createSlice({
    name: "education",
    initialState: {
        educations: [],       // GET ALL
        activeEducations: [],  // GET ACTIVE
        selected: null,          // GET ONE
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        // GET ALL
        fetchEducationsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEducationsSuccess: (state, action) => {
            state.loading = false;
            state.educations = action.payload;
        },
        fetchEducationsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveEducationRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveEducationSuccess: (state, action) => {
            state.loading = false;
            state.activeEducations = action.payload;
        },
        fetchActiveEducationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchEducationRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEducationSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchEducationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createEducationRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createEducationSuccess: (state, action) => {
            state.actionLoading = false;
            state.educations.push(action.payload);
        },
        createEducationFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateEducationRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateEducationSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.educations.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.educations[index] = action.payload;
        },
        updateEducationFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteEducationRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteEducationSuccess: (state, action) => {
            state.actionLoading = false;
            state.educations = state.educations.filter((item) => item._id !== action.payload);
        },
        deleteEducationFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusEducationRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusEducationSuccess: (state, action) => {
            state.actionLoading = false;
            const updatedItem = action.payload;
            if (!updatedItem || !updatedItem._id) return; // safety guard

            // Multiple educations simultaneously active ho sakti hain — sirf isi item ko update karo
            const index = state.educations.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.educations[index] = updatedItem;
        },
        statusEducationFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchEducationsRequest,
    fetchEducationsSuccess,
    fetchEducationsFailure,

    fetchActiveEducationRequest,
    fetchActiveEducationSuccess,
    fetchActiveEducationFailure,

    fetchEducationRequest,
    fetchEducationSuccess,
    fetchEducationFailure,

    createEducationRequest,
    createEducationSuccess,
    createEducationFailure,

    updateEducationRequest,
    updateEducationSuccess,
    updateEducationFailure,

    deleteEducationRequest,
    deleteEducationSuccess,
    deleteEducationFailure,

    statusEducationRequest,
    statusEducationSuccess,
    statusEducationFailure,
} = educationSlice.actions;

export default educationSlice.reducer;