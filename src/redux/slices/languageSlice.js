import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
    name: "language",
    initialState: {
        languages: [],       // GET ALL
        activeLanguages: [],  // GET ACTIVE
        selected: null,         // GET ONE
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        // GET ALL
        fetchLanguagesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchLanguagesSuccess: (state, action) => {
            state.loading = false;
            state.languages = action.payload;
        },
        fetchLanguagesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveLanguagesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveLanguagesSuccess: (state, action) => {
            state.loading = false;
            state.activeLanguages = action.payload;
        },
        fetchActiveLanguagesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchLanguageRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchLanguageSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchLanguageFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createLanguageRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createLanguageSuccess: (state, action) => {
            state.actionLoading = false;
            state.languages.push(action.payload);
        },
        createLanguageFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateLanguageRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateLanguageSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.languages.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.languages[index] = action.payload;
        },
        updateLanguageFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteLanguageRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteLanguageSuccess: (state, action) => {
            state.actionLoading = false;
            state.languages = state.languages.filter((item) => item._id !== action.payload);
        },
        deleteLanguageFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusLanguageRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusLanguageSuccess: (state, action) => {
            state.actionLoading = false; // zaroori — warna buttons permanently disabled reh jayenge
            const updatedItem = action.payload;
            if (!updatedItem || !updatedItem._id) return; // "||" hi use karna hai

            const index = state.languages.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.languages[index] = updatedItem;
        },
        statusLanguageFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
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
} = languageSlice.actions;

export default languageSlice.reducer;