import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);


      // ✅ Use placeholder image and change it when ever you add a new product
      const imageUrl = "https://i.ibb.co/mrfW1C58/240-F-1097119702-g-Xd3h-YA1-I15i-Vl3f-Gu-D6-N51-DGVk41-Rn-E.jpg"; // ✅ Your real image use ibb


      await addDoc(collection(db, "products"), {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        rating: Number(formData.rating),
        imageUrl,
      });

      alert("Product added successfully!");
      setFormData({ name: "", price: "", quantity: "", rating: "" });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Add New Product</h1>

      <form

        onSubmit={handleSubmit}

        className="bg-white dark:bg-slate-900 text-black dark:text-white p-6 rounded-lg shadow-md max-w-md"

      >
        <h2 className="text-xl font-semibold mb-4">Create New Customer</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mb-3 w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="mb-3 w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400" />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="mb-3 w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1–10)"
          value={formData.rating}
          onChange={handleChange}
          required
          className="mb-3 w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
