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
import jsPDF from "jspdf";

export default function BillingPage() {
  const [formData, setFormData] = useState({
    customer: "",
    products: [{ productId: "", quantity: 1 }],
    total: 0,
  });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMetaData();
    fetchBills();
  }, []);

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
    let total = 0;
    for (let item of formData.products) {
      const prod = products.find(p => p.id === item.productId);
      if (prod) total += prod.price * item.quantity;
    }
    setFormData(prev => ({ ...prev, total }));
  }, [formData.products, products]);

  const handleChange = (index, field, value) => {
    const updated = [...formData.products];
    updated[index][field] = field === "quantity" ? parseInt(value) : value;
    setFormData(prev => ({ ...prev, products: updated }));
  };

  const handleCustomerChange = (e) => {
    setFormData(prev => ({ ...prev, customer: e.target.value }));
  };

  const handleAddProductField = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { productId: "", quantity: 1 }]
    }));
  };

  const handleDeleteBill = async id => {
    if (confirm("Delete bill?")) {
      await deleteDoc(doc(db, "bills", id));
      fetchBills();
    }
  };

  const handleSubmit = async () => {
    const customer = customers.find(c => c.id === formData.customer);
    if (!customer) return alert("Select a valid customer");

    const items = formData.products
      .map(p => {
        const prod = products.find(pr => pr.id === p.productId);
        return prod ? { id: prod.id, name: prod.name, quantity: p.quantity, price: prod.price } : null;
      })
      .filter(Boolean);

    const payload = {
      customer: customer.name,
      phone: customer.phone || "",
      items,
      total: formData.total,
      date: new Date().toISOString(),
    };

    try {
      // Update inventory
      for (let item of items) {
        const productRef = doc(db, "products", item.id);
        const product = products.find(p => p.id === item.id);
        const updatedQty = (product.quantity || 0) - item.quantity;

        if (updatedQty < 0) {
          alert(`Not enough stock for ${item.name}`);
          return;
        }

        await updateDoc(productRef, { quantity: updatedQty });
      }

      if (editingId) {
        await updateDoc(doc(db, "bills", editingId), payload);
        setEditingId(null);
        alert("Bill updated");
      } else {
        await addDoc(collection(db, "bills"), payload);
        alert("Bill added");
      }

      setFormData({ customer: "", products: [{ productId: "", quantity: 1 }], total: 0 });
      fetchBills();
      fetchMetaData(); // refresh updated inventory
    } catch (error) {
      alert("Error saving bill or updating inventory");
      console.error(error);
    }
  };

  const generatePDF = (bill) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🧾 Invoice", 80, 20);
    doc.setFontSize(12);
    doc.text(`Customer: ${bill.customer}`, 20, 40);
    doc.text(`Date: ${new Date(bill.date).toLocaleString()}`, 20, 50);

    let y = 70;
    doc.text("Items:", 20, 60);
    bill.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}`,
        20,
        y
      );
      y += 10;
    });

    doc.text(`Total: ₹${bill.total}`, 20, y + 10);
    doc.save(`Invoice_${bill.customer}_${Date.now()}.pdf`);
  };

  return (
    <div className="p-6 text-slate-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Billing</h1>

      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-6 mb-8 max-w-xl">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Bill" : "Add Bill"}</h2>

        <select
          name="customer"
          value={formData.customer}
          onChange={handleCustomerChange}
          className="w-full mb-4 p-2 rounded text-black"
        >
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {formData.products.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={item.productId}
              onChange={e => handleChange(index, "productId", e.target.value)}
              className="w-2/3 p-2 rounded text-black"
            >
              <option value="">Select Product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input
              type="number"
              value={item.quantity}
              onChange={e => handleChange(index, "quantity", e.target.value)}
              className="w-1/3 p-2 rounded text-black"
              placeholder="Qty"
              min={1}
            />
          </div>
        ))}

        <button
          onClick={handleAddProductField}
          className="text-sm text-blue-500"
        >
          + Add another product
        </button>

        <input
          type="number"
          value={formData.total}
          readOnly
          className="w-full p-2 rounded text-black bg-slate-100 mb-4"
        />
        <br />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:opacity-60"
        >
          {editingId ? "Update Bill" : "Generate Bill"}
        </button>
      </div>
      <br />
      <h2 className="text-2xl font-semibold mb-4">All Bills</h2>
      <div className="space-y-4">
        {bills.map(bill => (
          <div
            key={bill.id}
            className="bg-white dark:bg-slate-900 text-black dark:text-white p-4 rounded-lg shadow border border-gray-200 dark:border-slate-700 flex justify-between items-start"
          >
            <p><strong>👤 Customer:</strong> {bill.customer}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <strong>📅 Date:</strong> {new Date(bill.date).toLocaleString()}
            </p>
            <ul className="list-disc ml-6">
              {bill.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} (x{item.quantity}) - ${item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2"><strong>💰 Total:</strong> ${bill.total}</p>

            <div className="mt-3 flex flex-wrap gap-3">
              <button
                onClick={() => handleDeleteBill(bill.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => generatePDF(bill)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
