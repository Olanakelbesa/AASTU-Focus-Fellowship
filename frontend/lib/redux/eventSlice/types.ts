export type EventCategory =
  | "worship"
  | "bible_study"
  | "prayer"
  | "fellowship"
  | "break_mission"
  | "outreach"
  | "training"
  | "other";

export type EventAttendanceStatus = "registered" | "attended" | "cancelled";

export interface EventAttendee {
  user: string; 
  registeredAt: string; 
  status: EventAttendanceStatus;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string; 
  startTime: string; 
  endTime: string; 
  location: string;
  category: EventCategory;
  maxAttendees: number | null;
  currentAttendees: number;
  image: string | null;
  isActive: boolean;
  isPublic: boolean;
  createdBy: string; 
  attendees: EventAttendee[];
  tags: string[];

  createdAt: string; 
  updatedAt: string; 

  // Virtuals (may or may not be present in API responses)
  isFull?: boolean;
  isUpcoming?: boolean;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  date: string; 
  startTime: string;
  endTime: string;
  location: string;
  category: EventCategory;
  maxAttendees?: number | null;
  image?: string | null;
  isActive?: boolean;
  isPublic?: boolean;
  tags?: string[];
}

export interface UpdateEventPayload extends Partial<CreateEventPayload> {
  _id: string;
}

export interface RegisterForEventPayload {
  eventId: string;
}

export interface CancelRegistrationPayload {
  eventId: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface FetchEventsParams {
  page?: number;
  limit?: number;
  category?: string;
  upcoming?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface EventsState {
  items: Event[];
  loading: boolean;
  error: string | null;
  selected?: Event | null;
  pagination: PaginationMeta | null;
}

