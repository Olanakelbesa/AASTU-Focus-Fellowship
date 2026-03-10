import { call, put, takeLatest } from "redux-saga/effects";
import makeCall from "@/lib/api/makeCall";
import { apiRoutes } from "@/lib/api";
import {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
  fetchEventRequest,
  fetchEventSuccess,
  fetchEventFailure,
  createEventRequest,
  createEventSuccess,
  createEventFailure,
  updateEventRequest,
  updateEventSuccess,
  updateEventFailure,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFailure,
  registerForEventRequest,
  registerForEventSuccess,
  registerForEventFailure,
  cancelRegistrationRequest,
  cancelRegistrationSuccess,
  cancelRegistrationFailure,
} from "./index";
import type {
  Event,
  CreateEventPayload,
  UpdateEventPayload,
  RegisterForEventPayload,
  CancelRegistrationPayload,
} from "./types";
import { SagaIterator } from "redux-saga";
import { ToastService } from "@/lib/services/toastService";

// Fetch all events
function* fetchEventsSaga(): SagaIterator {
  try {
    const response: { data: Event[] } = yield call(makeCall, {
      route: apiRoutes.events.list,
      method: "GET",
    });
    yield put(fetchEventsSuccess(response.data as unknown as Event[]));
  } catch (error: any) {
    yield put(fetchEventsFailure(error.message || "Failed to fetch events"));
  }
}

// Fetch single event
function* fetchEventSaga(
  action: ReturnType<typeof fetchEventRequest>
): SagaIterator {
  try {
    const id = action.payload;
    const response: { data: Event } = yield call(makeCall, {
      route: apiRoutes.events.byId(id),
      method: "GET",
    });
    yield put(fetchEventSuccess(response.data as unknown as Event));
  } catch (error: any) {
    yield put(fetchEventFailure(error.message || "Failed to fetch event"));
  }
}

// Create event
function* createEventSaga(
  action: ReturnType<typeof createEventRequest>
): SagaIterator {
  try {
    const payload = action.payload;
    const isFormData = payload instanceof FormData;

    const response = yield call(makeCall, {
      route: apiRoutes.events.create,
      method: "POST",
      body: payload,
      header: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
    });

    if(response?.success) {
      ToastService.success(response.message)
    }

    yield put(createEventSuccess(response.data as unknown as Event));
  } catch (error: any) {
    yield put(createEventFailure(error.message || "Failed to create event"));
  }
}

// Update event
function* updateEventSaga(
  action: ReturnType<typeof updateEventRequest>
): SagaIterator {
  try {
    const payload = action.payload as UpdateEventPayload;
    const response: { data: Event } = yield call(makeCall, {
      route: apiRoutes.events.update(payload._id),
      method: "PUT",
      body: payload,
    });
    yield put(updateEventSuccess(response.data as unknown as Event));
  } catch (error: any) {
    yield put(updateEventFailure(error.message || "Failed to update event"));
  }
}

// Delete event
function* deleteEventSaga(
  action: ReturnType<typeof deleteEventRequest>
): SagaIterator {
  try {
    const id = action.payload as string;
    yield call(makeCall, {
      route: apiRoutes.events.delete(id),
      method: "DELETE",
    });
    yield put(deleteEventSuccess(id));
  } catch (error: any) {
    yield put(deleteEventFailure(error.message || "Failed to delete event"));
  }
}

// Register for event
function* registerForEventSaga(
  action: ReturnType<typeof registerForEventRequest>
): SagaIterator {
  try {
    const { eventId } = action.payload as RegisterForEventPayload;
    const response: { data: Event } = yield call(makeCall, {
      route: `${apiRoutes.events.base}/register`,
      method: "POST",
      body: { eventId },
    });
    yield put(registerForEventSuccess(response.data as unknown as Event));
  } catch (error: any) {
    yield put(
      registerForEventFailure(error.message || "Failed to register for event")
    );
  }
}

// Cancel registration
function* cancelRegistrationSaga(
  action: ReturnType<typeof cancelRegistrationRequest>
): SagaIterator {
  try {
    const { eventId } = action.payload as CancelRegistrationPayload;
    const response: { data: Event } = yield call(makeCall, {
      route: `${apiRoutes.events.base}/cancel`,
      method: "POST",
      body: { eventId },
    });
    yield put(cancelRegistrationSuccess(response.data as unknown as Event));
  } catch (error: any) {
    yield put(
      cancelRegistrationFailure(
        error.message || "Failed to cancel registration"
      )
    );
  }
}

export default function* eventsSaga(): SagaIterator {
  yield takeLatest(fetchEventsRequest.type, fetchEventsSaga);
  yield takeLatest(fetchEventRequest.type, fetchEventSaga);
  yield takeLatest(createEventRequest.type, createEventSaga);
  yield takeLatest(updateEventRequest.type, updateEventSaga);
  yield takeLatest(deleteEventRequest.type, deleteEventSaga);
  yield takeLatest(registerForEventRequest.type, registerForEventSaga);
  yield takeLatest(cancelRegistrationRequest.type, cancelRegistrationSaga);
}
