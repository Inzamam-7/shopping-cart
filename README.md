# shopping-cart

# 🛒 Shopping Cart (MERN Stack)

A simple and functional **Shopping Cart web app** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
This app allows users to browse products, add them to a cart, adjust quantities, and securely checkout.  
After checkout, a digital **receipt** is generated and displayed on a separate page.

---

## 🚀 Features

- 🧾 **Product Listing:** Display all available products dynamically.
- 🛍️ **Cart Management:** Add, remove, or update quantities directly inside the cart.
- 💰 **Real-Time Totals:** Automatically calculates total quantity and total amount.
- 🧠 **Persistent State:** Uses Context API to manage cart state globally.
- 💳 **Checkout System:** Collects user details and generates a digital receipt.
- 📄 **Receipt Page:** Displays a summary of order details fetched from the backend.
- 🔔 **Toast Notifications:** User feedback for all key actions (add, remove, checkout).
- ⚙️ **Clean Folder Structure:** Backend and frontend separated for clarity.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, Tailwind CSS, React Router, Axios, React Toastify |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Tools | Git, Postman, VS Code |

---

## 📁 Folder Structure
shoppingCart/
│
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
├── server/ # Express Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
├── .gitignore
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Inzamam-7/shopping-cart.git
cd shopping-cart
2️⃣ Install dependencies
Install frontend dependencies
bash
Copy code
cd client
npm install
Install backend dependencies
bash
Copy code
cd ../server
npm install
3️⃣ Set up environment variables
Create a .env file inside the server/ folder and add:

env
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=5000
4️⃣ Run the project
Run backend
bash
Copy code
cd server
npm start
Run frontend
bash
Copy code
cd ../client
npm run dev
5️⃣ Visit in browser
Frontend: 👉 http://localhost:5173
Backend API: 👉 http://localhost:5000/api
