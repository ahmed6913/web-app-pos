import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function BillingPage() {
  const [formData, setFormData] = useState({
    customer: "",
    productId: "",
    quantity: 1,
    total: 0,
  });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchMetaData = async () => {
    const customerSnap = await getDocs(collection(db, "customers"));
    const productSnap = await getDocs(collection(db, "products"));
    setCustomers(customerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setProducts(productSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchBills = async () => {
    const snap = await getDocs(collection(db, "bills"));
    setBills(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    const product = products.find(p => p.id === formData.productId);
    const total = product ? product.price * formData.quantity : 0;
    setFormData(prev => ({ ...prev, total }));
  }, [formData.productId, formData.quantity, products]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "quantity" ? parseInt(value) : value }));
  };

  const handleSubmit = async () => {
    const product = products.find(p => p.id === formData.productId);
    const customer = customers.find(c => c.id === formData.customer);
    if (!product || !customer) return alert("Select valid customer and product");

    const payload = {
      customer: customer.name,
      product: product.name,
      quantity: formData.quantity,
      total: formData.total,
      date: new Date().toISOString(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "bills", editingId), payload);
        setEditingId(null);
        alert("Bill updated");
      } else {
        await addDoc(collection(db, "bills"), payload);
        alert("Bill added");
      }

      setFormData({ customer: "", productId: "", quantity: 1, total: 0 });
      fetchBills();
    } catch (error) {
      alert("Error saving bill");
      console.error(error);
    }
  };

  const handleEdit = bill => {
    const prod = products.find(p => p.name === bill.product);
    const cust = customers.find(c => c.name === bill.customer);

    setFormData({
      customer: cust?.id || "",
      productId: prod?.id || "",
      quantity: bill.quantity,
      total: bill.total,
    });
    setEditingId(bill.id);
  };

  const handleDelete = async id => {
    if (confirm("Delete bill?")) {
      await deleteDoc(doc(db, "bills", id));
      fetchBills();
    }
  };

  useEffect(() => {
    fetchMetaData();
    fetchBills();
  }, []);

  return (
    <div className="p-6 text-slate-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Billing</h1>

      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-6 mb-8 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Bill" : "Add Bill"}</h2>

        <select
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded text-black"
        >
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded text-black"
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full mb-3 p-2 rounded text-black"
        />

        <input
          type="number"
          name="total"
          value={formData.total}
          readOnly
          className="w-full mb-4 p-2 rounded text-black bg-slate-100"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:opacity-60"
        >
          {editingId ? "Update Bill" : "Add Bill"}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">All Bills</h2>
      <div className="space-y-4">
        {bills.map(bill => (
          <div
            key={bill.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow"
          >
            <p><span className="font-semibold">👤 Customer:</span> {bill.customer}</p>
            <p><span className="font-semibold">🛒 Product:</span> {bill.product}</p>
            <p><span className="font-semibold">📦 Quantity:</span> {bill.quantity}</p>
            <p><span className="font-semibold">💰 Total:</span> ${bill.total}</p>
<br />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Date:</span> {new Date(bill.date).toLocaleString()}
            </p>

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleEdit(bill)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bill.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
