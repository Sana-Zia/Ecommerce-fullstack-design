# 🛒 Full-Stack Ecommerce Product System

A professional-grade ecommerce platform architected for scalability and modern user experiences. This project bridges a high-performance **React (Vite)** frontend with a **Django REST Framework** backend, powered by a **Supabase (PostgreSQL)** cloud database.

> [!IMPORTANT]
> **Project Status: Under Active Development.** This platform is a work-in-progress. Current focus is on finalizing the core transactional engine and enhancing the UI/UX depth.

---

## 🔷 Development Philosophy & Architecture

This project is architected using industry-standard planning phases to ensure a robust decoupled structure:
* **Requirement Analysis:** Mapping user journeys from product discovery to secure checkout.
* **Feature Decomposition:** Breaking the application into manageable, testable micro-modules.
* **Architecture Design:** Implementing a "Headless" structure where the React frontend and Django backend scale independently.

---

## 🛠️ Tech Stack (The Professional Choice)

The project utilizes a modern, decoupled stack to ensure high performance and developer efficiency.

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | High-speed, component-based UI |
| **Styling** | TailwindCSS | Clean, modern, and utility-first responsive design |
| **Backend** | Django + DRF | Industrial-strength RESTful API logic |
| **Database** | Supabase (Postgres) | Cloud-hosted relational data storage |
| **Authentication** | SimpleJWT | Token-based secure user management |



---

## ✅ Core Features & Functionalities

### 🛡️ Secure Authentication System
* **JWT-Based Auth:** Integrated Django SimpleJWT for secure, stateless sessions.
* **Persistent Login:** Global `AuthContext` ensures user sessions remain active across browser refreshes.
* **Dynamic Profile Management:** Real-time user data fetching from the backend for personalized dashboards.

### 📦 Inventory & Product Engine
* **Advanced CRUD Operations:** Full administrative control over products and categories via a centralized Django Admin suite.
* **Relational Data Modeling:** Optimized PostgreSQL schema for products to ensure data integrity.
* **Real-World Imagery:** Integration of high-quality product assets to simulate a production environment.

### 🎨 Modern Storefront UI
* **Responsive UX:** Mobile-first design principles using **Tailwind CSS**.
* **Dynamic Data Flow:** Component-based architecture populated via RESTful API consumption.
* **Professional Layouts:** Organized UI sequence (Main Info → Tabs → Related Products).

---

## 📂 Design & Folder Structure

This project utilizes a **Monorepo** structure to ensure frontend and backend versions remain synchronized.

```text
├── frontend/             # React App (Vite + Tailwind)
│   ├── src/context/      # Global state (Auth, Cart)
│   ├── src/components/   # Modular UI components
│   ├── src/pages/        # Route Components (Home, Profile, Login)
│   └── src/api/          # Axios/Fetch configurations
├── backend/              # Django REST Framework
│   ├── users/            # Custom User models & Auth logic
│   ├── products/         # Product models, Views, and Serializers
│   └── core/             # Project Settings & API Routing
└── requirements.txt      # Backend dependencies

## 🚀 **Future Roadmap**

- [ ] **Search & Filter:** Implementation of fuzzy search and price/category filtering.
- [ ] **Persistent Cart:** Syncing local cart data with the backend database.
- [ ] **Stripe Integration:** Secure credit card processing and checkout flow.
- [ ] **Cloud Storage:** Migrating product media to Cloudinary or AWS S3.
- [ ] **Reviews:** User-generated ratings and feedback system.

---

## 🛠️ Installation & Setup

### 1. Backend Setup
```bash
cd backend
python -m venv .venv
# Activate: .venv\Scripts\activate (Win) OR source .venv/bin/activate (Mac)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### 2. Frontend Setup
```bash
cd frontend/ecommerce-frontend
npm install
npm run dev
```
---

### 📥 Version Control Workflow

```bash
git add .
git commit -m "docs: update readme"
git push origin main
```
