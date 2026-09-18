import { useState, useEffect, useCallback } from 'react';

export default function useFetch(fetchFunction, initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      const extracted = result?.results || result;
      setData(extracted);
      return extracted;
    } catch (err) {
      setError(err?.message || 'Error fetching data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    let isMounted = true;

    const runFetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        if (isMounted) {
          const extracted = result?.results || result;
          setData(extracted);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Error fetching data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    runFetch();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction]);

  return { data, loading, error, refetch: executeFetch, setData };
}