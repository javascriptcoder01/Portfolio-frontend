import { createSlice } from "@reduxjs/toolkit";

const experienceSlice = createSlice({
    name: "experience",
    initialState: {
        experiences: [],    // GET ALL
        activeExperiences: [], // GET ACTIVE
        selected: null,       // GET ONE
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        // GET ALL
        fetchExperiencesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchExperiencesSuccess: (state, action) => {
            state.loading = false;
            state.experiences = action.payload;
        },
        fetchExperiencesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveExperiencesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveExperiencesSuccess: (state, action) => {
            state.loading = false;
            state.activeExperiences = action.payload;
        },
        fetchActiveExperiencesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchExperienceRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchExperienceSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchExperienceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createExperienceRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createExperienceSuccess: (state, action) => {
            state.actionLoading = false;
            state.experiences.push(action.payload);
        },
        createExperienceFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateExperienceRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateExperienceSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.experiences.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.experiences[index] = action.payload;
        },
        updateExperienceFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteExperienceRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteExperienceSuccess: (state, action) => {
            state.actionLoading = false;
            state.experiences = state.experiences.filter((item) => item._id !== action.payload);
        },
        deleteExperienceFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusExperienceRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusExperienceSuccess: (state, action) => {
            state.actionLoading = false;
            const updatedItem = action.payload;
            if (!updatedItem || !updatedItem._id) return; // safety guard

            const index = state.experiences.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.experiences[index] = updatedItem;

        },
        statusExperienceFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
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
} = experienceSlice.actions;

export default experienceSlice.reducer;