import { useState, useEffect } from "react";

export const useAddCar = () => {
  const [loadingCar, setLoadingCar] = useState(true);
  const [totalPagar, setTotalPagar] = useState(null);
  const [dataCar, setDataCar] = useState(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("LisCar")) || [];
      setLoadingCar(false); // Establecer loadingCar en false después de cargar los datos
      return storedData;
    } catch {
      setLoadingCar(false); // Establecer loadingCar en false en caso de error
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("LisCar", JSON.stringify(dataCar));
  }, [dataCar]);

  const addToCart = (product) => {
    setDataCar((prevData) => {
      const exists = prevData.find((item) => item.id === product.id);
      if (exists) {
        return prevData.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevData, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setDataCar((prevData) => prevData.filter((item) => item.id !== id));
  };

  return { dataCar, setDataCar, addToCart, removeFromCart, loadingCar, totalPagar, setTotalPagar };
};
