# Punjabi Rishtey - User Frontend

This repository houses the user-facing frontend for the **Punjabi Rishtey** matrimonial platform. It provides the customer portal for signing up, discovering profiles, managing memberships, reading success stories, and sending messages.

It interacts entirely with the **Punjabi Rishtey Backend**.

## 🚀 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4)
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Iconography:** Lucide React & React Icons
- **Components/Carousels:** React Slick

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js (v18+ recommended)
- A running instance of the Punjabi Rishtey Backend (default runs on port `8080`).

### Installation

1. **Clone the repository** and navigate to the frontend directory:
   ```bash
   cd punjabi-rishtey/user-frontend
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory. Configure Vite to point to your local or hosted backend.
   ```env
   # Local testing value
   VITE_BACKEND_BASE_URL=http://localhost:8080
   ```
   *Note: `src/config/constants.js` defaults to the production endpoint `https://backend-nm1z.onrender.com` if this variable is not provided.*

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Vite usually spins up the app on `http://localhost:5173`. Open your browser to view the application.

---

## 📜 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `vite` | Starts the Vite development server. |
| `npm run build` | `vite build` | Compiles the app for production deployment into `dist/`. |
| `npm run preview` | `vite preview` | Previews the local production build. |
| `npm run lint` | `eslint .` | Runs ESLint to catch formatting and potential code issues. |

---

## 📁 Folder Structure Overview

```
user-frontend/
├── public/                 # Static non-compiled assets and root HTML
├── src/
│   ├── assets/             # Images, SVGs, global styles
│   ├── components/         # Reusable React components & Page views
│   ├── config/             # Configuration variables (e.g., API URLs in constants.js)
│   ├── context/            # React Context Providers (e.g., AuthContext)
│   ├── App.jsx             # Main routing hub
│   ├── index.css           # Global Tailwind integrations
│   └── main.jsx            # React root mount point
├── .env.local              # Local environment variables (ignored by git)
├── vercel.json             # Configuration for Vercel deployment routing
└── vite.config.js          # Vite and Tailwind plugin config
```

---

## 🛠 Operational & Architecture Notes

### State & Auth Management
Authentication state (token and user data) and lifecycle (Login, Logout, Update) are globally administered by `AuthContext.jsx`. Sessions are persisted using `localStorage`.

### Routing Structure
Routing is declared centrally in `App.jsx`. Key routes include:
- `/` - Landing Page
- `/findpartner` - Main discovery area
- `/profile/:id` - Detailed user profiles
- `/membership` - Subscription plans
- `/login` / `/signup` - Auth flows

### API Integrations
All outbound API requests should consume the `apiUrl()` helper available in `src/config/constants.js`. This guarantees that paths are consistently appended to the correct environment variable (`VITE_BACKEND_BASE_URL`).

---

## ☁️ Deployment Notes

- **Platform:** Currently targetted for deployment on **Vercel**.
- **SPA Rewrite Behavior:** To ensure React Router functions properly without returning an HTTP `404 Not Found` upon browser refresh, we utilize `vercel.json` alongside our deployment explicitly telling Vercel to route all wildcards to `index.html`.
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
