import { createSlice } from "@reduxjs/toolkit";
import { tokenStorage } from "../../utils/tokenStorage";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: !!tokenStorage.getAccessToken(),
        loading: false,
        error: null,
        logoutLoading: false
    },
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.data = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Logout Flow
        logoutRequest: (state) => {
            state.logoutLoading = true;
        },
        logoutSuccess: (state) => {
            state.logoutLoading = false;
            state.user = null;
            state.isAuthenticated = false;
            // tokenStorage.clearToekns();
        },
        logoutFailure: (state) => {
            // Backend Api call faile ho jaye tab bhi local session clear kar do
            state.logoutLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;