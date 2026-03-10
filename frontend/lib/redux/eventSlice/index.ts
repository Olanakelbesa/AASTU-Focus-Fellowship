import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Event,
  CreateEventPayload,
  UpdateEventPayload,
  RegisterForEventPayload,
  CancelRegistrationPayload,
  EventsState,
} from "./types";

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
  selected: null,
  pagination: null ,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // List
    fetchEventsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess(state, action: PayloadAction<Event[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchEventsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Get by id
    fetchEventRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchEventSuccess(state, action: PayloadAction<Event>) {
      state.selected = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchEventFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Create
    createEventRequest(state, _action: PayloadAction<CreateEventPayload | FormData>) {
      state.loading = true;
      state.error = null;
    },
    createEventSuccess(state, action: PayloadAction<Event>) {
      state.items = [action.payload, ...state.items];
      state.loading = false;
      state.error = null;
    },
    createEventFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update
    updateEventRequest(state, _action: PayloadAction<UpdateEventPayload>) {
      state.loading = true;
      state.error = null;
    },
    updateEventSuccess(state, action: PayloadAction<Event>) {
      state.items = state.items.map((e) =>
        e._id === action.payload._id ? action.payload : e
      );
      if (state.selected && state.selected._id === action.payload._id) {
        state.selected = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateEventFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete
    deleteEventRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteEventSuccess(state, action: PayloadAction<string>) {
      state.items = state.items.filter((e) => e._id !== action.payload);
      if (state.selected && state.selected._id === action.payload) {
        state.selected = null;
      }
      state.loading = false;
      state.error = null;
    },
    deleteEventFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Register
    registerForEventRequest(
      state,
      _action: PayloadAction<RegisterForEventPayload>
    ) {
      state.loading = true;
      state.error = null;
    },
    registerForEventSuccess(state, action: PayloadAction<Event>) {
      state.items = state.items.map((e) =>
        e._id === action.payload._id ? action.payload : e
      );
      if (state.selected && state.selected._id === action.payload._id) {
        state.selected = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    registerForEventFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Cancel Registration
    cancelRegistrationRequest(
      state,
      _action: PayloadAction<CancelRegistrationPayload>
    ) {
      state.loading = true;
      state.error = null;
    },
    cancelRegistrationSuccess(state, action: PayloadAction<Event>) {
      state.items = state.items.map((e) =>
        e._id === action.payload._id ? action.payload : e
      );
      if (state.selected && state.selected._id === action.payload._id) {
        state.selected = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    cancelRegistrationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Utilities
    setSelectedEvent(state, action: PayloadAction<Event | null>) {
      state.selected = action.payload;
    },
    clearEventsError(state) {
      state.error = null;
    },
  },
});

export const {
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
  setSelectedEvent,
  clearEventsError,
} = eventsSlice.actions;

export default eventsSlice.reducer;
