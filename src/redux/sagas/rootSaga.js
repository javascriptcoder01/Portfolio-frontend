import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import introductionSaga from "./introductionSaga";
import aboutSaga from "./aboutSaga";
import contactSaga from "./contactSaga";
import skillSaga from './skillSaga';
import experienceSaga from './experienceSaga';
import projectSaga from './projectSaga';
import educationSaga from './educationSaga';
import serviceSaga from './serviceSaga';
import testimonialSaga from './testimonialSaga';
import languageSaga from './languageSaga';
import hobbySaga from './hobbySaga';


export default function* rootSaga() {
    yield all([
        authSaga(),
        introductionSaga(),
        aboutSaga(),
        contactSaga(),
        skillSaga(),
        experienceSaga(),
        projectSaga(),
        educationSaga(),
        serviceSaga(),
        testimonialSaga(),
        languageSaga(),
        hobbySaga(),
        // aur sagas yahan add karo jaise: userSaga(), authSaga()
    ]);
};