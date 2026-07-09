import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle, CheckCircle } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { apiUrl } from "../config/constants";
import {
  authCardClassName,
  authInputClassName,
  authLabelClassName,
  authNoticeIconClassName,
  authPrimaryButtonClassName,
  getAuthNoticeClassName,
  getAuthNoticeRole,
} from "./ui/formStyles";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const canSubmit = Boolean(newPassword && confirmPassword) && !loading;

  const updatePassword = (setter) => (event) => {
    setter(event.target.value);
    if (status) {
      setStatus(null);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus({
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(
        apiUrl(`/api/users/reset-password/${token}`),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Password reset successfully. Taking you to login…",
        });
        window.setTimeout(() => navigate("/login"), 2000);
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to reset password.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Could not reach the server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2]">
      <Header />

      {/* Reset Password Form */}
      <main className="flex-grow px-4 py-12 sm:py-16">
        <div className={`mx-auto max-w-md ${authCardClassName}`}>
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#8A6A58]">
              Account Help
            </p>
            <h1
              className="text-3xl text-[#4F2F1D]"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              Reset Password
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#6B4132]">
              Choose a new password for your Punjabi Rishtey account.
            </p>
          </div>

          {status && (
            <div
              className={getAuthNoticeClassName(status.type)}
              role={getAuthNoticeRole(status.type)}
              aria-live="polite"
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

          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label htmlFor="reset-password-new" className={authLabelClassName}>
                New Password
              </label>
              <input
                id="reset-password-new"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={updatePassword(setNewPassword)}
                className={authInputClassName}
                required
              />
            </div>

            <div>
              <label
                htmlFor="reset-password-confirm"
                className={authLabelClassName}
              >
                Confirm Password
              </label>
              <input
                id="reset-password-confirm"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={updatePassword(setConfirmPassword)}
                className={authInputClassName}
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full sm:w-auto ${authPrimaryButtonClassName}`}
              >
                {loading ? "Resetting…" : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
