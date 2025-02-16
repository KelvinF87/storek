import axios from "axios";
import { useState, useEffect } from "react";

const URL_API = "http://localhost:3000";

export const useDataFetch = (initialEndpoint = "productos") => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_API}/${endpoint}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, setData, loading, setLoading, endpoint, setEndpoint, error };
};
