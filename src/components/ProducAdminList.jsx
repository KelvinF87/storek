import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { useProducts } from "../Hooks/useProducts";
const MONEDA = import.meta.env.VITE_MONEDA
export default function ProductList({ onLogout }) {
	const { data, loading, error, createProduct, updateProduct, deleteProduct } = useProducts("productos");
	const [products, setProducts] = useState([]);
	const [editingProduct, setEditingProduct] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [isOperationInProgress, setIsOperationInProgress] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
	const productsPerPage = 9;

	useEffect(() => {
		if (!loading && data) {
			setProducts(data);
		}
	}, [loading, data]);

	const handleCreate = async (newProduct) => {
		setIsOperationInProgress(true);
		try {
			await createProduct(newProduct);
			setTimeout(() => {
				setIsOperationInProgress(false);
				setIsModalOpen(false);
			}, 2000);
		} catch (err) {
			setError("Error creating product");
			setIsOperationInProgress(false);
		}
	};

	const handleUpdate = async (updatedProduct) => {
		setIsOperationInProgress(true);
		try {
			await updateProduct(updatedProduct);
			setEditingProduct(null);
			setTimeout(() => {
				setIsOperationInProgress(false);
			}, 2000);
		} catch (err) {
			setError("Error updating product");
			setIsOperationInProgress(false);
		}
	};

	const handleDelete = async (id) => {
		setIsOperationInProgress(true);
		try {
			await deleteProduct(id);
			setTimeout(() => {
				setIsOperationInProgress(false);
			}, 2000);
		} catch (err) {
			setError("Error deleting product");
			setIsOperationInProgress(false);
		}
	};

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

	// Filtrar productos en base al término de búsqueda
	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	if (error) return <div className="text-center text-red-500">{error}</div>;

	return (
		<div className="min-h-screen bg-gray-100 relative">
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between mt-auto items-center">
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
					<input
						type="text"
						placeholder="Buscar..."
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 p-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
					/>
					<div className="px-4 py-6 sm:px-0">
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
									<p className="text-xl font-bold mb-2">{product.price}{MONEDA} | Cantidad: {product.quantity}</p>
									<div className="mt-auto flex justify-between">
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
						<div className="flex justify-between mt-4">
							{filteredProducts.length > productsPerPage && (
								<button
									onClick={() => paginate(currentPage - 1)}
									disabled={currentPage === 1}
									className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
								>
									Previous
								</button>
							)}
							{filteredProducts.length > productsPerPage && (
								<button
									onClick={() => paginate(currentPage + 1)}
									disabled={indexOfLastProduct >= filteredProducts.length}
									className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
								>
									Next
								</button>
							)}
						</div>
					</div>
				</div>
			</main>
			<button
				onClick={() => setIsModalOpen(true)}
				className="fixed bottom-4 right-4 bg-orange-300 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
			>
				➕
			</button>
			{isModalOpen && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
					<div className="bg-white w-full max-w-md p-6 rounded-lg">
						<ProductForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
					</div>
				</div>
			)}
			{editingProduct && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
					<div className="bg-white w-full max-w-md p-6 rounded-lg">
						<ProductForm
							product={editingProduct}
							onSubmit={handleUpdate}
							onCancel={() => setEditingProduct(null)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}