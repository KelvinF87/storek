"use client"

import { useState, useEffect } from "react"
import ProductForm from "./ProductForm"

export default function ProductList({ onLogout }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/productos")
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data)
      setIsLoading(false)
    } catch (err) {
      setError("Error fetching products")
      setIsLoading(false)
    }
  }

  const handleCreate = async (newProduct) => {
    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })
      if (!response.ok) {
        throw new Error("Failed to create product")
      }
      fetchProducts()
    } catch (err) {
      setError("Error creating product")
    }
  }

  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${updatedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      })
      if (!response.ok) {
        throw new Error("Failed to update product")
      }
      fetchProducts()
      setEditingProduct(null)
    } catch (err) {
      setError("Error updating product")
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete product")
      }
      fetchProducts()
    } catch (err) {
      setError("Error deleting product")
    }
  }

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
              {products.map((product) => (
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
          </div>
        </div>
      </main>
    </div>
  )
}

