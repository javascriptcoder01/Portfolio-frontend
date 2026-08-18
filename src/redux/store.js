import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagas/rootSaga";
import createSagaMiddleware from "redux-saga";
import authReducer from "./slices/authSlice";
import introductionReducer from './slices/introductionSlice';
import aboutReducer from './slices/aboutSlice';


// STEP 1: Create Saga Middleware Object
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {

        auth: authReducer,
        introduction: introductionReducer,
        about: aboutReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);  // Run Root Saga

export default store;