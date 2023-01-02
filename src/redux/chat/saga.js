import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    FULL_USER,
  LOGIN_USER,

} from "./constants";

import {
   setFullUser,
  
} from "./actions";

import Cookies from "js-cookie";








function* updateUsers({ payload: { users } }) {
    yield put(setFullUser(users));
    

}



export function* watchUpdateUsers() {
  yield takeEvery(FULL_USER, updateUsers);
}


function* chatSaga() {
  yield all([
    fork(watchLoginUser),
   
  ]);
}

export default authSaga;
