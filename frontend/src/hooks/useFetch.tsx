import { useState, useEffect, useCallback, useRef } from "react";
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
  const [token] = useCookie<{ token: string }>(AUTH_TOKEN_KEY);

  const cacheTime = options?.cacheTime ?? 5 * 60 * 1000;
  const cacheKey = useRef<string>(generateCacheKey(endpoint, options));

  useEffect(() => {
    cacheKey.current = generateCacheKey(endpoint, options);
  }, [endpoint, options]);

  const fetchData = useCallback(
    async (forcedUpdate: boolean): Promise<void> => {
      const currentCacheKey = cacheKey.current;
      const skipCache = forcedUpdate || options?.skipCache || cacheTime <= 0;

      const cachedItem = cache[currentCacheKey];
      const now = Date.now();

      if (!skipCache && cachedItem && now - cachedItem.timestamp < cacheTime) {
        setState({
          data: cachedItem.data as T,
          loading: false,
          error: null,
        });
        if (options?.onSuccess) {
          options.onSuccess(cachedItem.data as T);
        }
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const requestConfig: AxiosRequestConfig = {
          url: endpoint,
          ...options,
          headers: {
            Authorization: `Bearer ${token!.token}`,
          },
        };

        const response: AxiosResponse<T> = await backendClient(requestConfig);

        if (cacheTime > 0) {
          cache[currentCacheKey] = {
            data: response.data,
            timestamp: now,
          };
        }

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
    },
    [endpoint, options, token, cacheTime]
  );

  useEffect(() => {
    if (immediate) {
      fetchData(false);
    }
  }, [fetchData, immediate]);

  return {
    ...state,
    refetch: (forcedUpdate: boolean = false) => fetchData(forcedUpdate),
  };
}

useFetch.clearCache = (cacheKey?: string) => {
  if (cacheKey) {
    delete cache[cacheKey];
  } else {
    Object.keys(cache).forEach((key) => delete cache[key]);
  }
};

export default useFetch;
