import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { useDataFetch } from "./DataImport";

export default function ProductList({ onLogout }) {
  const { data, loading, setLoading, error, setEndpoint } = useDataFetch("productos");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOperationInProgress, setIsOperationInProgress] = useState(false); // Estado de carga
  const productsPerPage = 9;
  const URL_API = import.meta.env.VITE_URL_APIR;

  useEffect(() => {
    if (!loading && data) {
      setProducts(data);
    }
  }, [loading, data]);

  const handleCreate = async (newProduct) => {
    setIsOperationInProgress(true); // Operación en progreso
    try {
      const response = await fetch(`${URL_API}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      const createdProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, createdProduct]); // Actualiza el estado local
      setEndpoint("productos"); // Vuelve a cargar los datos desde la API

      // Espera al menos 2 segundos antes de finalizar la operación
      setTimeout(() => {
        setIsOperationInProgress(false); // Operación completada
      }, 2000);
    } catch (err) {
      setError("Error creating product");
      setIsOperationInProgress(false); // Operación completada
    }
  };

  const handleUpdate = async (updatedProduct) => {
    setIsOperationInProgress(true); // Operación en progreso
    try {
      const response = await fetch(`${URL_API}/productos/${updatedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      const updatedProductData = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProductData.id ? updatedProductData : product
        )
      ); // Actualiza el estado local
      setEndpoint("productos"); // Vuelve a cargar los datos desde la API
      setEditingProduct(null);

      // Espera al menos 2 segundos antes de finalizar la operación
      setTimeout(() => {
        setIsOperationInProgress(false); // Operación completada
      }, 1000);
    } catch (err) {
      setError("Error updating product");
      setIsOperationInProgress(false); // Operación completada
    }
  };

  const handleDelete = async (id) => {
    setIsOperationInProgress(true); // Operación en progreso
    try {
      const response = await fetch(`${URL_API}/productos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id)); // Actualiza el estado local
      setEndpoint("productos"); // Vuelve a cargar los datos desde la API

      // Espera al menos 2 segundos antes de finalizar la operación
      setTimeout(() => {
        setIsOperationInProgress(false); // Operación completada
      }, 1000);
    } catch (err) {
      setError("Error deleting product");
      setIsOperationInProgress(false); // Operación completada
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading || isOperationInProgress) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <ProductForm onSubmit={handleCreate} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {currentProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 shadow-md bg-white">
                  <img
                    src={product.imageSrc || "/placeholder.svg"}
                    alt={product.imageAlt}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-xl font-bold mb-2">{product.price}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {editingProduct && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white w-100 p-6 rounded-lg">
                  <ProductForm
                    product={editingProduct}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingProduct(null)}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastProduct >= products.length}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
