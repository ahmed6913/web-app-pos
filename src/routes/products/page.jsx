import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted successfully.");
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-900 text-black dark:text-white p-4 rounded-lg shadow-md border border-gray-200 dark:border-slate-700"
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
              <p className="mb-1">💰 <span className="font-medium">Price:</span> ${product.price}</p>
              <p className="mb-1">📦 <span className="font-medium">Quantity:</span> {product.quantity}</p>
              <p className="mb-3">⭐ <span className="font-medium">Rating:</span> {product.rating}</p>

              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
