/**
 * useApi — lightweight data-fetching hook.
 *
 * Returns { data, loading, error, refetch }.
 * Automatically calls `api.get(endpoint, params)` on mount / dep change.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { get } from "./api";

export default function useApi(endpoint, params = null, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await get(endpoint, params);
      if (mountedRef.current) {
        setData(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err);
        console.error(`[useApi] ${endpoint}:`, err);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [endpoint, JSON.stringify(params), ...deps]);

  useEffect(() => {
    mountedRef.current = true;
    if (endpoint) fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
