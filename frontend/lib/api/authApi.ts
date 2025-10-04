import { apiClient, API_ROUTES, TokenManager } from "./index";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  User,
  ApiResponse,
} from "./types";

// Authentication API Service
export class AuthApiService {
  // Login user
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ROUTES.AUTH.LOGIN,
      credentials
    );

    // Store token and user data
    if (response.success && response.data) {
      TokenManager.setToken(response.data.token);
      this.storeUserData(response.data.user);
    }

    return response;
  }

  // Register user
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ROUTES.AUTH.REGISTER,
      userData
    );

    // Store token and user data
    if (response.success && response.data) {
      TokenManager.setToken(response.data.token);
      this.storeUserData(response.data.user);
    }

    return response;
  }

  // Register admin user
  static async registerAdmin(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ROUTES.AUTH.REGISTER_ADMIN,
      userData
    );

    // Store token and user data
    if (response.success && response.data) {
      TokenManager.setToken(response.data.token);
      this.storeUserData(response.data.user);
    }

    return response;
  }

  // Logout user
  static async logout(): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>(
        API_ROUTES.AUTH.LOGOUT
      );
      return response;
    } catch (error) {
      // Even if logout fails on server, clear local data
      console.warn("Logout request failed, clearing local data:", error);
    } finally {
      // Always clear local data
      this.clearUserData();
    }

    return { success: true, message: "Logged out successfully" };
  }

  // Get user profile
  static async getProfile(): Promise<ApiResponse<{ user: User }>> {
    return apiClient.get<ApiResponse<{ user: User }>>(API_ROUTES.USERS.PROFILE);
  }

  // Update user profile
  static async updateProfile(
    profileData: UpdateProfileRequest
  ): Promise<ApiResponse<{ user: User }>> {
    const response = await apiClient.put<ApiResponse<{ user: User }>>(
      API_ROUTES.USERS.UPDATE_PROFILE,
      profileData
    );

    // Update stored user data
    if (response.success && response.data) {
      this.storeUserData(response.data.user);
    }

    return response;
  }

  // Change password
  static async changePassword(
    passwordData: ChangePasswordRequest
  ): Promise<ApiResponse> {
    return apiClient.put<ApiResponse>(
      API_ROUTES.USERS.CHANGE_PASSWORD,
      passwordData
    );
  }

  // Refresh token (if implemented on backend)
  static async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ROUTES.AUTH.REFRESH_TOKEN
    );

    if (response.success && response.data) {
      TokenManager.setToken(response.data.token);
      this.storeUserData(response.data.user);
    }

    return response;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return TokenManager.isTokenValid();
  }

  // Get current user from storage
  static getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem("auth_user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  // Store user data in localStorage
  private static storeUserData(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_user", JSON.stringify(user));
    }
  }

  // Clear user data from localStorage
  private static clearUserData(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user");
    }
    TokenManager.removeToken();
  }

  // Initialize auth state from stored data
  static initializeAuth(): { user: User | null; isAuthenticated: boolean } {
    const token = TokenManager.getToken();
    const user = this.getCurrentUser();

    if (token && user && TokenManager.isTokenValid()) {
      return { user, isAuthenticated: true };
    } else {
      // Clear invalid stored data
      this.clearUserData();
      return { user: null, isAuthenticated: false };
    }
  }

  // Check if token is about to expire (within 5 minutes)
  static isTokenExpiringSoon(): boolean {
    const expiration = TokenManager.getTokenExpiration();
    if (!expiration) return false;

    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    return expiration - Date.now() < fiveMinutes;
  }

  // Auto-refresh token if needed
  static async autoRefreshToken(): Promise<boolean> {
    if (!this.isTokenExpiringSoon()) {
      return true; // Token is still valid
    }

    try {
      await this.refreshToken();
      return true;
    } catch (error) {
      console.warn("Token refresh failed:", error);
      this.clearUserData();
      return false;
    }
  }
}

// Export individual functions for easier usage
export const AuthApi = {
  login: AuthApiService.login,
  register: AuthApiService.register,
  registerAdmin: AuthApiService.registerAdmin,
  logout: AuthApiService.logout,
  getProfile: AuthApiService.getProfile,
  updateProfile: AuthApiService.updateProfile,
  changePassword: AuthApiService.changePassword,
  refreshToken: AuthApiService.refreshToken,
  isAuthenticated: AuthApiService.isAuthenticated,
  getCurrentUser: AuthApiService.getCurrentUser,
  initializeAuth: AuthApiService.initializeAuth,
  isTokenExpiringSoon: AuthApiService.isTokenExpiringSoon,
  autoRefreshToken: AuthApiService.autoRefreshToken,
};
