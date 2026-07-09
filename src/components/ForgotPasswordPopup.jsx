import PropTypes from "prop-types";
import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import {
  apiUrl,
  SUPPORT_PHONE_LINK,
  SUPPORT_PHONE_NUMBER,
  SUPPORT_WHATSAPP_LINK,
} from "../config/constants";
import {
  authIconButtonClassName,
  authInputClassName,
  authLabelClassName,
  authNoticeIconClassName,
  authPrimaryButtonClassName,
  authSupportChipClassName,
  authTextButtonClassName,
  getAuthNoticeClassName,
  getAuthNoticeRole,
} from "./ui/formStyles";

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const trimmedEmail = email.trim();
  const canSubmit = Boolean(trimmedEmail) && !loading;

  const handleSendResetLink = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setStatus(null);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(apiUrl("/api/users/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
        signal: controller.signal,
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Reset link sent. Please check your email.",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "We could not send the reset link.",
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      if (error.name === "AbortError") {
        setStatus({
          type: "error",
          message: "This is taking too long. Please try again in a moment.",
        });
      } else {
        setStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close forgot password dialog"
      />

      <div
        className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-[#E8DED7] bg-white p-6 shadow-[0_24px_70px_rgba(43,24,16,0.22)] sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#8A6A58]">
              Account Help
            </p>
            <h2
              id="forgot-password-title"
              className="text-2xl text-[#4F2F1D]"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              Forgot Password?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6B4132]">
              Enter your account email and we will send a reset link.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={authIconButtonClassName}
            aria-label="Close forgot password dialog"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {status && (
          <div
            className={getAuthNoticeClassName(status.type)}
            aria-live="polite"
            role={getAuthNoticeRole(status.type)}
          >
            {status.type === "success" ? (
              <CheckCircle
                className={authNoticeIconClassName}
                aria-hidden="true"
              />
            ) : (
              <AlertCircle
                className={authNoticeIconClassName}
                aria-hidden="true"
              />
            )}
            <p>{status.message}</p>
          </div>
        )}

        <form onSubmit={handleSendResetLink} className="space-y-5">
          <div>
            <label
              htmlFor="forgot-password-email"
              className={authLabelClassName}
            >
              Email
            </label>
            <input
              id="forgot-password-email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status) {
                  setStatus(null);
                }
              }}
              className={authInputClassName}
              placeholder="you@example.com…"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full ${authPrimaryButtonClassName}`}
            disabled={!canSubmit}
          >
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 border-t border-[#E8DED7] pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#8A6A58]">
            Need access help?
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a href={SUPPORT_PHONE_LINK} className={authSupportChipClassName}>
              <Phone className="h-4 w-4 text-[#990000]" aria-hidden="true" />
              <span>Call {SUPPORT_PHONE_NUMBER}</span>
            </a>
            <a
              href={SUPPORT_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className={authSupportChipClassName}
            >
              <MessageCircle
                className="h-4 w-4 text-[#128C7E]"
                aria-hidden="true"
              />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className={`mt-5 ${authTextButtonClassName}`}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

ForgotPasswordPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ForgotPasswordPopup;
