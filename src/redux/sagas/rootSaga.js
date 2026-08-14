import { all } from "redux-saga/effects";
import authSaga from "./authSaga";


export default function* rootSaga() {
    yield all([
        authSaga(),
        // aur sagas yahan add karo jaise: userSaga(), authSaga()
    ]);
};