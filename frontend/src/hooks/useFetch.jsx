import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const useFetch = ({ route, autoFetch = true, dependencies = [] }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_URL}${route}`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200 || res?.data?.success) {
        setData(res.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, ...dependencies]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetch;
