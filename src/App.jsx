import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import  DetailsProducto  from "./pages/DetailsProducto";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
	const URL_API = "http://localhost:3000";
	const [notifica_Car, setNotiCar] = useState(0);
	const [carrito, setCarrito] = useState({});
	const [productos, setProductos] = useState({});
	const [endPoint, setEndPoint] = useState("productos");
	const [cargadoData, setCargandoData]=useState(true)

	useEffect(() => {
		const getDataDb = () => {
			axios
				.get(`${URL_API}/${endPoint}`)
				.then((response) => {
					setProductos(response.data);
					setCargandoData(false)
				})
				.catch((error) => {
					console.log(error);
				});
		};
		getDataDb();
	}, [productos,endPoint]);
	return (
		<>
			<NavBar />
			<Routes>
				<Route
					path="/"
					element={
						<Header
							data={{
								carrito,
								setCarrito,
								productos,
								setProductos,
								endPoint,
								setEndPoint,
								cargadoData
							}}
						/>
					}
				/>
				<Route path="/details/:productoid"  element={<DetailsProducto/>} />
				<Route path="/checkoutpage/:idcar" element={<CheckoutPage />} /> 
			</Routes>
			<Footer />
		</>
	);
}

export default App;
