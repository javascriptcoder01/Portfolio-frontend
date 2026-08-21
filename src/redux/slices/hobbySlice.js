import { createSlice } from "@reduxjs/toolkit";

const hobbySlice = createSlice({
    name: "hobby",
    initialState: {
        hobbies: [],       // GET ALL
        activeHobbies: [],  // GET ACTIVE
        selected: null,       // GET ONE
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        // GET ALL
        fetchHobbiesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchHobbiesSuccess: (state, action) => {
            state.loading = false;
            state.hobbies = action.payload;
        },
        fetchHobbiesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveHobbiesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveHobbiesSuccess: (state, action) => {
            state.loading = false;
            state.activeHobbies = action.payload;
        },
        fetchActiveHobbiesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchHobbyRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchHobbySuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchHobbyFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createHobbyRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createHobbySuccess: (state, action) => {
            state.actionLoading = false;
            state.hobbies.push(action.payload);
        },
        createHobbyFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateHobbyRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateHobbySuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.hobbies.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.hobbies[index] = action.payload;
        },
        updateHobbyFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteHobbyRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteHobbySuccess: (state, action) => {
            state.actionLoading = false;
            state.hobbies = state.hobbies.filter((item) => item._id !== action.payload);
        },
        deleteHobbyFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusHobbyRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusHobbySuccess: (state, action) => {
            state.actionLoading = false; // zaroori — buttons disable-forever bug se bachne ke liye
            const updatedItem = action.payload;
            if (!updatedItem || !updatedItem._id) return;

            const index = state.hobbies.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.hobbies[index] = updatedItem;
        },
        statusHobbyFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchHobbiesRequest,
    fetchHobbiesSuccess,
    fetchHobbiesFailure,

    fetchActiveHobbiesRequest,
    fetchActiveHobbiesSuccess,
    fetchActiveHobbiesFailure,

    fetchHobbyRequest,
    fetchHobbySuccess,
    fetchHobbyFailure,

    createHobbyRequest,
    createHobbySuccess,
    createHobbyFailure,

    updateHobbyRequest,
    updateHobbySuccess,
    updateHobbyFailure,

    deleteHobbyRequest,
    deleteHobbySuccess,
    deleteHobbyFailure,

    statusHobbyRequest,
    statusHobbySuccess,
    statusHobbyFailure,
} = hobbySlice.actions;

export default hobbySlice.reducer;