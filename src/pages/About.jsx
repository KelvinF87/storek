import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailsProducto from "./pages/DetailsProducto";
import CheckoutPage from "./pages/CheckoutPage";
import Admin from "./pages/Admin";

function App() {
  const URL_API = import.meta.env.VITE_URL_APIR;
  const [notifica_Car, setNotiCar] = useState(0);
  const [carrito, setCarrito] = useState({});
  const [productos, setProductos] = useState({});
  const [endPoint, setEndPoint] = useState("productos");
  const [cargadoData, setCargandoData] = useState(true);
  const [showCartButton, setShowCartButton] = useState(true); // Nuevo estado

  useEffect(() => {
    const getDataDb = () => {
      axios
        .get(`${URL_API}/${endPoint}`)
        .then((response) => {
          setProductos(response.data);
          setCargandoData(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDataDb();
  }, [productos, endPoint]);

  return (
    <>
      <NavBar showCartButton={showCartButton} notifica_Car={notifica_Car} /> {/* Pasar el estado y notifica_Car a NavBar */}
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
                cargadoData,
              }}
            />
          }
        />
        <Route path="/dashboard" element={<Admin />} />
        <Route
          path="/details/:productoid"
          element={<DetailsProducto setShowCartButton={setShowCartButton} />} // Pasar el setState a DetailsProducto
        />
        <Route path="/checkoutpage/:idcar" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
