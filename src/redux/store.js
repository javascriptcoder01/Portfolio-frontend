import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagas/rootSaga";
import createSagaMiddleware from "redux-saga";
import authReducer from "./slices/authSlice";
import introductionReducer from './slices/introductionSlice';
import aboutReducer from './slices/aboutSlice';
import contactReducer from './slices/contactSlice';
import skillReducer from './slices/skillSlice';
import experienceReducer from './slices/experienceSlice';
import projectReducer from './slices/projectSlice';
import educationReducer from './slices/educationSlice';
import serviceReducer from './slices/serviceSlice';
import testimonialReducer from './slices/testimonialSlice';
import langaugeReducer from './slices/languageSlice';
import hobbyReducer from './slices/hobbySlice';


// STEP 1: Create Saga Middleware Object
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {

        auth: authReducer,
        introduction: introductionReducer,
        about: aboutReducer,
        contact: contactReducer,
        skill: skillReducer,
        experience: experienceReducer,
        project: projectReducer,
        education: educationReducer,
        service: serviceReducer,
        testimonial: testimonialReducer,
        language: langaugeReducer,
        hobby: hobbyReducer,
        // Add More Reducers

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);  // Run Root Saga

export default store;