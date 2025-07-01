🧾 WebApp POS with NFT Rewards

A modern Point of Sale (POS) system with NFT-based customer rewards and an integrated NFT Marketplace — built for retail businesses looking to reward loyal customers with digital assets.

🚀 Live Demo • 🌐 NFT MarketplaceBuilt with React, Firebase, Tailwind, Thirdweb, jsPDF, and more.

📸 Preview




Note: You can upload your screenshots later inside public/screenshots/.


## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
![Thirdweb](https://img.shields.io/badge/Thirdweb-000?style=for-the-badge&logo=thirdweb&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-E10098?style=for-the-badge&logo=ghost&logoColor=white)







✅ Features

🧑‍💼 Customer Management (Add/Edit/Delete)

📦 Product Inventory & Stock Management

🧾 Billing System with multi-product support

📄 PDF Invoice Generation using jsPDF

📲 Share Invoice via WhatsApp (via File.io link)

📊 Real-time Dashboard Analytics (from Firestore)

�� NFT Reward System for loyal customers

🛒 NFT Marketplace with Buy & Sell capabilities

🔐 Firebase Auth (for dashboard + billing security)

📦 Getting Started

1. Clone the repo

git clone https://github.com/ahmed6913/web-app-pos.git
cd web-app-pos

2. Install dependencies

npm install

3. Setup .env file

Create a .env file at the root with the following:

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-msg-id
VITE_FIREBASE_APP_ID=your-app-id

🔒 Keep your .env private! Never push it to GitHub.

4. Start development server

npm run dev

App will be available at http://localhost:5173

📁 Folder Structure

src/
├── components/        # Reusable UI components
├── contexts/          # Auth context
├── firebase/          # Firebase config
├── pages/             # POS views (Billing, Products, Dashboard)
├── marketplace/       # NFT Marketplace frontend
├── utils/             # Helper functions
└── App.js             # Root component

🧐 Credits

Made with 💙 by Shaikh SaimSpecial thanks to OpenAI, Thirdweb, Firebase, and all open-source contributors.

📜 License

MIT – use it, improve it, scale it 🚀

✨ Coming Soon

📈 NFT Reward History

💳 Stripe / Razorpay Integration

📲 SMS Billing + OTP login

🌟 Loyalty Points Conversion to NFTs


