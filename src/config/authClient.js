import axios from "axios";

export const SESSION_EXPIRED_EVENT = "auth:session-expired";

const SESSION_EXPIRED_CODE = "SESSION_EXPIRED";
let hasHandledSessionExpiry = false;

export const clearStoredSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
};

export const getStoredToken = () => localStorage.getItem("token");

const createSessionExpiredError = () => {
  const error = new Error("Session expired. Please log in again.");
  error.code = SESSION_EXPIRED_CODE;
  error.isSessionExpired = true;
  return error;
};

export const isSessionExpiryError = (error) =>
  Boolean(
    error?.isSessionExpired ||
      error?.code === SESSION_EXPIRED_CODE ||
      error?.response?.status === 401
  );

export const handleSessionExpiry = () => {
  clearStoredSession();
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));

  if (!hasHandledSessionExpiry) {
    hasHandledSessionExpiry = true;
    window.alert("Session expired. Please log in again.");

    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }

  return createSessionExpiredError();
};

export const authApi = axios.create();

authApi.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (!token) {
      return Promise.reject(handleSessionExpiry());
    }

    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      return Promise.reject(handleSessionExpiry());
    }

    return Promise.reject(error);
  }
);

export const authFetch = async (input, init = {}) => {
  const token = getStoredToken();

  if (!token) {
    throw handleSessionExpiry();
  }

  const headers = new Headers(init.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    throw handleSessionExpiry();
  }

  return response;
};
