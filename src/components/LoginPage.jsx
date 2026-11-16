import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageShell from "./PageShell";
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import {
  SUPPORT_PHONE_LINK,
  SUPPORT_PHONE_NUMBER,
  SUPPORT_WHATSAPP_LINK,
} from "../config/constants";
import { AlertCircle, Eye, EyeOff, MessageCircle, Phone } from "lucide-react";
import {
  authCardClassName,
  authIconButtonClassName,
  authInlineLinkClassName,
  authInputClassName,
  authLabelClassName,
  authNoticeIconClassName,
  authPrimaryButtonClassName,
  authSupportChipClassName,
  authTextButtonClassName,
  getAuthNoticeClassName,
} from "./ui/formStyles";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (loginError) setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    const success = await login(formData);

    if (success === "networkError") {
      setLoginError(
        "The server is not responding right now. Please try again in a moment."
      );
    } else if (success === "sessionLimit") {
      navigate("/session-limit", { replace: true });
    } else if (typeof success === "string") {
      setLoginError(success);
    } else if (!success) {
      setLoginError("Please check your email and password, then try again.");
    } else {
      navigate(redirectPath);
    }
  };

  return (
    <PageShell>
      {showForgotPassword && (
        <ForgotPasswordPopup onClose={() => setShowForgotPassword(false)} />
      )}

      <div className="px-4 py-12 sm:py-16">
        <div className={`mx-auto max-w-md ${authCardClassName}`}>
          <div className="mb-7">
            <p className="mb-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Punjabi Rishtey
            </p>
            <h1 className="font-display text-3xl font-semibold text-brown sm:text-4xl">
              Login
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Access your profile, membership, and partner search.
            </p>
          </div>

          {loginError && (
            <div
              className={getAuthNoticeClassName("error")}
              aria-live="polite"
              role="alert"
            >
              <AlertCircle
                className={authNoticeIconClassName}
                aria-hidden="true"
              />
              <p>{loginError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="login-email" className={authLabelClassName}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                autoComplete="email"
                spellCheck={false}
                value={formData.email}
                onChange={handleChange}
                className={authInputClassName}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="login-password" className={authLabelClassName}>
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${authInputClassName} pr-12`}
                  required
                />
                <button
                  type="button"
                  className={`absolute top-1/2 right-3 -translate-y-1/2 ${authIconButtonClassName}`}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${authPrimaryButtonClassName}`}
            >
              {isLoading ? "Logging in…" : "Login"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 text-center">
            <p className="text-sm text-muted-foreground">
              New to Punjabi Rishtey?{" "}
              <Link to="/signup" className={authInlineLinkClassName}>
                Create an account
              </Link>
            </p>
            <button
              type="button"
              className={authTextButtonClassName}
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>

            <div className="pt-2">
              <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Need help signing in?
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                <a href={SUPPORT_PHONE_LINK} className={authSupportChipClassName}>
                  <Phone className="size-4 text-maroon" aria-hidden="true" />
                  <span>Call {SUPPORT_PHONE_NUMBER}</span>
                </a>
                <a
                  href={SUPPORT_WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className={authSupportChipClassName}
                >
                  <MessageCircle className="size-4 text-maroon" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default LoginPage;
