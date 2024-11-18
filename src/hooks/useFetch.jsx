import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const headers = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
            headers: 
            {Authorization: `Bearer ${headers}`}
        });
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, headers]);
  return { data, loading, error };
};

export default useFetch;
