import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL_API = import.meta.env.VITE_URL_APIR;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL_API}/${endpoint}`);
      setData(response.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const createProduct = async (newProduct) => {
    try {
      const response = await axios.post(`${URL_API}/${endpoint}`, newProduct);
      setData((prevData) => [...prevData, response.data]);
    } catch (err) {
      throw new Error("Failed to create product");
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`${URL_API}/${endpoint}/${updatedProduct.id}`, updatedProduct);
      setData((prevData) =>
        prevData.map((product) =>
          product.id === response.data.id ? response.data : product
        )
      );
    } catch (err) {
      throw new Error("Failed to update product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${URL_API}/${endpoint}/${id}`);
      setData((prevData) => prevData.filter((product) => product.id !== id));
    } catch (err) {
      throw new Error("Failed to delete product");
    }
  };

  return { data, loading, error, createProduct, updateProduct, deleteProduct, setData };
};
