import { useState, useEffect } from "react";

export const useAddCar = () => {
	const [loadingCar, setLoadingCar] = useState(true);
	const [totalPagar, setTotalPagar] = useState(0);
	const [dataCar, setDataCar] = useState(() => {
		try {
			const storedData = JSON.parse(localStorage.getItem("LisCar")) || [];
			setLoadingCar(false);
			return storedData;
		} catch {
			setLoadingCar(false);
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem("LisCar", JSON.stringify(dataCar));
		// const subtotal = dataCar.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
		const subtotal = dataCar.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
		setTotalPagar(subtotal);
		// console.log(dataCar)
	}, [dataCar]);

	const addToCart = (product) => {
		setDataCar((prevData) => {
			const exists = prevData.find((item) => item.id === product.id);
			if (exists) {
				return prevData.map((item) =>
					// item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				item.id === product.id ? { ...item, quantity: item.quantity } : item
				);
			}
			return [...prevData, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (id) => {
		setDataCar((prevData) => prevData.filter((item) => item.id !== id));
	};

	const increaseQuantity = (id) => {
		setDataCar((prevData) =>
			prevData.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};

	const decreaseQuantity = (id) => {
		setDataCar((prevData) =>
			prevData.map((item) =>
				item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
			).filter((item) => item.quantity > 0)
		);
	};

	return { dataCar, setDataCar, addToCart, removeFromCart, loadingCar, totalPagar, setTotalPagar, increaseQuantity, decreaseQuantity };
};
