import { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import imagen from "../assets/logoKupones.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDataFetch } from "../components/DataImport";
import { useAddCar } from "../components/AddCar";

export default function DetailsProducto() {
  const { data, loading, error } = useDataFetch("productos");
  const { addToCart } = useAddCar();
  const [miData, setMiData] = useState([]);
  const { productoid } = useParams();
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!loading && data) {
      setMiData(data);
    }
  }, [loading, data]);

  const handleAddToCart = (product) => {
    addToCart({
      price: product.price,
      id: product.id,
      name: product.name,
      imageSrc: product.imageSrc,
    });
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 3000);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  const producto = miData.find((producto) => producto.id === productoid);

  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="container-details">
      {showBanner && (
        <div className="z-100 fixed top-0 left-0 w-full bg-green-500 text-white text-center py-2">
          ¡Producto añadido al carrito!
        </div>
      )}
      <aside className="aside-container">
        <div className="card-img">
          <img src={producto.imageSrc} alt={producto.imageAlt} />
        </div>
      </aside>
      <div className="px-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold text-gray-900">
            Información del Producto
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detalles del producto.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Nombre</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                {producto.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Precio</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                {producto.price}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Color</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                {producto.color}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Descripción</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                {producto.description || "No hay descripción disponible."}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Adjuntos</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <PaperClipIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <button
            onClick={goBack}
            className="bg-white px-4 py-3 hover:bg-blue-200 text-black font-bold py-2"
          >
            ⬅️ Volver
          </button>
          {producto.quantity > 0 ? (
            <button
              className="btn-car block text-center mx-auto"
              onClick={() => handleAddToCart(producto)}
            >
              🛒➕
            </button>
          ) : (
            <button className=" block text-center mx-auto bg-red-200 p-1" >
              Agotado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
