import { useCallback } from "react";
import { ToastService } from "@/lib/services/toastService";

export const useToastNotifications = () => {
  const showSuccess = useCallback((message: string, title?: string) => {
    ToastService.success(message, title);
  }, []);

  const showError = useCallback((message: string, title?: string) => {
    ToastService.error(message, title);
  }, []);

  const showWarning = useCallback((message: string, title?: string) => {
    ToastService.warning(message, title);
  }, []);

  const showInfo = useCallback((message: string, title?: string) => {
    ToastService.info(message, title);
  }, []);

  const showNetworkError = useCallback(() => {
    ToastService.networkError();
  }, []);

  const showServerError = useCallback((message?: string) => {
    ToastService.serverError(message);
  }, []);

  const showValidationError = useCallback((message: string) => {
    ToastService.validationError(message);
  }, []);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showNetworkError,
    showServerError,
    showValidationError,
  };
};
