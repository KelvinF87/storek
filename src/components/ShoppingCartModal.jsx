'use client';

import { useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAddCar } from './AddCar';
import { useNavigate } from 'react-router-dom';

export default function ShoppingCartModal({ isOpen, onClose }) {
  const { dataCar, removeFromCart, totalPagar, setTotalPagar } = useAddCar();
  const navigate = useNavigate();

  useEffect(() => {
	console.log("desde el carro ", dataCar);
  }, [dataCar]);

  const subtotal = dataCar.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);

  useEffect(() => {
	setTotalPagar(subtotal);
	console.log("aPagar", totalPagar);
	console.log(subtotal)
  }, [subtotal, setTotalPagar,dataCar]);

  const procesarPago = (idCar) => {
	navigate(`/checkoutpage/${idCar}`);
  };

  return (
	<Dialog open={isOpen} onClose={onClose} className="relative z-10">
	  <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />

	  <div className="fixed inset-0 overflow-hidden">
		<div className="absolute inset-0 overflow-hidden">
		  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
			<DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
			  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
				<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
				  <div className="flex items-start justify-between">
					<DialogTitle className="text-lg font-medium text-gray-900">Carrito de Compras</DialogTitle>
					<div className="ml-3 flex h-7 items-center">
					  <button onClick={onClose} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
						<XMarkIcon className="size-6" aria-hidden="true" />
					  </button>
					</div>
				  </div>

				  <div className="mt-8">
					{dataCar.length === 0 ? (
					  <p className="text-center text-gray-500">El carrito está vacío</p>
					) : (
					  <ul role="list" className="-my-6 divide-y divide-gray-200">
						{dataCar.map((product) => (
						  <li key={product.id} className="flex py-6">
							<div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
							  <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover" />
							</div>

							<div className="ml-4 flex flex-1 flex-col">
							  <div className="flex justify-between text-base font-medium text-gray-900">
								<h3>{product.name}</h3>
								<p className="ml-4">{product.price}</p>
							  </div>
							  <p className="mt-1 text-sm text-gray-500">{product.color}</p>

							  <div className="flex flex-1 items-end justify-between text-sm">
								<p className="text-gray-500">Cantidad: {product.quantity}</p>
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

				{dataCar.length > 0 && (
				  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
					<div className="flex justify-between text-base font-medium text-gray-900">
					  <p>Subtotal</p>
					  <p>${subtotal.toFixed(2)}</p>
					</div>
					<p className="mt-0.5 text-sm text-gray-500">Los impuestos y el envío se calculan al finalizar la compra.</p>
					<div className="mt-6">
					  <button onClick={() => procesarPago(1)} className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 w-full text-white font-medium shadow-sm hover:bg-indigo-700">
						Proceder al pago
					  </button>
					</div>
					<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
					  <p>
						o{' '}
						<button onClick={onClose} className="font-medium text-indigo-600 hover:text-indigo-500">
						  Seguir comprando <span aria-hidden="true">→</span>
						</button>
					  </p>
					</div>
				  </div>
				)}
			  </div>
			</DialogPanel>
		  </div>
		</div>
	  </div>
	</Dialog>
  );
}
