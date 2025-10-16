// Centralized app constants
// Backend base URL. http://localhost:8080 Override via Vite env: VITE_BACKEND_BASE_URL
export const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "https://backend-nm1z.onrender.com";

// Helper to build API URLs consistently
export const apiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BACKEND_BASE_URL}${normalizedPath}`;
};
