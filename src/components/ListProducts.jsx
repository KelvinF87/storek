import { useEffect, useState } from "react";
import { useDataFetch } from "./DataImport";
import { Link } from "react-router-dom";
import { useAddCar } from "./AddCar";

export default function ListProduct() {
  const { data, loading, error } = useDataFetch("productos");
  const [miData, setMiData] = useState([]);
  const { addToCart } = useAddCar();
  const [showBanner, setShowBanner] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    if (!loading && data) {
      setMiData(data);
    }
  }, [loading, data]);

  const handleAddToCart = (product) => {
    addToCart({ price: product.price, id: product.id, name: product.name, imageSrc: product.imageSrc });
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 3000);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = miData.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  return (
    <div className="bg-white">
      {showBanner && (
        <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-2 z-10">
          ¡Producto añadido al carrito!
        </div>
      )}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Ofertas</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {currentProducts.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
              <div className="flex flex-col items-center mt-2">
                <button className="btn-car" onClick={() => handleAddToCart(product)}>
                  🛒➕
                </button>
                <Link className="mt-2 text-center text-blue-500 underline" to={`/details/${product.id}`}>
                  Más detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Anterior
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastProduct >= miData.length}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
