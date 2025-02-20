// src/Hooks/DataImport.js
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const URL_API = import.meta.env.VITE_URL_APIR || import.meta.env.VITE_URL_APIK;

export const useDataFetch = (initialEndpoint = "productos") => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [error, setError] = useState(null);

  // Definir la función fetchData con useCallback para evitar recreaciones innecesarias
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URL_API}/${endpoint}`);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
      throw err; // Re-lanzar el error para manejarlo en el componente si es necesario
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Ejecutar fetchData cuando el componente se monta o cuando cambie el endpoint
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Función refetch que puede ser llamada desde el componente
  const refetch = fetchData;

  return { data, setData, loading, setLoading, endpoint, setEndpoint, error, refetch };
};