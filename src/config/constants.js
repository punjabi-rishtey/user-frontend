// Centralized app constants
// Backend base URL. http://localhost:8080 Override via Vite env: VITE_BACKEND_BASE_URL
export const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "https://backend-nm1z.onrender.com";

export const SUPPORT_PHONE_NUMBER = "+91 73546 19960";
export const SUPPORT_PHONE_LINK = "tel:+917354619960";
export const SUPPORT_WHATSAPP_LINK = "https://wa.me/917354619960";

// Helper to build API URLs consistently
export const apiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BACKEND_BASE_URL}${normalizedPath}`;
};
