import { useState, useCallback, useRef, useEffect } from "react";
import { ErrorHandler } from "./errorHandler";

// Async State Interface
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  success: boolean;
}

// Async Options
export interface AsyncOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
  errorContext?: string;
}

// Async Hook Return Type
export interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
  retry: () => Promise<T | null>;
}

// Main Async Hook
export function useAsync<T = any>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: AsyncOptions = {}
): UseAsyncReturn<T> {
  const {
    immediate = false,
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = false,
    successMessage,
    errorContext,
  } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const asyncFunctionRef = useRef(asyncFunction);
  const lastArgsRef = useRef<any[]>([]);

  // Update function reference
  useEffect(() => {
    asyncFunctionRef.current = asyncFunction;
  }, [asyncFunction]);

  // Execute function
  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      lastArgsRef.current = args;

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        success: false,
      }));

      try {
        const result = await asyncFunctionRef.current(...args);

        setState((prev) => ({
          ...prev,
          data: result,
          loading: false,
          error: null,
          success: true,
        }));

        if (onSuccess) {
          onSuccess(result);
        }

        if (showSuccessToast && successMessage) {
          ErrorHandler.showSuccessToast(successMessage);
        }

        return result;
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error(String(error));

        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorObj,
          success: false,
        }));

        if (onError) {
          onError(errorObj);
        }

        if (showErrorToast) {
          ErrorHandler.handleApiError(errorObj, errorContext);
        }

        return null;
      }
    },
    [
      onSuccess,
      onError,
      showErrorToast,
      showSuccessToast,
      successMessage,
      errorContext,
    ]
  );

  // Reset state
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  // Retry last execution
  const retry = useCallback(async (): Promise<T | null> => {
    return execute(...lastArgsRef.current);
  }, [execute]);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
    retry,
  };
}

// Specific Async Hooks

// API Request Hook
export function useApiRequest<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: AsyncOptions = {}
) {
  return useAsync(apiFunction, {
    showErrorToast: true,
    errorContext: "API Request",
    ...options,
  });
}

// Form Submission Hook
export function useFormSubmission<T = any>(
  submitFunction: (data: any) => Promise<T>,
  options: AsyncOptions = {}
) {
  return useAsync(submitFunction, {
    showErrorToast: true,
    showSuccessToast: true,
    successMessage: "Form submitted successfully",
    errorContext: "Form Submission",
    ...options,
  });
}

// Data Fetching Hook
export function useDataFetching<T = any>(
  fetchFunction: (...args: any[]) => Promise<T>,
  options: AsyncOptions = {}
) {
  return useAsync(fetchFunction, {
    immediate: true,
    showErrorToast: true,
    errorContext: "Data Fetching",
    ...options,
  });
}

// File Upload Hook
export function useFileUpload<T = any>(
  uploadFunction: (file: File, ...args: any[]) => Promise<T>,
  options: AsyncOptions = {}
) {
  return useAsync(uploadFunction, {
    showErrorToast: true,
    showSuccessToast: true,
    successMessage: "File uploaded successfully",
    errorContext: "File Upload",
    ...options,
  });
}

// Multiple Async Operations Hook
export function useMultipleAsync<T extends Record<string, any>>(
  operations: {
    [K in keyof T]: (...args: any[]) => Promise<T[K]>;
  },
  options: AsyncOptions = {}
) {
  const [state, setState] = useState<{
    [K in keyof T]: AsyncState<T[K]>;
  }>({} as any);

  const execute = useCallback(
    async (operationKey: keyof T, ...args: any[]) => {
      setState((prev) => ({
        ...prev,
        [operationKey]: {
          ...prev[operationKey],
          loading: true,
          error: null,
          success: false,
        },
      }));

      try {
        const result = await operations[operationKey](...args);

        setState((prev) => ({
          ...prev,
          [operationKey]: {
            data: result,
            loading: false,
            error: null,
            success: true,
          },
        }));

        if (options.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error(String(error));

        setState((prev) => ({
          ...prev,
          [operationKey]: {
            ...prev[operationKey],
            loading: false,
            error: errorObj,
            success: false,
          },
        }));

        if (options.onError) {
          options.onError(errorObj);
        }

        if (options.showErrorToast !== false) {
          ErrorHandler.handleApiError(errorObj, options.errorContext);
        }

        return null;
      }
    },
    [operations, options]
  );

  const reset = useCallback((operationKey?: keyof T) => {
    if (operationKey) {
      setState((prev) => ({
        ...prev,
        [operationKey]: {
          data: null,
          loading: false,
          error: null,
          success: false,
        },
      }));
    } else {
      setState({} as any);
    }
  }, []);

  return {
    state,
    execute,
    reset,
  };
}

// Debounced Async Hook
export function useDebouncedAsync<T = any>(
  asyncFunction: (...args: any[]) => Promise<T>,
  delay: number = 500,
  options: AsyncOptions = {}
) {
  const [debouncedValue, setDebouncedValue] = useState<any[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedExecute = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(args);
      }, delay);
    },
    [delay]
  );

  const asyncResult = useAsync(asyncFunction, {
    ...options,
    immediate: false,
  });

  useEffect(() => {
    if (debouncedValue.length > 0) {
      asyncResult.execute(...debouncedValue);
    }
  }, [debouncedValue, asyncResult.execute]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    ...asyncResult,
    execute: debouncedExecute,
  };
}

export default useAsync;
