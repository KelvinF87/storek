import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Kupo-Next</h2>
            <p className="mb-4">Tu destino número uno para descubrir cupones y ofertas exclusivas.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-gray-300">Inicio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-300">Ofertas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-300">Contacto</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-gray-300">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-300">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-300">Instagram</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            {/* <p className="mb-4">Suscríbete para recibir las últimas ofertas y descuentos.</p> */}
            <form>
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-4 py-2 mb-4 text-gray-800"
              />
              {/* <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2"
              >
                Suscribirse
              </button> */}
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2025 Kupo-Next by Kelvin Familia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
