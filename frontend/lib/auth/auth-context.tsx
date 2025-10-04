"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "@/lib/redux/authSlice/selector";
import { logout, setUser, refreshTokenRequest } from "@/lib/redux/authSlice";
import { TokenManager } from "@/lib/api";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);

  const isAdmin = user?.role === "admin";

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      const token = TokenManager.getToken();
      const userData = localStorage.getItem("auth_user");

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          dispatch(setUser(parsedUser));

          // Check if token is still valid
          if (TokenManager.isTokenValid()) {
            // Token is valid, user is authenticated
          } else {
            // Token expired, try to refresh
            dispatch(refreshTokenRequest());
          }
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("auth_user");
          TokenManager.removeToken();
        }
      } else {
        // No stored auth data
        dispatch(setUser(null));
      }
    };

    initializeAuth();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth_user");
    TokenManager.removeToken();
    router.push("/login");
  };

  const handleRefreshToken = async () => {
    dispatch(refreshTokenRequest());
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    error,
    login: async () => {
      // Login is handled by Redux saga, this is just for interface compatibility
      throw new Error("Use Redux loginRequest action instead");
    },
    logout: handleLogout,
    refreshToken: handleRefreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
