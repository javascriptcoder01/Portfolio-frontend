import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import introductionSaga from "./introductionSaga";
import aboutSaga from "./aboutSaga";
import contactSaga from "./contactSaga";
import skillSaga from './skillSaga';
import experienceSaga from './experienceSaga';
import projectSata from './projectSaga';
import educationSaga from './educationSaga';


export default function* rootSaga() {
    yield all([
        authSaga(),
        introductionSaga(),
        aboutSaga(),
        contactSaga(),
        skillSaga(),
        experienceSaga(),
        projectSata(),
        educationSaga(),
        // aur sagas yahan add karo jaise: userSaga(), authSaga()
    ]);
};