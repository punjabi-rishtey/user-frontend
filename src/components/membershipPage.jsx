import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageShell from "./PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { apiUrl } from "../config/constants";
import { authApi, isSessionExpiryError } from "../config/authClient";

const MembershipPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    screenshot: null,
    membershipId: "",
    transactionId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [success, setSuccess] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, refreshUser } = useAuth();

  const formatPlanPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  const formatDuration = (duration) => {
    const numericDuration = Number(duration);

    if (numericDuration === 12) {
      return "1 year";
    }

    return `${numericDuration} month${numericDuration === 1 ? "" : "s"}`;
  };

  // Refresh user data when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated, refreshUser]);

  // Improved authentication check - prevent premature redirects
  // useEffect(() => {
  //   // Only perform redirection after we've confirmed authentication status
  //   if (authChecked && !isAuthenticated) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [authChecked, isAuthenticated, navigate]);

  // Check authentication properly with timeout for initialization
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // If we have a token but auth context says not authenticated,
      // wait a moment for the auth context to catch up (it might still be initializing)
      if (!isAuthenticated) {
        const timeout = setTimeout(() => {
          console.log(
            "Auth context hasn't updated after delay, considering user not authenticated"
          );
          setAuthChecked(true);
        }, 1500); // Give the auth context 1.5 seconds to initialize

        return () => clearTimeout(timeout);
      } else {
        // We have a token and auth context says we're authenticated
        setAuthChecked(true);
      }
    } else {
      // No token exists, definitely not authenticated
      setAuthChecked(true);
    }
  }, [isAuthenticated]);

  // Debug authentication state
  // useEffect(() => {
  //   console.log("Auth state:", {
  //     isAuthenticated,
  //     hasToken: !!localStorage.getItem('token'),
  //     authChecked,
  //     user
  //   });
  // }, [isAuthenticated, authChecked, user]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(apiUrl("/api/memberships/all"), {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch membership plans");

        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePlanClick = (plan) => {
    // Check authentication before opening modal
    if (!isAuthenticated) {
      setError("You must be logged in to subscribe to a plan");
      navigate("/login");
      return;
    }

    setSelectedPlan(plan);
    setShowModal(true);
    // console.log(">>>> plan selected: (membershipId): ", plan._id)
    // Reset form state when opening modal
    setFormData({
      name: "",
      phone: "",
      screenshot: null,
      membershipId: plan._id,
      transactionId: "",
    });
    setPreviewUrl(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [qr, setQr] = useState(null);
  const fetchQR = async () => {
    try {
      const res = await fetch(apiUrl("/api/admin/auth/qr"));
      const data = await res.json();
      console.log(data);
      setQr(data);
    } catch (err) {
      console.error("Failed to fetch QR:", err);
    }
  };

  useEffect(() => {
    fetchQR();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image of your payment screenshot.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Payment screenshot must be smaller than 5MB.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        screenshot: file,
      }));

      // Create preview URL for the image
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // First check if user is authenticated
    if (!isAuthenticated) {
      setError("You must be logged in to subscribe to a plan");
      return;
    }

    if (!formData.membershipId || !selectedPlan) {
      setError("Please select a membership plan.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const phone = formData.phone.trim();
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.screenshot) {
      setError("Please upload your payment screenshot.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create form data for submission with only the required fields
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("fullName", formData.name.trim());
      formDataToSubmit.append("phoneNumber", phone);
      formDataToSubmit.append("image", formData.screenshot);
      formDataToSubmit.append("membershipId", formData.membershipId);

      const response = await authApi.post(
        apiUrl("/api/users/subscribe"),
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.success) {
        setSuccess(true);
        closeModal();

        // Refresh user data to update subscription status
        if (refreshUser) {
          await refreshUser();
        }
      } else {
        throw new Error(response.data?.message || "Payment submission failed");
      }
    } catch (err) {
      if (isSessionExpiryError(err)) {
        return;
      }

      console.error("Payment submission error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Failed to submit payment request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (!authChecked) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center py-24 text-brown">
          Loading…
        </div>
      </PageShell>
    );
  }

  // If not authenticated, show a message
  // if (authChecked && !isAuthenticated) {
  //   return (
  //     <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
  //       <Header />
  //       <div className="flex-grow flex items-center justify-center">
  //         <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
  //           <h2
  //             className="text-2xl mb-4 text-[#4F2F1D] text-center"
  //             style={{
  //               fontFamily: "'Tiempos Headline', serif",
  //               fontWeight: 400,
  //             }}
  //           >
  //             Authentication Required
  //           </h2>
  //           <p
  //             className="text-[#6B4132] mb-6 text-center"
  //             style={{
  //               fontFamily: "'Modern Era', sans-serif",
  //               fontWeight: 400,
  //             }}
  //           >
  //             Please log in to access membership plans.
  //           </p>
  //           <div className="flex justify-center">
  //             <button
  //               onClick={() => navigate("/login")}
  //               className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
  //               style={{
  //                 fontFamily: "'Modern Era', sans-serif",
  //                 fontWeight: 400,
  //               }}
  //             >
  //               Log In
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  if (success) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center px-6 py-20">
          <div className="w-full max-w-md rounded-xl border border-border bg-card px-8 py-12 text-center">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Punjabi Rishtey
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-brown">
              Payment request submitted
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our team will verify your screenshot and activate Gold shortly.
              You will be able to browse profiles once approved.
            </p>
            <Button
              className="mt-8"
              onClick={() => {
                setSuccess(false);
                navigate("/");
              }}
            >
              Back to home
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  const featuredPlan = plans[0];

  return (
    <PageShell>
      <div className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Membership
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-brown sm:text-5xl">
              Gold Membership
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              One clear plan. Unlimited browsing of verified Punjabi profiles
              for a year, verified personally by the Punjabi Rishtey team.
            </p>
          </div>

          {error && !showModal && (
            <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <p className="mt-16 text-center text-brown">Loading membership…</p>
          ) : featuredPlan ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-14 grid max-w-4xl gap-10 rounded-xl border border-border bg-card p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="font-display text-3xl font-semibold text-brown">
                    {featuredPlan.name || "Gold"}
                  </h2>
                  <p className="mt-2 font-display text-4xl text-maroon">
                    {formatPlanPrice(featuredPlan.price)}
                    <span className="ml-2 text-lg text-muted-foreground">
                      / {formatDuration(featuredPlan.duration)}
                    </span>
                  </p>
                </div>
                <Separator />
                <ul className="flex flex-col gap-3">
                  {(featuredPlan.features || []).map((feature, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-foreground sm:text-base"
                    >
                      <span className="text-maroon">
                        {feature.available ? "✓" : "–"}
                      </span>
                      <span
                        className={
                          feature.available
                            ? "text-ink"
                            : "text-muted-foreground line-through"
                        }
                      >
                        {feature.feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className="mt-2 w-full sm:w-auto"
                  onClick={() => handlePlanClick(featuredPlan)}
                >
                  Unlock with Gold
                </Button>
              </div>
              <div className="flex flex-col justify-center gap-4 rounded-lg border border-border bg-secondary/40 p-6">
                <p className="font-display text-xl text-brown">What you unlock</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Browse opposite-gender profiles, open full details, and
                  connect with intention, through support, or directly when a
                  phone number is available.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Pay via UPI, upload your screenshot, and we activate your
                  year after a quick human check.
                </p>
              </div>
            </motion.div>
          ) : (
            <p className="mt-16 text-center text-muted-foreground">
              No membership plans available right now.
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedPlan && (
          <>
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-brown-deep/50 p-4"
              variants={backgroundVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeModal}
            >
              <motion.div
                className="z-50 my-8 w-full max-w-3xl rounded-xl border border-border bg-card p-6"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-xl text-brown sm:text-2xl">
                    Complete your {selectedPlan.name} subscription
                  </h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-2xl text-muted-foreground hover:text-brown"
                  >
                    ×
                  </button>
                </div>

                {error && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex-1 rounded-lg border border-border bg-secondary/50 p-6">
                    <h4 className="mb-4 text-center font-display text-lg text-brown">
                      Pay exactly {formatPlanPrice(selectedPlan.price)}
                      <span className="mt-1 block text-sm font-sans text-muted-foreground">
                        Annual membership for one user
                      </span>
                    </h4>

                    <div className="mb-4 flex justify-center">
                      <div className="flex size-48 items-center justify-center rounded-lg bg-white p-4">
                        {!qr && (
                          <span className="text-muted-foreground">QR Code</span>
                        )}
                        {qr && (
                          <img
                            src={qr?.imageUrl}
                            alt="QR Code"
                            className="size-full object-contain"
                          />
                        )}
                      </div>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                      <p className="mb-1">
                        UPI ID: {qr?.name || "yourcompany@upi"}
                      </p>
                      <p>
                        Pay exactly {formatPlanPrice(selectedPlan.price)}, then
                        upload the payment screenshot. Verified by the Punjabi
                        Rishtey team.
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="10-digit phone number"
                          maxLength={10}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="screenshot">Payment Screenshot *</Label>
                        <p className="text-sm text-muted-foreground">
                          Upload a clear screenshot that shows the paid amount,
                          date, and UPI transaction details.
                        </p>

                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border p-3 transition-colors hover:border-brown"
                        >
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Payment screenshot preview"
                              className="mb-2 max-h-40 object-contain"
                            />
                          ) : (
                            <p className="py-6 text-center text-sm text-muted-foreground">
                              Click to upload payment screenshot
                            </p>
                          )}

                          <input
                            type="file"
                            id="screenshot"
                            name="screenshot"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            required
                          />
                        </button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="transactionId">
                          UPI Transaction ID
                        </Label>
                        <Input
                          type="text"
                          id="transactionId"
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          placeholder="Optional"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 w-full"
                      >
                        {isSubmitting
                          ? "Submitting…"
                          : "Submit payment details"}
                      </Button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageShell>
  );
};

export default MembershipPage;
