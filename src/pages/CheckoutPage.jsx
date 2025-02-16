import React from 'react';

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6 text-center">Checkout</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Información de Pago</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre en la Tarjeta</label>
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
                <label className="block text-gray-700">Fecha de Expiración</label>
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
            <p className="text-gray-700">Total: $100.00</p>
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirmar Pago
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
