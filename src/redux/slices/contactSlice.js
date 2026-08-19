import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        contacts: [],   // GET ALL
        active: null,    // GET ACTIVE
        selected: null,   // GET ONE
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        // GET ALL
        fetchContactsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchContactsSuccess: (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
        },
        fetchContactsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ACTIVE
        fetchActiveContactRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchActiveContactSuccess: (state, action) => {
            state.loading = false;
            state.active = action.payload;
        },
        fetchActiveContactFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // GET ONE
        fetchContactRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchContactSuccess: (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        },
        fetchContactFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CREATE
        createContactRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        createContactSuccess: (state, action) => {
            state.actionLoading = false;
            state.contacts.push(action.payload);
        },
        createContactFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateContactRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        updateContactSuccess: (state, action) => {
            state.actionLoading = false;
            const index = state.contacts.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) state.contacts[index] = action.payload;
        },
        updateContactFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // DELETE
        deleteContactRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        deleteContactSuccess: (state, action) => {
            state.actionLoading = false;
            state.contacts = state.contacts.filter((item) => item._id !== action.payload);
        },
        deleteContactFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },

        // STATUS TOGGLE
        statusContactRequest: (state) => {
            state.actionLoading = true;
            state.error = null;
        },
        statusContactSuccess: (state, action) => {
            state.actionLoading = false;
            const updatedItem = action.payload;

            // Sirf ek hi contact active reh sakta hai — baaki local state me false kar do
            if (updatedItem.isActive) {
                state.contacts = state.contacts.map((item) =>
                    item._id === updatedItem._id ? updatedItem : { ...item, isActive: false }
                );

            } else {
                const index = state.contacts.findIndex((item) => item._id === updatedItem._id);
                if (index !== -1) state.contacts[index] = updatedItem;
            }
        },
        statusContactFailure: (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchContactsRequest,
    fetchContactsSuccess,
    fetchContactsFailure,

    fetchActiveContactRequest,
    fetchActiveContactSuccess,
    fetchActiveContactFailure,

    fetchContactRequest,
    fetchContactSuccess,
    fetchContactFailure,

    createContactRequest,
    createContactSuccess,
    createContactFailure,

    updateContactRequest,
    updateContactSuccess,
    updateContactFailure,

    deleteContactRequest,
    deleteContactSuccess,
    deleteContactFailure,

    statusContactRequest,
    statusContactSuccess,
    statusContactFailure,
} = contactSlice.actions;

export default contactSlice.reducer;