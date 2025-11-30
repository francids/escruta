import { useState, useEffect, useCallback } from "react";
import useCookie from "./useCookie";
import backendClient from "@/backend";
import { type AxiosRequestConfig, type AxiosResponse, AxiosError } from "axios";
import { AUTH_TOKEN_KEY } from "@/config";
import type { Token } from "@/interfaces";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | AxiosError | null;
}

interface UseFetchOptions<T> extends AxiosRequestConfig {
  onSuccess?: (data: T) => void;
  onError?: (error: Error | AxiosError) => void;
  cacheTime?: number;
  skipCache?: boolean;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: (forcedUpdate?: boolean) => Promise<void>;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<unknown>> = {};

function generateCacheKey(
  endpoint: string,
  options?: AxiosRequestConfig
): string {
  const { method = "GET", params, data } = options || {};
  return `${method}:${endpoint}:${JSON.stringify(
    params || {}
  )}:${JSON.stringify(data || {})}`;
}

export default function useFetch<T = unknown>(
  endpoint: string,
  options?: UseFetchOptions<T>,
  immediate: boolean = true
): UseFetchReturn<T> {
  const [token] = useCookie<Token>(AUTH_TOKEN_KEY);

  const cacheTime = options?.cacheTime ?? 5 * 60 * 1000;
  const cacheKey = generateCacheKey(endpoint, options);

  const [state, setState] = useState<UseFetchState<T>>(() => {
    const cached = cache[cacheKey];
    const isValid =
      cached &&
      Date.now() - cached.timestamp < cacheTime &&
      !options?.skipCache &&
      cacheTime > 0;

    return {
      data: isValid ? (cached.data as T) : null,
      loading: immediate && !isValid,
      error: null,
    };
  });

  const fetchData = useCallback(
    async (forcedUpdate = false) => {
      const skipCache = forcedUpdate || options?.skipCache || cacheTime <= 0;
      const cached = cache[cacheKey];
      const now = Date.now();

      if (!skipCache && cached && now - cached.timestamp < cacheTime) {
        setState({ data: cached.data as T, loading: false, error: null });
        options?.onSuccess?.(cached.data as T);
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response: AxiosResponse<T> = await backendClient({
          url: endpoint,
          ...options,
          headers: {
            Authorization: `Bearer ${token!.token}`,
            "Content-Type": "application/json",
            ...options?.headers,
          },
        });

        if (cacheTime > 0) {
          cache[cacheKey] = { data: response.data, timestamp: now };
        }

        setState({ data: response.data, loading: false, error: null });
        options?.onSuccess?.(response.data);
      } catch (error) {
        const errorObj =
          error instanceof AxiosError
            ? error
            : new Error(
                `An unexpected error occurred. Please try again. Error: ${error}`
              );

        setState({ data: null, loading: false, error: errorObj });
        options?.onError?.(errorObj);
      }
    },
    [endpoint, token, cacheTime, cacheKey]
  );

  useEffect(() => {
    if (immediate && !cache[cacheKey]) {
      fetchData(false);
    }
  }, [immediate, cacheKey, fetchData]);

  return { ...state, refetch: fetchData };
}

useFetch.clearCache = (cacheKey?: string) => {
  if (cacheKey) {
    delete cache[cacheKey];
  } else {
    Object.keys(cache).forEach((key) => delete cache[key]);
  }
};
