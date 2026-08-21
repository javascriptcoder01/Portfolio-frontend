import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: [],
        activeServices: [],
        selected: null,
        loading: false,
        actionLoading: false,
        error: null,
    },

    reducers: {
        fetchServicesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchServicesSuccess: (state, action) => {
            state.loading = false;
            state.services = action.payload;
        },
        fetchServicesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        fetchActiveServicesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveServicesSuccess: (state, action) => {
            state.loading = false; // FIX: comma operator hataya, semicolon kiya
            state.activeServices = action.payload;
        },
        fetchActiveServicesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        fetchServiceRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchServiceSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchServiceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        createServiceRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createServiceSuccess: (state, action) => {
            state.actionLoading = false;
            state.services.push(action.payload);
        },
        createServiceFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        updateServiceRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateServiceSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.services.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.services[index] = action.payload;
        },
        updateServiceFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        deleteServiceRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteServiceSuccess: (state, action) => {
            state.actionLoading = false;
            state.services = state.services.filter((item) => item._id !== action.payload);
        },
        deleteServiceFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        statusServiceRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusServiceSuccess: (state, action) => {
            state.actionLoading = false; // FIX: ye line missing thi — main bug
            const updatedItem = action.payload;

            if (!updatedItem || !updatedItem._id) return; // FIX: && ko || kiya

            const index = state.services.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.services[index] = updatedItem;
        },
        statusServiceFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        uploadServiceRequest: (state) => {
            state.actionLoading = true;
            state.error = null; // FIX: "false" tha, "null" kiya (consistency)
        },
        uploadServiceSuccess: (state, action) => {
            state.actionLoading = false;
            const updatedItem = action.payload;

            if (!updatedItem || !updatedItem._id) return;

            const index = state.services.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) state.services[index] = updatedItem;
        },
        uploadServiceFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchServicesRequest,
    fetchServicesSuccess,
    fetchServicesFailure,

    fetchActiveServicesRequest,
    fetchActiveServicesSuccess,
    fetchActiveServicesFailure,

    fetchServiceRequest,
    fetchServiceSuccess,
    fetchServiceFailure,

    createServiceRequest,
    createServiceSuccess,
    createServiceFailure,

    updateServiceRequest,
    updateServiceSuccess,
    updateServiceFailure,

    deleteServiceRequest,
    deleteServiceSuccess,
    deleteServiceFailure,

    statusServiceRequest,
    statusServiceSuccess,
    statusServiceFailure,

    uploadServiceRequest,
    uploadServiceSuccess,
    uploadServiceFailure,
} = serviceSlice.actions;

export default serviceSlice.reducer;