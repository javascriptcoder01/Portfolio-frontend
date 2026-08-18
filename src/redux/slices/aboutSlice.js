import { createSlice } from "@reduxjs/toolkit";


const aboutSlice = createSlice({
    name: 'about',
    initialState: {
        abouts: [],
        active: null,
        selected: null,
        loading: false,
        actionLoading: false,
        error: null
    },

    reducers: {
        // GET ALL
        fetchAboutsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAboutsSuccess: (state, action) => {
            state.loading = false;
            state.abouts = action.payload;
        },
        fetchAboutsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveAboutRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveAboutSuccess: (state, action) => {
            // console.log('Acitive About Data from Slice: ', action.payload);
            state.loading = false;
            state.active = action.payload;
        },
        fetchActiveAboutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchAboutRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAboutSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchAboutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createAboutRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createAboutSuccess: (state, action) => {
            state.actionLoading = false;
            state.abouts.push(action.payload);
        },
        createAboutFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateAboutRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateAboutSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.abouts.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.abouts[index] = action.payload;
        },
        updateAboutFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteAboutRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteAboutSuccess: (state, action) => {
            state.actionLoading = false;
            state.abouts = state.abouts.filter((item) => item._id !== action.payload);
        },
        deleteAboutFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusAboutRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusAboutSuccess: (state, action) => {
            state.actionLoading = false;
            const updatedItem = action.payload;

            if (updatedItem.isActive) {
                state.abouts = state.abouts.map((item) => item._id === updatedItem._id ? updatedItem : { ...item, isActive: false });
            } else {
                const index = state.abouts.findIndex((item) => item._id === updatedItem._id);

                if (index !== -1) state.abouts[index] = action.payload;
            }
        },
        statusAboutFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

    }
});

export const {
    fetchAboutsRequest,
    fetchAboutsSuccess,
    fetchAboutsFailure,

    fetchActiveAboutRequest,
    fetchActiveAboutSuccess,
    fetchActiveAboutFailure,

    fetchAboutRequest,
    fetchAboutSuccess,
    fetchAboutFailure,

    createAboutRequest,
    createAboutSuccess,
    createAboutFailure,

    updateAboutRequest,
    updateAboutSuccess,
    updateAboutFailure,

    deleteAboutRequest,
    deleteAboutSuccess,
    deleteAboutFailure,

    statusAboutRequest,
    statusAboutSuccess,
    statusAboutFailure,

} = aboutSlice.actions;

export default aboutSlice.reducer;