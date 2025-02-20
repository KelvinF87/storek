import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useAddCar } from "../Hooks/AddCar";
import { useNavigate } from "react-router";
import enviando from "../assets/Ok-enviado.gif";
import { useProducts } from "../Hooks/useProducts";
import { useDataFetch } from "../Hooks/DataImport";

const MONEDA = import.meta.env.VITE_MONEDA;

const CheckoutPage = () => {
	const navigate = useNavigate();
	const [showEnviando, setShowEnviando] = useState(false);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		cardName: "",
		cardNumber: "",
		expiryDate: "",
		cvv: ""
	});

	const {
		setDataCar,
		dataCar,
		removeFromCart,
		totalPagar,
		setTotalPagar,
		increseQuantity,
		decreaseQuantity,
	} = useAddCar();

	const { updateProduct } = useProducts("productos");
	const { data, refetch } = useDataFetch("productos");

	const total = useMemo(() => totalPagar, [totalPagar, dataCar]);
	const [hasRefreshed, setHasRefreshed] = useState(() => {
		// Inicializa el estado desde localStorage si existe, de lo contrario, usa false
		return localStorage.getItem('hasRefreshed') === 'true';
	});

	useEffect(() => {
		// Actualiza localStorage cuando hasRefreshed cambia
		localStorage.setItem('hasRefreshed', hasRefreshed);
	}, [hasRefreshed]);

	const handleRefresh = () => {
		if (!hasRefreshed) {
			refetch(); // Llama a la función refetch para actualizar los datos
			navigate(0); // Recarga la página
			setHasRefreshed(true); // Marca que la acción ya se ha ejecutado
		}
	};
	
	const handleReactiva =()=>{
		// refetch(); // Llama a la función refetch para actualizar los datos
		// navigate(0); // Recarga la página
		setHasRefreshed(false); // Marca que la acción ya se ha ejecutado

	}
	
	useEffect(() => {


		// Recuperar datos del localStorage al cargar la página
		const savedFormData = localStorage.getItem("checkoutFormData");
		if (savedFormData) {
			setFormData(JSON.parse(savedFormData));
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				setError(null);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [error]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));

		// Guardar datos en localStorage cada vez que cambia un input
		localStorage.setItem("checkoutFormData", JSON.stringify({
			...formData,
			[name]: value
		}));
	};

	const pagar = useCallback(async () => {

		setShowEnviando(true);
		setError(null);

		try {
			// await refetch();

			for (const product of dataCar) {
				const serverProduct = await data.find((miData) => miData.id === product.id);

				if (serverProduct) {
					if (serverProduct.quantity < product.quantity) {
						throw new Error(`No hay suficiente stock para el producto: ${serverProduct.name}`);
					}

					const updatedQuantity = serverProduct.quantity - product.quantity;
					const updatedProduct = { ...serverProduct, quantity: updatedQuantity };

					await updateProduct(updatedProduct);
				} else {
					throw new Error(`Producto con ID ${product.id} no encontrado.`);
				}
			}

			localStorage.removeItem("LisCar");
			localStorage.removeItem("checkoutFormData"); // Limpiar datos del formulario después del pago

			setTimeout(() => {
				setTotalPagar(0);
				setDataCar([]);
				setShowEnviando(false);
				navigate("/");
			}, 3500);
		} catch (err) {
			console.error(err);
			setError(err.message || "Error al procesar el pago. Por favor, inténtalo de nuevo.");
			setShowEnviando(false);
		}
		// console.log(data);
	}, [dataCar, data, updateProduct, refetch, navigate, setTotalPagar, setDataCar]);

	return (
		<div className="container-details">
			{showEnviando && (
				<div className="enviando-pago flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-40">
					<img src={enviando} alt="Enviando pago" className="w-32 h-32" />
				</div>
			)}

			{error && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-md z-50 transition-opacity duration-500 opacity-100">
					<p>{error}</p>
				</div>
			)}

			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl relative">
					<h1 className="text-2xl font-semibold mb-6 text-center">Checkout</h1>
					<div className="mb-6">
						<h2 className="text-lg font-semibold mb-4">Información de Pago</h2>
						<form>
							<div className="mb-4">
								<label className="block text-gray-700">Nombre en la Tarjeta</label>
								<input
									type="text"
									name="cardName"
									value={formData.cardName}
									onChange={handleInputChange}
									placeholder="Nombre en la tarjeta"
									className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700">Número de Tarjeta</label>
								<input
									type="text"
									name="cardNumber"
									value={formData.cardNumber}
									onChange={handleInputChange}
									placeholder="1234 5678 9012 3456"
									className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-4 flex space-x-4">
								<div className="w-1/2">
									<label className="block text-gray-700">Fecha de Expiración</label>
									<input
										type="text"
										name="expiryDate"
										value={formData.expiryDate}
										onChange={handleInputChange}
										placeholder="MM/YY"
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								<div className="w-1/2">
									<label className="block text-gray-700">CVV</label>
									<input
										type="text"
										name="cvv"
										value={formData.cvv}
										onChange={handleInputChange}
										placeholder="123"
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							</div>
						</form>
					</div>
					<div className="mb-6">
						<h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>
						<div className="bg-gray-50 p-4 rounded-lg">
							<p className="text-gray-700">Total: {total.toFixed(2)} {MONEDA}</p>
						</div>
					</div>
					<button
						type="button"
						onClick={pagar}
						onFocus={handleRefresh}
						onMouseEnter={handleRefresh}
						onMouseOut={handleReactiva}
						onBlur={handleReactiva}
						disabled={showEnviando}
						className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							showEnviando ? "opacity-50 cursor-not-allowed" : ""
						}`}
					>
						{showEnviando ? "Procesando..." : "Confirmar Pago"}
					</button>
				</div>
			</div>
			<aside className="aside-checkout">
				<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
					<div className="mt-8">
						{dataCar.length === 0 ? (
							<p className="text-center text-gray-500">El carrito está vacío</p>
						) : (
							<ul role="list" className="-my-6 divide-y divide-gray-200">
								{dataCar.map((product) => (
									<li key={product.id} className="flex py-6">
										<div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
											<img
												src={product.imageSrc}
												alt={product.imageAlt}
												className="h-full w-full object-cover"
											/>
										</div>
										<div className="ml-4 flex flex-1 flex-col">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<h3>{product.name}</h3>
												<p className="ml-4">{product.price} {MONEDA}</p>
											</div>
											<p className="mt-1 text-sm text-gray-500">{product.color}</p>
											<div className="flex flex-1 items-end justify-between text-sm">
												<div className="flex items-center">
													<span className="mx-2">
														Cantidad: {product.quantity} x {product.price} {MONEDA} ={" "}
														{(parseFloat(product.quantity) * parseFloat(product.price)).toFixed(2)}{" "}
														{MONEDA}
													</span>
												</div>
												<button
													onClick={() => removeFromCart(product.id)}
													className="font-medium text-red-600 hover:text-red-500"
												>
													Eliminar
												</button>
											</div>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</aside>
		</div>
	);
};

export default CheckoutPage;
