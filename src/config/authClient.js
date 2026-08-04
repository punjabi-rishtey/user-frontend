import axios from "axios";

export const SESSION_EXPIRED_EVENT = "auth:session-expired";

const SESSION_EXPIRED_CODE = "SESSION_EXPIRED";
const SESSION_REVOKED_CODE = "SESSION_REVOKED";
let hasHandledSessionExpiry = false;

export const clearStoredSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
};

export const getStoredToken = () => localStorage.getItem("token");

const createSessionExpiredError = (message = "Session expired. Please log in again.") => {
  const error = new Error(message);
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

const getSessionExpiryMessage = (error) => {
  const code = error?.response?.data?.code;
  const message = error?.response?.data?.message;

  if (code === SESSION_REVOKED_CODE || message?.includes("signed in elsewhere")) {
    return "You were signed out because this account is signed in on another device.";
  }

  return "Session expired. Please log in again.";
};

export const handleSessionExpiry = (error) => {
  const alertMessage = getSessionExpiryMessage(error);
  clearStoredSession();
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));

  if (!hasHandledSessionExpiry) {
    hasHandledSessionExpiry = true;
    window.alert(alertMessage);

    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }

  return createSessionExpiredError(alertMessage);
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
      return Promise.reject(handleSessionExpiry(error));
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
    let payload = null;
    try {
      payload = await response.clone().json();
    } catch {
      payload = null;
    }

    throw handleSessionExpiry({
      response: { status: 401, data: payload },
    });
  }

  return response;
};
