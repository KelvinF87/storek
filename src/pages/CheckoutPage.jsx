import React, { useEffect, useState } from "react";
import { useAddCar } from "../Hooks/AddCar";
import { useNavigate } from "react-router";
import enviando from "../assets/Ok-enviado.gif";
import { useProducts } from "../Hooks/useProducts";
import { useDataFetch } from "../Hooks/DataImport";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [showEnviando, setShowEnviando] = useState(false);
  const [error, setError] = useState(null);
  const {
    setDataCar,
    dataCar,
    removeFromCart,
    totalPagar,
    setTotalPagar,
    increaseQuantity,
    decreaseQuantity,
  } = useAddCar();
  const { data, setData, loading, setLoading } = useDataFetch("productos");
  const [total, setTotal] = useState(0);

  const { updateProduct } = useProducts("productos");

  useEffect(() => {
    setTotal(totalPagar);
    console.log("el total ", parseFloat(totalPagar));
  }, [totalPagar, dataCar]);

  const pagar = async () => {
    setShowEnviando(true);
    setError(null);

    try {
      // Actualizar la cantidad de cada producto en el carrito
      for (const product of dataCar) {
        // Buscar el producto en los datos del servidor
        const serverProduct = data.find((miData) => miData.id === product.id);

        if (serverProduct) {
          // Calcular la nueva cantidad restando la cantidad vendida
          const updatedQuantity = serverProduct.quantity - product.quantity;

          // Crear un objeto con la nueva cantidad
          const updatedProduct = {
            ...serverProduct,
            quantity: updatedQuantity,
          };

          // Enviar la actualización al servidor
          await updateProduct(updatedProduct);
        }
      }

      // Vaciar el carrito en el almacenamiento local
      localStorage.removeItem("LisCar");

      setTimeout(() => {
        setTotalPagar(0);
        setTotal(0);
        setDataCar([]);
        setShowEnviando(false);
        navigate("/");
      }, 3500);
    } catch (err) {
      setError("Error al procesar el pago. Por favor, inténtalo de nuevo.");
      setShowEnviando(false);
    }
  };

  return (
    <div className="container-details">
      {showEnviando && (
        <div className="enviando-pago">
          <img src={enviando} alt="Enviando pago" />
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-semibold mb-6 text-center">Checkout</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Información de Pago</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Nombre en la Tarjeta
                </label>
                <input
                  type="text"
                  placeholder="Nombre en la tarjeta"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Número de Tarjeta</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700">
                    Fecha de Expiración
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">CVV</label>
                  <input
                    type="text"
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
              <p className="text-gray-700">Total: {total.toFixed(2)}€</p>
            </div>
          </div>
          <button
            type="button"
            onClick={pagar}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Confirmar Pago
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
                        <p className="ml-4">{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>

                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center">
                          <span className="mx-2">Cantidad: {product.quantity} x {product.price} = {parseFloat(product.quantity) * parseFloat(product.price)}  </span>
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
