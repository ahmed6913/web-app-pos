// src/routes/settings/page.jsx

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const { user: currentUser } = useAuth();

  console.log("Current user in SettingsPage:", currentUser);

  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchSettings = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setCurrency(userSnap.data().currency || "USD");
        } else {
          await setDoc(userRef, { currency: "USD" });
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [currentUser]);

  const handleChange = async (e) => {
    const selected = e.target.value;
    setCurrency(selected);

    try {
      await setDoc(doc(db, "users", currentUser.uid), { currency: selected }, { merge: true });
    } catch (err) {
      console.error("Failed to update currency", err);
    }
  };

  if (!currentUser || loading) {
    return <div className="p-6 text-black dark:text-white">Loading settings...</div>;
  }

  return (
    <div className="p-6 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      <div className="bg-white dark:bg-slate-900 p-6 rounded border border-gray-300 dark:border-slate-700 max-w-md">
        <label className="block mb-2 font-medium"> Select Currency</label>
        <select
          value={currency}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black dark:bg-slate-800 dark:text-white"
        >
          <option value="USD">💵 USD ($)</option>
          <option value="EUR">💶 EUR (€)</option>
        </select>
      </div>
    </div>
  );
}
