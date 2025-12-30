# ☢️ THE VOID MAP: Intel Management System

A full-stack **MERN** application designed for sector monitoring and intel database management. This system features a public-facing protocol map and a secure **Operator Dashboard** for CRUD operations on sensitive database entries.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, React Router 6, Vite, CSS3
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JWT (JSON Web Tokens) & LocalStorage management

---

## 🚀 Key Features
* **Secure Authentication:** Restricted access for authorized "Operator" accounts.
* **Real-time CRUD:** * **Create:** Generate new intel reports via the `NewReport` module.
    * **Read:** Live database feed of "Sectors" and "Intel Logs."
    * **Update/Delete:** Administrative "Purge" and edit capabilities for entries.
* **Dynamic UI:** Smart Navbar that toggles between `AUTHENTICATE` and `DASHBOARD` based on session status.
* **Protected Routes:** Frontend guards to prevent unauthorized database access.

---

