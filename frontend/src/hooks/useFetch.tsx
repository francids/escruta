import { useState, useEffect, useCallback } from "react";
import useCookie from "./useCookie";
import backendClient from "../backend";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { AUTH_TOKEN_KEY } from "../config";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchOptions<T> extends AxiosRequestConfig {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => Promise<void>;
}

function useFetch<T = unknown>(
  endpoint: string,
  options?: UseFetchOptions<T>,
  immediate: boolean = true
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const [token] = useCookie(AUTH_TOKEN_KEY);

  const fetchData = useCallback(async (): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const requestConfig: AxiosRequestConfig = {
        url: endpoint,
        ...options,
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      };

      const response: AxiosResponse<T> = await backendClient(requestConfig);

      setState({
        data: response.data,
        loading: false,
        error: null,
      });

      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
    } catch (error) {
      const err = error as AxiosError<{ description?: string }>;
      const errorMessage =
        err.response?.data?.description || err.message || "An error occurred";

      const errorObj = new Error(errorMessage);

      setState({
        data: null,
        loading: false,
        error: errorObj,
      });

      if (options?.onError) {
        options.onError(errorObj);
      }
    }
  }, [endpoint, options, token.token]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    ...state,
    refetch: fetchData,
  };
}

export default useFetch;
