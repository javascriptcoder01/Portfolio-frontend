import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
    name: "skill",
    initialState: {
        skills: [],        // GET ALL
        activeSkills: [],   // GET ACTIVE
        selected: null,      // GET ONE
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        // GET ALL
        fetchSkillsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSkillsSuccess: (state, action) => {
            state.loading = false;
            state.skills = action.payload;
        },
        fetchSkillsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveSkillsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveSkillsSuccess: (state, action) => {
            state.loading = false;
            state.activeSkills = action.payload;
        },
        fetchActiveSkillsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchSkillRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSkillSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchSkillFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createSkillRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createSkillSuccess: (state, action) => {
            state.actionLoading = false;
            state.skills.push(action.payload);
        },
        createSkillFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateSkillRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateSkillSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.skills.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.skills[index] = action.payload;
        },
        updateSkillFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteSkillRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteSkillSuccess: (state, action) => {
            state.actionLoading = false;
            state.skills = state.skills.filter((item) => item._id !== action.payload);
        },
        deleteSkillFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusSkillRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusSkillSuccess: (state, action) => {
            state.actionLoading = false;
            const updatedItem = action.payload;
            if (!updatedItem || !updatedItem._id) return; // safety guard

            const index = state.skills.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.skills[index] = updatedItem;
        },
        statusSkillFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // ICON UPLOAD
        uploadSkillIconRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        uploadSkillIconSuccess: (state, action) => {
            state.actionLoading = false;
            const updatedItem = action.payload;
            if (!updatedItem || !updatedItem._id) return;

            const index = state.skills.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.skills[index] = updatedItem;
        },
        uploadSkillIconFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchSkillsRequest,
    fetchSkillsSuccess,
    fetchSkillsFailure,

    fetchActiveSkillsRequest,
    fetchActiveSkillsSuccess,
    fetchActiveSkillsFailure,

    fetchSkillRequest,
    fetchSkillSuccess,
    fetchSkillFailure,

    createSkillRequest,
    createSkillSuccess,
    createSkillFailure,

    updateSkillRequest,
    updateSkillSuccess,
    updateSkillFailure,

    deleteSkillRequest,
    deleteSkillSuccess,
    deleteSkillFailure,

    statusSkillRequest,
    statusSkillSuccess,
    statusSkillFailure,

    uploadSkillIconRequest,
    uploadSkillIconSuccess,
    uploadSkillIconFailure,
} = skillSlice.actions;

export default skillSlice.reducer;