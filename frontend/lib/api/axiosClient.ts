import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { API_CONFIG, apiRoutes, TokenManager } from ".";
import APIError from "./APIError";

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach token
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = TokenManager.getToken();
  if (token) {
    if (!config.headers) config.headers = new axios.AxiosHeaders();
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Include credentials for cookie-based authentication
  config.withCredentials = true;
  return config;
});

// Response interceptor: handle 401 and refresh token
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !(originalRequest as any)._retry &&
      TokenManager.getToken()
    ) {
      (originalRequest as any)._retry = true;
      try {
        // Attempt to refresh token using cookies
        const refreshResponse = await axios.post(
          apiRoutes.auth.refreshToken,
          {},
          {
            baseURL: API_CONFIG.BASE_URL,
            withCredentials: true,
          }
        );
        const newToken =
          refreshResponse.data?.token || refreshResponse.data?.data?.token;
        if (newToken) {
          TokenManager.setToken(newToken);
          if (!originalRequest.headers)
            originalRequest.headers = new axios.AxiosHeaders();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        TokenManager.removeToken();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    // Always throw APIError
    throw new APIError(
      (error.response?.data as any)?.message || error.message,
      String(error.response?.status || 500),
      (error.response?.data as any)?.error
    );
  }
);

export default axiosClient;
