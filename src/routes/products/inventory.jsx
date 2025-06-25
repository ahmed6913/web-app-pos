import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function InventoryPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Product Inventory</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
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
              <p>⭐ <span className="font-medium">Rating:</span> {product.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
