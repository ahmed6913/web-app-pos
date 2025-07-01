# 🧾 WebApp POS with NFT Rewards

A modern Point of Sale (POS) system with NFT-based customer rewards and an integrated NFT Marketplace — built for retail businesses looking to reward loyal customers with digital assets.

[🚀 Live Demo](https://webapp-pos.vercel.app/) • [🌐 NFT Marketplace](https://nft-marketplace.vercel.app/)
*Built with React, Firebase, Tailwind, Thirdweb, jsPDF, and more.*

---

## 📸 Preview

> *Note: You can upload your screenshots later inside ****`public/screenshots/`****.*

---

## 🛠️ Tech Stack

---

## ✅ Features

* 🧑‍💼 Customer Management (Add/Edit/Delete)
* 📦 Product Inventory & Stock Management
* 🧾 Billing System with multi-product support
* 📄 PDF Invoice Generation using `jsPDF`
* 📲 Share Invoice via WhatsApp (via File.io link)
* 📊 Real-time Dashboard Analytics (from Firestore)
* 🪙 NFT Reward System for loyal customers
* 🛒 NFT Marketplace with Buy & Sell capabilities
* 🔐 Firebase Auth (for dashboard + billing security)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ahmed6913/web-app-pos.git
cd web-app-pos
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup `.env` File

Create a `.env` file at the root with the following:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-msg-id
VITE_FIREBASE_APP_ID=your-app-id
```

> 🔒 Keep your `.env` private! Never push it to GitHub.

### 4. Start Development Server

```bash
npm run dev
```

App will be available at [http://localhost:5173](http://localhost:5173)

---

## 📁 Folder Structure

```
src/
├── components/        # Reusable UI components
├── contexts/          # Auth context
├── firebase/          # Firebase config
├── pages/             # POS views (Billing, Products, Dashboard)
├── marketplace/       # NFT Marketplace frontend
├── utils/             # Helper functions
└── App.js             # Root component
```

---

## 🧐 Credits

Made with 💙 by [Shaikh Saim](https://github.com/ahmed6913)
Special thanks to OpenAI, Thirdweb, Firebase, and all open-source contributors.

---

## 📜 License

MIT – use it, improve it, scale it 🚀

---

## ✨ Coming Soon

* 📈 NFT Reward History
* 💳 Stripe / Razorpay Integration
* 📲 SMS Billing + OTP login
* 🌟 Loyalty Points Conversion to NFTs


