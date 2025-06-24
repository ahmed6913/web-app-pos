import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function NewCustomerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    walletAddress: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async () => {
    try {
      await addDoc(collection(db, "customers"), formData);
      alert("Customer added successfully!");
      setFormData({ name: "", email: "", phone: "", walletAddress: "" });
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Failed to add customer.");
    }
  };

  return (
    <div className="p-6 text-slate-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">New Customer</h1>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md dark:shadow-slate-700 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Customer</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-3 w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-3 w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="mb-3 w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
        />
        <input
          type="text"
          name="walletAddress"
          placeholder="Wallet Address"
          value={formData.walletAddress}
          onChange={handleChange}
          className="mb-4 w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
        />
        <button
          onClick={handleAddCustomer}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition-all"
        >
          Add Customer
        </button>
      </div>
    </div>
  );
}
