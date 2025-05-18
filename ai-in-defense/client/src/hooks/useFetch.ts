import { useState, useEffect } from "react";

export function useFetch<T>(fetcher: () => Promise<{ data: T }>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetcher()
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [fetcher]);

  return { data, loading, error };
}
