import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "customers"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "customers", id));
      alert("Customer deleted");
      fetchCustomers();
    } catch (error) {
      alert("Failed to delete customer.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-6 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">All Customers</h1>

      {customers.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No customers found.</p>
      ) : (
        <div className="space-y-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white dark:bg-slate-900 text-black dark:text-white p-4 rounded-lg shadow border border-gray-200 dark:border-slate-700 flex justify-between items-start"
            >
              <div className="space-y-1">
                <p><span className="font-semibold">👤 Name:</span> {customer.name}</p>
                <p><span className="font-semibold">📧 Email:</span> {customer.email}</p>
                <p><span className="font-semibold">📞 Phone:</span> {customer.phone}</p>
                <p><span className="font-semibold">💼 Wallet:</span> {customer.walletAddress}</p>
              </div>
              <button
                onClick={() => handleDelete(customer.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
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
