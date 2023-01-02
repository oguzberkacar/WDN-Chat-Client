import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD, LOGIN_USER_TWOFACTOR, GET_USER } from './constants';

import { loginUserSuccess, registerUserSuccess, forgetPasswordSuccess, apiError } from './actions';

import Cookies from 'js-cookie';

import { getLoggedInUser } from '../../helpers/authUtils';

/**
 * Sets the session
 * @param {*} user
 */

const create = new APIClient().create;
const get = new APIClient().get;
/**
 * Login the user
 * @param {*} payload - username and password
 */

function* login({ payload: { username, password, history } }) {
	const device_id = 1;
	try {
		const response = yield call(create, 'auth/login', {
			username,
			password,
			device_id,
		});
		let obj = JSON.parse(response);
		if (obj.error && obj.error.code === 404) {
			yield put(apiError('Connection error, please try again.'));
		}
		if (obj.status === 200 && obj.success == true) {
			if (obj.two_factor == 0) {
				Cookies.set('access_token', obj.access_token);
				history.push('/dashboard');

				history.push('/dashboard');
			} else if (obj.two_factor == 1) {
				Cookies.set('base_64', obj.base64_code);
				history.push('/twofactor');
			}
		}
		if (obj.status === 401 && obj.success == false) {
			let errorMessage = '';
			obj.message == 'username_does_not_match' ? (errorMessage = 'Username does not match') : (errorMessage = 'Password does not match');
			yield put(apiError(errorMessage));
		}
	} catch (error) {
		yield put(apiError(error));
	}
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
	try {
		Cookies.remove('access_token');
		yield call(() => {
			history.push('/login');
		});
	} catch (error) {}
}

/**
 * Register the user
 */
function* register({ payload: { user } }) {
	let data = {
		status: true,
		username: user.username,
		password: user.password,
		email: user.email,
		phone: user.phone,
		phone_verify: '0',
		avatar: '',
		reference_code: '',
		user_lang_id: 2,
	};

	const response = yield call(create, 'auth/register', data);
	let obj = JSON.parse(response);

	//
}

/**
 * forget password
 */
function* forgetPassword({ payload: { email, type } }) {
	try {
		if (type == 'email') {
			const response = yield call(get, 'password-reset-with-email', {
				email: email,
			});

			let obj = JSON.parse(response);
			if (obj.status == 200 && obj.success == false) {
				console.log(obj.message);
				obj.message == 'user_not_found' ? yield put(forgetPasswordSuccess('User not found')) : yield put(forgetPasswordSuccess('Email not found'));
			}
		}
		if (type == 'phone') {
			const response = yield call(get, 'password-reset-with-phone', {
				phone: email,
			});

			let obj = JSON.parse(response);
		}
	} catch (error) {
		yield put(apiError(error));
	}
}

function* loginUserTwofactor({ payload: { base64, code, history } }) {
	let data = {
		base64_code: base64,
		two_factor_code: code,
	};
	if (base64 == null) {
		data.base64_code = Cookies.get('base_64');

		if (Cookies.get('base_64') == undefined) {
			history.push('/login');
			yield put(apiError('Connection error, please login again.'));
		}
	}

	try {
		const response = yield call(create, 'two-factor/login', data);
		let obj = JSON.parse(response);
		if (obj.error && obj.error.code === 404) {
			yield put(apiError('Connection error, please try again.'));
		}

		if (obj.status === 200 && obj.success == true) {
			yield put(loginUserSuccess(obj.access_token));
			Cookies.set('access_token', obj.access_token);
			Cookies.remove('base_64');
			history.push('/dashboard');
		}
		if (obj.status === 200 && obj.success == false) {
			let errorMessage = 'Code is wrong, please try again.';

			yield put(apiError(errorMessage));
		}
	} catch (error) {
		// yield put(apiError(error));
	}
}

function* getUser({ payload: { user } }) {
	loginUserSuccess(user);
}

export function* watchgetUser() {
	yield takeEvery(GET_USER, getUser);
}

export function* watchLoginUser() {
	yield takeEvery(LOGIN_USER, login);
}

export function* watchtwofactor() {
	yield takeEvery(LOGIN_USER_TWOFACTOR, loginUserTwofactor);
}

export function* watchLogoutUser() {
	yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
	yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
	yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
	yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchRegisterUser), fork(watchForgetPassword), fork(watchtwofactor), fork(watchgetUser)]);
}

export default authSaga;
