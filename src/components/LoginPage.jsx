import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
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
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    const success = await login(formData);

    if (success === "networkError") {
      setLoginError(
        "The server is not responding right now. Please try again in a moment."
      );
    } else if (!success) {
      setLoginError("Please check your email and password, then try again.");
    } else {
      navigate(redirectPath);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2]">
      <Header />
      {showForgotPassword && (
        <ForgotPasswordPopup onClose={() => setShowForgotPassword(false)} />
      )}

      {/* Login Form */}
      <main className="flex-grow px-4 py-12 sm:py-16">
        <div className={`mx-auto max-w-md ${authCardClassName}`}>
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#8A6A58]">
              Punjabi Rishtey
            </p>
            <h1
              className="text-3xl text-[#4F2F1D]"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              Login
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#6B4132]">
              Access your profile, membership, and partner search.
            </p>
          </div>

          {loginError && (
            <div
              className={getAuthNoticeClassName("error")}
              aria-live="polite"
              role="alert"
            >
              <AlertCircle className={authNoticeIconClassName} aria-hidden="true" />
              <p>{loginError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className={authLabelClassName}
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
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
                placeholder="you@example.com…"
                required
              />
            </div>
            <div>
              <label
                htmlFor="login-password"
                className={authLabelClassName}
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
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
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${authIconButtonClassName}`}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${authPrimaryButtonClassName}`}
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              {isLoading ? "Logging in…" : "Login"}
            </button>
          </form>

          <div className="mt-6 space-y-3 border-t border-[#E8DED7] pt-5 text-center">
            <p className="text-sm text-[#6B4132]">
              New to Punjabi Rishtey?{" "}
              <Link
                to="/signup"
                className={authInlineLinkClassName}
              >
                Create an account
              </Link>
            </p>
            <button
              type="button"
              className={authTextButtonClassName}
              onClick={() => setShowForgotPassword(true)}
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              Forgot Password?
            </button>

            <div
              className="pt-2"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#8A6A58]">
                Need help signing in?
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
