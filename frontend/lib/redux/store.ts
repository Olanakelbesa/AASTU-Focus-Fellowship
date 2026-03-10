import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlices/themeSlice";
import authReducer from "./authSlice";
import createSagaMiddleware from "redux-saga";
import authSaga from "./authSlice/saga";
import eventsReducer from "./eventSlice"
import eventsSaga from "./eventSlice/saga";


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    events: eventsReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(eventsSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
