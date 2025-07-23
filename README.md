
---

## ✅ **Server Side – `README.md`**

```md
# Micro Tasking and Earning Platform - Server

This is the backend (Node.js + Express) for the Micro Tasking and Earning Platform, built to support Workers, Buyers, and Admins with secure APIs, Role-based access control, and dynamic coin economy.

---

## 🌐 API Base URL

> `https://your-server-url.vercel.app`

---

## 📁 Folder Structure

- `/routes` – API Routes for Users, Tasks, Payments, Submissions, etc.
- `/controllers` – Logic for each route
- `/middlewares` – Role and Token authorization
- `/models` – MongoDB Schemas (User, Task, Payment, Submission, Notification, Withdrawal)
- `/utils` – Helper functions (e.g., coin calculations)

---

## 🔐 Authentication & Authorization

- Firebase JWT Authentication
- Token verification middleware
- Role-based access (Worker / Buyer / Admin)
- Unauthorized requests return:
  - `401` – No token
  - `400` – Invalid token
  - `403` – Forbidden for current role

---

## 🔧 Main Features

- 🔐 Auth (Register, Login, Google Login)
- 📄 Task CRUD
- 📤 Submission System
- 📢 Notification System
- 💳 Stripe Payment Integration
- 💸 Coin Purchase & Withdrawals
- 🧑‍⚖️ Admin Tools
- 🧮 Smart Coin Logic
- 🧾 Payment History

---

## 🧠 Coin Economy

| Type    | Value                |
|---------|----------------------|
| Purchase | 1$ = 10 Coins       |
| Withdraw | 20 Coins = 1$       |
| Worker Bonus | 10 Coins (on signup) |
| Buyer Bonus | 50 Coins (on signup) |

---

## 🔧 Installation

```bash
git clone https://github.com/your-server-repo.git
cd server
npm install

```

## Run the project:

```bash
npm run dev

```