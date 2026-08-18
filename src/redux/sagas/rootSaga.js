import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import introductionSaga from "./introductionSaga";
import aboutSaga from "./aboutSaga";


export default function* rootSaga() {
    yield all([
        authSaga(),
        introductionSaga(),
        aboutSaga(),
        // aur sagas yahan add karo jaise: userSaga(), authSaga()
    ]);
};