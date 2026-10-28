import { useState, useEffect, useCallback } from 'react';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(PICSUM_API_URL, { signal });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch photos from Picsum API (Status: ${response.status} ${response.statusText})`
        );
      }

      const data = await response.json();
      if (!signal?.aborted) {
        setPhotos(data);
        setError(null);
        setLoading(false);
      }
    } catch (err) {
      if (err.name === 'AbortError' || signal?.aborted) {
        return;
      }
      setError(
        err.message || 'An unexpected error occurred while fetching photos.'
      );
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPhotos(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchPhotos]);

  const refetch = useCallback(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, error, refetch };
}
