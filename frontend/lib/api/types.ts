// Base API Types
export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User extends BaseEntity {
  name: string;
  email: string;
  role: "admin" | "leader" | "member";
  department?: string;
  yearOfStudy?: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  department?: string;
  yearOfStudy?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface UpdateProfileRequest {
  name?: string;
  department?: string;
  yearOfStudy?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Event Types
export interface Event extends BaseEntity {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants?: number;
  currentParticipants: number;
  image?: string;
  category: string;
  isActive: boolean;
  createdBy: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants?: number;
  image?: string;
  category: string;
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  maxParticipants?: number;
  image?: string;
  category?: string;
  isActive?: boolean;
}

export interface EventRegistrationRequest {
  eventId: string;
  additionalInfo?: string;
}

// Team Types
export interface Team extends BaseEntity {
  name: string;
  description: string;
  leader: string;
  members: string[];
  maxMembers: number;
  isActive: boolean;
  createdBy: string;
}

export interface CreateTeamRequest {
  name: string;
  description: string;
  maxMembers: number;
}

export interface UpdateTeamRequest {
  name?: string;
  description?: string;
  maxMembers?: number;
  isActive?: boolean;
}

export interface JoinTeamRequest {
  teamId: string;
  message?: string;
}

// Content Types
export interface Content extends BaseEntity {
  title: string;
  content: string;
  type: "article" | "announcement" | "devotional" | "news";
  author: string;
  isPublished: boolean;
  tags: string[];
  featuredImage?: string;
}

export interface CreateContentRequest {
  title: string;
  content: string;
  type: "article" | "announcement" | "devotional" | "news";
  tags: string[];
  featuredImage?: string;
}

export interface UpdateContentRequest {
  title?: string;
  content?: string;
  type?: "article" | "announcement" | "devotional" | "news";
  tags?: string[];
  featuredImage?: string;
  isPublished?: boolean;
}

// Media Types
export interface Media extends BaseEntity {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  category: "image" | "video" | "audio" | "document";
}

export interface UploadMediaRequest {
  file: File;
  category: "image" | "video" | "audio" | "document";
}

// Contact Types
export interface Contact extends BaseEntity {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "responded" | "closed";
  response?: string;
  respondedBy?: string;
  respondedAt?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  contactId: string;
  response: string;
}

// Payment Types
export interface Donation extends BaseEntity {
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  message?: string;
  status: "pending" | "completed" | "failed";
  transactionId?: string;
  paymentMethod: string;
}

export interface DonationRequest {
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  message?: string;
  paymentMethod: string;
}

// Analytics Types
export interface AnalyticsDashboard {
  totalUsers: number;
  totalEvents: number;
  totalDonations: number;
  totalContacts: number;
  recentActivity: ActivityItem[];
  monthlyStats: MonthlyStats;
}

export interface ActivityItem {
  id: string;
  type:
    | "user_registered"
    | "event_created"
    | "donation_received"
    | "contact_submitted";
  description: string;
  timestamp: string;
  userId?: string;
}

export interface MonthlyStats {
  month: string;
  users: number;
  events: number;
  donations: number;
  contacts: number;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

// User List Types
export interface UserListParams extends PaginationParams {
  role?: string;
  department?: string;
  isActive?: boolean;
}

export interface UserListResponse extends PaginatedResponse<User> {}

// Event List Types
export interface EventListParams extends PaginationParams {
  category?: string;
  isActive?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

export interface EventListResponse extends PaginatedResponse<Event> {}

// Team List Types
export interface TeamListParams extends PaginationParams {
  isActive?: boolean;
  leader?: string;
}

export interface TeamListResponse extends PaginatedResponse<Team> {}

// Content List Types
export interface ContentListParams extends PaginationParams {
  type?: string;
  isPublished?: boolean;
  author?: string;
  tags?: string[];
}

export interface ContentListResponse extends PaginatedResponse<Content> {}

// Media List Types
export interface MediaListParams extends PaginationParams {
  category?: string;
  uploadedBy?: string;
}

export interface MediaListResponse extends PaginatedResponse<Media> {}

// Contact List Types
export interface ContactListParams extends PaginationParams {
  status?: string;
  respondedBy?: string;
}

export interface ContactListResponse extends PaginatedResponse<Contact> {}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}
