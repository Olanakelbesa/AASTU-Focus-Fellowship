import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
  logout,
  setUser,
} from "./index";
import { UserType } from "./types";
import { SagaIterator } from "redux-saga";
import makeCall from "@/lib/api/makeCall";
import { apiRoutes } from "@/lib/api";
import { RegisterPayload, LoginPayload } from "./types"


// Util for storing/removing token/user in localStorage
const persistAuth = (user: UserType | null, token: string | null) => {
  if (user && token) {
    localStorage.setItem("auth_user", JSON.stringify(user));
    localStorage.setItem("auth_token", token);
  } else {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
  }
};

// Login Saga
function* loginSaga(action: {
  type: string;
  payload: LoginPayload;
}): SagaIterator {
  try {
    const response = yield call(makeCall, {
      route: apiRoutes.auth.login,
      method: "POST",
      body: action.payload,
      isSecureRoute: false,
    });
    const { user, token } = response.data;
    yield put(loginSuccess({ user, token }));
    persistAuth(user, token);
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message || error.message));
    persistAuth(null, null);
  }
}

// Register Saga
function* registerSaga(action: {
  type: string;
  payload: RegisterPayload;
}): SagaIterator {
  try {
    const response = yield call(makeCall, {
      route: apiRoutes.auth.register,
      method: "POST",
      body: action.payload,
      isSecureRoute: false,
    });
    console.log("respons", response)
    const { user, token } = response.data;
    yield put(registerSuccess({ user, token }));
    persistAuth(user, token);
  } catch (error: any) {
    yield put(registerFailure(error.response?.data?.message || error.message));
    persistAuth(null, null);
  }
}

// Refresh Token Saga
function* refreshTokenSaga(): SagaIterator {
  try {
    const response = yield call(makeCall, {
      route: apiRoutes.auth.refreshToken,
      method: "POST",
      isSecureRoute: true,
    });
    const token = response.data?.data?.token || response.data?.token;
    yield put(refreshTokenSuccess(token));
    localStorage.setItem("auth_token", token);
  } catch (error: any) {
    yield put(
      refreshTokenFailure(
        (error.response?.data as any)?.message || error.message
      )
    );
    persistAuth(null, null);
  }
}

// Logout Saga
function* logoutSaga() {
  try {
    yield call(makeCall, {
      route: apiRoutes.auth.logout,
      method: "POST",
      isSecureRoute: true,
    });
  } finally {
    persistAuth(null, null);
  }
}

// Bootstrap user from localStorage on app init
function* initializeAuthSaga() {
  const userStr = localStorage.getItem("auth_user");
  const token = localStorage.getItem("auth_token");
  if (userStr && token) {
    const user = JSON.parse(userStr) as UserType;
    yield put(setUser(user));
    yield put(refreshTokenRequest());
  } else {
    yield put(setUser(null));
  }
}

// Watcher
export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(refreshTokenRequest.type, refreshTokenSaga);
  yield takeLatest(logout.type, logoutSaga);
  // Optionally, add takeLatest for initializeAuthSaga if you trigger it on app start
}
