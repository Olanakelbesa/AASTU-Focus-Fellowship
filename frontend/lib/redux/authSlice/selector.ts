import { RootState } from "../store";

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsRegistered = (state: RootState) => state.auth.isRegistered;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

