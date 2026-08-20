import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],    // GET ALL
        activeProjects: [], // GET ACTIVE
        selected: null,       // GET ONE
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        // GET ALL
        fetchProjectsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProjectsSuccess: (state, action) => {
            state.loading = false;
            state.projects = action.payload;
        },
        fetchProjectsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveProjectRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveProjectSuccess: (state, action) => {
            state.loading = false;
            state.activeProjects = action.payload;
        },
        fetchActiveProjectFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchProjectRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProjectSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchProjectFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createProjectRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createProjectSuccess: (state, action) => {
            state.actionLoading = false;
            state.projects.push(action.payload);
        },
        createProjectFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateProjectRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateProjectSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.projects.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.projects[index] = action.payload;
        },
        updateProjectFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteProjectRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteProjectSuccess: (state, action) => {
            state.actionLoading = false;
            state.projects = state.projects.filter((item) => item._id !== action.payload);
        },
        deleteProjectFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusProjectRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusProjectSuccess: (state, action) => {
            state.actionLoading = false;
            const updatedItem = action.payload;
            if (!updatedItem || !updatedItem._id) return; // safety guard

            const index = state.projects.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.projects[index] = updatedItem;
        },
        statusProjectFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchProjectsRequest,
    fetchProjectsSuccess,
    fetchProjectsFailure,

    fetchActiveProjectRequest,
    fetchActiveProjectSuccess,
    fetchActiveProjectFailure,

    fetchProjectRequest,
    fetchProjectSuccess,
    fetchProjectFailure,

    createProjectRequest,
    createProjectSuccess,
    createProjectFailure,

    updateProjectRequest,
    updateProjectSuccess,
    updateProjectFailure,

    deleteProjectRequest,
    deleteProjectSuccess,
    deleteProjectFailure,

    statusProjectRequest,
    statusProjectSuccess,
    statusProjectFailure,
} = projectSlice.actions;

export default projectSlice.reducer;