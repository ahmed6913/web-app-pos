# 🧾 WebApp POS with NFT Rewards

A modern Point of Sale (POS) system with NFT-based customer rewards and an integrated NFT Marketplace — built for retail businesses looking to reward loyal customers with digital assets.

*Built with React, Firebase, Tailwind, Thirdweb, jsPDF, and more.*

---

- Notion docs - https://www.notion.so/UG-Project-1f46368c9a0a806db0a0fc8fc5a43e2b?source=copy_link

---
## 📸 Preview

- Live (https://web-app-pos-1deda.web.app)

> ![image](https://github.com/user-attachments/assets/b65e44a1-f7a1-4084-a287-f025965cac9d)
> ![GitHub Repo stars](https://img.shields.io/github/stars/ahmed6913/web-app-pos?style=social)
![GitHub forks](https://img.shields.io/github/forks/ahmed6913/web-app-pos?style=social)



---

## 🛠️ Tech Stack

--- 
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
![Thirdweb](https://img.shields.io/badge/Thirdweb-000?style=for-the-badge&logo=thirdweb&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-E10098?style=for-the-badge&logo=ghost&logoColor=white)


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

App will be available at [http://localhost:3000) Most probably might be diffrent 

---

## 📁 Folder Structure

```
src/
├── assets/ # Static files (images, logos, icons)
├── constants/ # Static config and constants (routes, roles, enums)
├── contexts/ # Context Providers (Auth, Theme, etc.)
├── firebase/ # Firebase config and services
├── hooks/ # Custom React hooks (useAuth, useFirestore, etc.)
├── layouts/ # App layout wrappers (Sidebar, Navbar, etc.)
├── pages/ # All main app pages (Dashboard, Billing, Products)
├── routes/ # Centralized route definitions
├── utils/ # Utility/helper functions
├── App.jsx # Root component
├── main.jsx # Vite entry point
└── index.css # TailwindCSS/global styles
```

---

## 🧐 Credits

Made with 💙 by [Shaikh Saim](https://github.com/ahmed6913)
Special thanks to OpenAI, Thirdweb, Firebase, and all open-source contributors.

---

## 📜 License

MIT – don't use it, can improve it, scale it 🚀
copyright reserved by shaikh saim

---

## ✨ Coming Soon

* 📈 NFT Reward History
* 💳 Stripe / Razorpay Integration
* 📲 SMS Billing + OTP login
* 🌟 Loyalty Points Conversion to NFTs


