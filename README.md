# Fullstack Ecommerce Product System 🛒

A professional-grade ecommerce platform architected for scalability and modern user experiences. This project bridges a high-performance **React (Vite)** frontend with a **Django REST Framework** backend, powered by a **Supabase (PostgreSQL)** cloud database.

---

## 🔷 Development Philosophy & Roadmap
Before writing code, this project was architected using industry-standard planning phases:
1. **Requirement Analysis:** Understanding user flow from product discovery to checkout.
2. **Feature Decomposition:** Breaking the monolith into manageable, testable components.
3. **Architecture Design:** Choosing a decoupled Frontend/Backend structure for independent scaling and maintenance.

### ✅ Features Checklist
- [x] **Responsive UI:** Mobile-first design based on professional ecommerce standards.
- [x] **Product Detail System:** Vertical layout sequence (Main Info → Tabs → Related Products → Promo Banner).
- [x] **Monorepo Structure:** Unified version control for both Frontend and Backend.
- [ ] **Products CRUD:** Full Create, Read, Update, and Delete functionality for inventory management.
- [ ] **Search & Filter:** Advanced querying for product categories and attributes.
- [ ] **Auth System:** Secure JWT-based authentication via Supabase Auth.
- [ ] **Cart Management:** Local state persistence with backend synchronization.
- [ ] **Deployment:** CI/CD pipeline for Vercel (Frontend) and Render (Backend).

---

## 🏗 Overall Architecture (Industry-Style)

### Tech Stack (Professional Choice)
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | High-speed, component-based UI |
| **Styling** | TailwindCSS | Clean, modern, and responsive design |
| **Backend** | Django + DRF | Solid, secure RESTful API logic |
| **Database** | Supabase (Postgres) | Industrial cloud data storage |
| **Auth** | Supabase Auth | Secure, JWT-based user management |

---

## 📂 Design & Folder Structure
This project uses a **Monorepo** structure to ensure frontend and backend versions remain synchronized.

```text
├── frontend/             # React App (Vite + Tailwind)
│   ├── src/components/   # Modular UI (Tabs, Banners, Sidebars)
│   ├── src/pages/        # Dynamic Route Components (ProductDetail, etc.)
│   └── src/api/          # Axios/Fetch configurations
├── backend/              # Django REST Framework
│   ├── products/         # Models, Views, and Serializers
│   └── ecommerce_backend/# Project Settings & API Routing
└── .gitignore            # Clean commits (Excludes .venv & node_modules)
