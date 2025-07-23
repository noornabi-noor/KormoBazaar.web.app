# Micro Tasking and Earning Platform - Client

This is the frontend (React) of the Micro Tasking and Earning Platform, inspired by platforms like Picoworkers and Clickworker. It supports role-based access for **Workers**, **Buyers**, and **Admins**.

---

## 🚀 Live Demo

> 🔗 [Live Website](https://kormo-bazaar.web.app)

---

## 📂 Project Structure

- `pages/` – All routes and components for Home, Dashboard, etc.
- `components/` – Reusable UI components (e.g. Navbar, Footer).
- `hooks/` – Custom React hooks including `useAuth` and `useAxiosSecure`.
- `layouts/` – Basic and Dashboard layouts.
- `context/` – Authentication and Role-based context.
- `routes/` – Protected Routes and Role Middleware.

---

## 👤 Roles and Features

### 🧑 Worker
- View & complete tasks
- Submit proofs
- Track submissions
- Withdraw coins

### 💼 Buyer
- Create and manage tasks
- Review submissions
- Approve/Reject work
- Purchase coins via Stripe
- View payment history

### 🛡️ Admin
- Manage users
- Approve withdrawal requests
- Delete tasks
- Oversee platform stats

---

## ✨ Features

- 🔐 Firebase Authentication (Email/Password, Google)
- 🧩 Role-Based Access Control (RBAC)
- ⚙️ Dynamic Dashboard (based on roles)
- 💳 Stripe Payment Integration
- 📸 Image Upload via imgBB
- 🔔 Real-Time Notifications
- 🧮 Coin Logic: 1$ = 10 Coins (Purchase), 20 Coins = 1$ (Withdraw)
- 📃 Pagination on My Submissions
- 🎠 Animated Home Page with Swiper Slider
- 💬 Static Testimonials and Top Workers

---

## 🧪 Tech Stack

- **React**
- **React Router DOM**
- **Tailwind CSS**
- **Firebase**
- **Axios**
- **Swiper.js**
- **React Hook Form**
- **React Query / TanStack Query**
- **Stripe (Client)**

---

## 🛠️ Installation & Setup

```bash
git clone https://github.com/your-client-repo.git
cd client
npm install

```
---

## Create .env file in client/ with:

- VITE_API_URL=https://your-server-url.vercel.app
- VITE_IMGBB_KEY=your_imgbb_key
- VITE_FIREBASE_API_KEY=your_firebase_key
- VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
- ...

---

## Run the project:

```bash
npm run dev

```
---

## 🧑‍💻 Developer Shortcuts
- 🔗 Join as Developer links to client GitHub repo.

- ⚙️ useAxiosSecure for secured Axios with token.

- 🛡️ PrivateRoute and Role-based Routes are implemented.

---