import { RootState } from "@/lib/redux/store";
import type { Event } from "./types";

export const selectEventsState = (state: RootState) => state.events;

export const selectEvents = (state: RootState): Event[] => state.events.items;

export const selectEventsLoading = (state: RootState): boolean =>
  state.events.loading;

export const selectEventsError = (state: RootState): string | null =>
  state.events.error;

export const selectSelectedEvent = (
  state: RootState
): Event | null | undefined => state.events.selected;

export const selectEventById =
  (id: string) =>
  (state: RootState): Event | undefined =>
    state.events.items.find((e) => e._id === id);
