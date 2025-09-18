import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const [token] = useCookie<Token>(AUTH_TOKEN_KEY);

  const memoizedCacheTime = useMemo(() => {
    return options?.cacheTime ?? 5 * 60 * 1000;
  }, [options?.cacheTime]);

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const cacheKey = useRef<string>(generateCacheKey(endpoint, options));
  useEffect(() => {
    cacheKey.current = generateCacheKey(endpoint, options);
  }, [endpoint, options]);

  const fetchData = useCallback(
    async (forcedUpdate: boolean): Promise<void> => {
      const currentOptions = optionsRef.current;
      const currentCacheKey = cacheKey.current;
      const effectiveCacheTime = memoizedCacheTime;

      const skipCache =
        forcedUpdate || currentOptions?.skipCache || effectiveCacheTime <= 0;

      const cachedItem = cache[currentCacheKey];
      const now = Date.now();

      if (
        !skipCache &&
        cachedItem &&
        now - cachedItem.timestamp < effectiveCacheTime
      ) {
        setState({
          data: cachedItem.data as T,
          loading: false,
          error: null,
        });
        if (currentOptions?.onSuccess) {
          currentOptions.onSuccess(cachedItem.data as T);
        }
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const requestConfig: AxiosRequestConfig = {
          url: endpoint,
          ...currentOptions,
          headers: {
            Authorization: `Bearer ${token!.token}`,
            "Content-Type": "application/json",
            ...(currentOptions?.headers || {}),
          },
        };

        const response: AxiosResponse<T> = await backendClient(requestConfig);

        if (effectiveCacheTime > 0) {
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

        if (currentOptions?.onSuccess) {
          currentOptions.onSuccess(response.data);
        }
      } catch (error) {
        let errorObj: Error | AxiosError;

        if (error instanceof AxiosError) {
          errorObj = error;
        } else {
          errorObj = new Error(
            `An unexpected error occurred. Please try again. Error: ${error}`
          );
        }

        setState({
          data: null,
          loading: false,
          error: errorObj,
        });

        if (currentOptions?.onError) {
          currentOptions.onError(errorObj);
        }
      }
    },
    [endpoint, token, memoizedCacheTime]
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
