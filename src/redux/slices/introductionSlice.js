import { createSlice } from "@reduxjs/toolkit";


const introductionSlice = createSlice({
    name: 'introduction',
    initialState: {
        introductions: [],  // Get All
        active: null,   // Single Active Introduction
        selected: null,  // Get Single Introduction
        loading: false,
        actionLoading: false,  // CRUD/Status ke liye
        error: null
    },

    reducers: {
        // GET ALL
        fetchIntroductionsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchIntroductionsSuccess: (state, action) => {
            state.loading = false;
            state.introductions = action.payload;
        },
        fetchIntroductionsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveIntroductionRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveIntroductionSuccess: (state, action) => {
            state.loading = false;
            state.active = action.payload;
        },
        fetchActiveIntroductionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchIntroductionRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchIntroductionSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchIntroductionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createIntroductionRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createIntroductionSuccess: (state, action) => {
            state.actionLoading = false;
            state.introductions.push(action.payload);
        },
        createIntroductionFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateIntroductionRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateIntroductionSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.introductions.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.introductions[index] = action.payload;
        },
        updateIntroductionFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteIntroductionRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteIntroductionSuccess: (state, action) => {
            state.actionLoading = false;
            state.introductions = state.introductions.filter((item) => item._id !== action.payload);
        },
        deleteIntroductionFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusIntroductionRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusIntroductionSuccess: (state, action) => {
            state.actionLoading = false;
            const updatedItem = action.payload;
            // FIX - Agar ye item active ho raha hai baki sabko false kar do
            if (updatedItem.isActive) {
                state.introductions = state.introductions.map((item) => item._id === updatedItem._id ? updatedItem : { ...item, isActive: false });
            } else {
                const index = state.introductions.findIndex((item) => item._id === updatedItem._id)
                if (index !== -1) state.introductions[index] = action.payload;
            }

        },
        statusIntroductionFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

    },
});

export const {
    fetchIntroductionsRequest,
    fetchIntroductionsSuccess,
    fetchIntroductionsFailure,

    fetchActiveIntroductionRequest,
    fetchActiveIntroductionSuccess,
    fetchActiveIntroductionFailure,

    fetchIntroductionRequest,
    fetchIntroductionSuccess,
    fetchIntroductionFailure,

    createIntroductionRequest,
    createIntroductionSuccess,
    createIntroductionFailure,

    updateIntroductionRequest,
    updateIntroductionSuccess,
    updateIntroductionFailure,

    deleteIntroductionRequest,
    deleteIntroductionSuccess,
    deleteIntroductionFailure,

    statusIntroductionRequest,
    statusIntroductionSuccess,
    statusIntroductionFailure
} = introductionSlice.actions;

export default introductionSlice.reducer;