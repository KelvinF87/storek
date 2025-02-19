import { useState, useEffect } from "react";
import axios from "axios";

const URL_API = import.meta.env.VITE_URL_APIR || import.meta.env.VITE_URL_APIK;

export const useInventory = (initialEndpoint = "productos") => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
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

  const getAvailableQuantity = (id) => {
    const inventoryItem = data.find(item => item.id === id);
    return inventoryItem ? inventoryItem.quantity : 0;
  };

  return { data, setData, loading, setLoading, endpoint, setEndpoint, error, getAvailableQuantity };
};
