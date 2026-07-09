import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import Modal from "./TermsConditionModal";
import { apiUrl } from "../config/constants";
import {
  authCardClassName,
  authIconButtonClassName,
  authInlineLinkClassName,
  authInputClassName,
  authLabelClassName,
  authNoticeIconClassName,
  authPrimaryButtonClassName,
  getAuthNoticeClassName,
  getAuthNoticeRole,
} from "./ui/formStyles";

const SignupPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    secondary_contact: "",
    gender: "",
    dob: "",
    religion: "",
    caste: "",
    marital_status: "",
  });
  const [preferences] = useState({
    preference1: "",
    preference2: "",
    preference3: "",
  });
  const [profilePictures, setProfilePictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [pictureError, setPictureError] = useState("");
  const [formNotice, setFormNotice] = useState(null);
  const [profilePicturePreviews, setProfilePicturePreviews] = useState([]);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const photoInputRef = useRef(null);

  useEffect(() => {
    const previews = profilePictures.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setProfilePicturePreviews(previews);

    return () => {
      previews.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [profilePictures]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Password validation
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
      if (
        name === "confirmPassword" &&
        formData.password &&
        value &&
        formData.password !== value
      ) {
        setPasswordError("Passwords do not match");
      } else if (
        name === "password" &&
        formData.confirmPassword &&
        value &&
        value !== formData.confirmPassword
      ) {
        setPasswordError("Passwords do not match");
      }
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    if (files.length + profilePictures.length > 10) {
      setPictureError("You can upload up to 10 photos. Remove one before adding more.");
      setFormNotice(null);
      e.target.value = "";
      return;
    }

    setPictureError("");
    setFormNotice(null);
    setProfilePictures((currentPictures) => [...currentPictures, ...files]);
    e.target.value = "";
  };

  const removePicture = (index) => {
    setPictureError("");
    setProfilePictures(profilePictures.filter((_, i) => i !== index));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: "", color: "" };
    if (password.length < 6)
      return { strength: "Too short", color: "text-red-500" };
    if (password.length < 8)
      return { strength: "Weak", color: "text-orange-500" };
    if (password.length < 12)
      return { strength: "Good", color: "text-blue-500" };
    return { strength: "Strong", color: "text-green-500" };
  };

  const onTermsConditionAccept = () => {
    setShowModal(false);
    handleSubmit();
  };

  const TermsCondition = (e) => {
    e.preventDefault();

    setFormNotice(null);

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      confirmPasswordInputRef.current?.focus();
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      passwordInputRef.current?.focus();
      return;
    }

    if (profilePictures.length === 0) {
      setPictureError("Please add at least 1 profile photo before continuing.");
      photoInputRef.current?.focus();
      return;
    }

    setPasswordError("");
    setPictureError("");
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setFormNotice(null);
    const selectedPreferences = Object.values(preferences).filter(
      (pref) => pref !== ""
    );

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "confirmPassword") {
        formDataToSend.append(key, formData[key]);
      }
    });
    formDataToSend.append("preferences", JSON.stringify(selectedPreferences));
    profilePictures.forEach((file) => {
      formDataToSend.append(`profile_pictures`, file);
    });

    try {
      const response = await fetch(apiUrl("/api/users/register"), {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setFormNotice({
          type: "success",
          message: "Registration successful. Taking you to login…",
        });
        window.setTimeout(() => {
          navigate("/login", { replace: true });
          window.scrollTo(0, 0);
        }, 900);
      } else {
        setFormNotice({
          type: "error",
          message: data.message || "Registration failed. Please check the details and try again.",
        });
      }
    } catch {
      setLoading(false);
      setFormNotice({
        type: "error",
        message: "Could not reach the server. Check your connection and try again.",
      });
    }
  };

  const fieldMetadata = {
    name: { autoComplete: "name" },
    mobile: { type: "tel", inputMode: "tel", autoComplete: "tel" },
    secondary_contact: { type: "tel", inputMode: "tel", autoComplete: "tel" },
    dob: { autoComplete: "bday" },
    email: { autoComplete: "email", spellCheck: false },
    password: { autoComplete: "new-password" },
    confirmPassword: { autoComplete: "new-password" },
  };

  const getFieldId = (name) => `signup-${name}`;

  const renderField = (field) => {
    const fieldId = getFieldId(field.name);
    const metadata = fieldMetadata[field.name] || {};

    if (field.type === "select") {
      return (
        <select
          id={fieldId}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          autoComplete={metadata.autoComplete || "off"}
          className={authInputClassName}
          required
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    } else if (field.name === "password") {
      const passwordStrength = getPasswordStrength(formData[field.name]);
      return (
        <div>
          <div className="relative">
            <input
              id={fieldId}
              ref={passwordInputRef}
              type={showPassword ? "text" : "password"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              autoComplete={metadata.autoComplete}
              aria-describedby="signup-password-strength"
              className={`${authInputClassName} pr-12`}
              required
            />
            <button
              type="button"
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${authIconButtonClassName}`}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formData[field.name] && passwordStrength.strength && (
            <p
              id="signup-password-strength"
              className={`text-xs sm:text-sm mt-1 ${passwordStrength.color}`}
            >
              Password strength: {passwordStrength.strength}
            </p>
          )}
        </div>
      );
    } else if (field.name === "confirmPassword") {
      return (
        <div>
          <div className="relative">
            <input
              id={fieldId}
              ref={confirmPasswordInputRef}
              type={showConfirmPassword ? "text" : "password"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              autoComplete={metadata.autoComplete}
              aria-describedby={
                passwordError
                  ? "signup-password-error"
                  : formData.password &&
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword
                    ? "signup-password-match"
                    : undefined
              }
              aria-invalid={passwordError ? "true" : undefined}
              className={`${authInputClassName} pr-12`}
              required
            />
            <button
              type="button"
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${authIconButtonClassName}`}
              onClick={toggleConfirmPasswordVisibility}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {passwordError && (
            <p
              id="signup-password-error"
              className="text-red-600 text-xs sm:text-sm mt-1"
              role="alert"
            >
              {passwordError}
            </p>
          )}
          {!passwordError &&
            formData.password &&
            formData.confirmPassword &&
            formData.password === formData.confirmPassword && (
              <p
                id="signup-password-match"
                className="text-green-600 text-xs sm:text-sm mt-1"
              >
                ✓ Passwords match
              </p>
            )}
        </div>
      );
    } else {
      return (
        <input
          id={fieldId}
          type={metadata.type || field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          inputMode={metadata.inputMode}
          autoComplete={metadata.autoComplete || "off"}
          spellCheck={metadata.spellCheck}
          className={authInputClassName}
          required
        />
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2] overflow-x-hidden">
      <Header />
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAccept={onTermsConditionAccept}
      >
        <div>
          <p>I declare that:</p>
          <ol type="1">
            <li>
              The information filled up by me in this form is correct and if any
              error, I shall be responsible for the same.
            </li>
            <li>
              Before fixing up my marriage, with my future partner, I shall know
              satisfactory information about the family and the partner
              herself/himself. The Punjabi Marriage Forum (punjabi-rishtey.com)
              is not responsible for any mishap.
            </li>
            <li>
              After getting married, I shall inform the website incharge about
              the same.
            </li>
            <li>
              I will respectfully follow all the terms and conditions provided
              by PUNJABI MARRIAGE FORUM.
            </li>
          </ol>
        </div>
      </Modal>
      <div className="flex-grow flex items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-lg mx-auto">
          <div className={authCardClassName}>
            <h2
              className="text-2xl md:text-3xl mb-2 text-[#4F2F1D] text-center text-balance"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              Sign Up
            </h2>
            {formNotice && (
              <div
                className={getAuthNoticeClassName(formNotice.type)}
                role={getAuthNoticeRole(formNotice.type)}
                aria-live="polite"
              >
                {formNotice.type === "success" ? (
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
                <p>{formNotice.message}</p>
              </div>
            )}
            <form onSubmit={TermsCondition} className="space-y-4 sm:space-y-5">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Mobile", name: "mobile", type: "text" },
                { label: "Secondary Contact", name: "secondary_contact", type: "text" },
                {
                  label: "Gender",
                  name: "gender",
                  type: "select",
                  options: [
                    { value: "", label: "Select Gender" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ],
                },
                { label: "Date of Birth", name: "dob", type: "date" },
                {
                  label: "Religion",
                  name: "religion",
                  type: "select",
                  options: [
                    { value: "", label: "Select Religion" },
                    { value: "hindu", label: "Hindu" },
                    { value: "sikh", label: "Sikh" },
                  ],
                },
                {
                  label: "Caste",
                  name: "caste",
                  type: "select",
                  options: [
                    { value: "", label: "Select Caste" },
                    { value: "khatri", label: "Khatri" },
                    { value: "arora", label: "Arora" },
                    { value: "brahmin", label: "Brahmin" },
                    { value: "multani", label: "Multani" },
                    { value: "other", label: "Other" },
                  ],
                },
                {
                  label: "Marital Status",
                  name: "marital_status",
                  type: "select",
                  options: [
                    { value: "", label: "Select Marital Status" },
                    { value: "never_married", label: "Never Married" },
                    { value: "divorced", label: "Divorced" },
                    { value: "widow_widower", label: "Widow/Widower" },
                    { value: "awaiting_divorce", label: "Awaiting Divorce" },
                  ],
                },
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
                {
                  label: "Confirm Password",
                  name: "confirmPassword",
                  type: "password",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={getFieldId(field.name)}
                    className={authLabelClassName}
                  >
                    {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}
              <div>
                <label
                  htmlFor="profile-pictures"
                  className={authLabelClassName}
                >
                  Profile Pictures (at least 1 required, up to 10)
                </label>
                <div className="relative">
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="sr-only peer"
                    id="profile-pictures"
                    aria-describedby={
                      pictureError
                        ? "profile-pictures-error"
                        : "profile-pictures-help"
                    }
                    aria-invalid={pictureError ? "true" : undefined}
                    aria-required="true"
                  />
                  <label
                    htmlFor="profile-pictures"
                    className="block w-full cursor-pointer rounded-lg border border-dashed border-[#C7AFA0] bg-[#FFFCF8] px-4 py-4 text-center text-base text-[#5C3828] transition-[background-color,border-color,color,box-shadow,transform] duration-200 hover:border-[#990000] hover:bg-[#FFF5F2] active:scale-[0.99] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#990000]/25 md:text-sm"
                  >
                    Choose Profile Pictures
                  </label>
                </div>
                {pictureError ? (
                  <p
                    id="profile-pictures-error"
                    className="text-red-600 text-xs sm:text-sm mt-2"
                    role="alert"
                  >
                    {pictureError}
                  </p>
                ) : (
                  <p
                    id="profile-pictures-help"
                    className="text-[#7C6B62] text-xs sm:text-sm mt-2"
                  >
                    Upload 1 to 10 profile photos.
                  </p>
                )}
                {profilePicturePreviews.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[#6B4132] mb-2 text-sm">
                      Selected Pictures ({profilePictures.length}/10)
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                      {profilePicturePreviews.map(({ file, url }, index) => (
                        <div
                          key={`${file.name}-${file.lastModified}-${file.size}-${index}`}
                          className="relative group"
                        >
                          <img
                            src={url}
                            alt={`Selected profile preview ${index + 1}`}
                            width="160"
                            height="120"
                            className="w-full h-24 object-cover object-top rounded-lg border border-[#E7D8CE] shadow-sm"
                          />
                          <button
                            type="button"
                            className="absolute top-1.5 right-1.5 bg-[#990000] text-white rounded-full w-7 h-7 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-[opacity,transform,background-color,box-shadow] duration-150 text-sm hover:bg-[#7D0000] active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990000]/30 focus-visible:ring-offset-2"
                            onClick={() => removePicture(index)}
                            aria-label={`Remove profile picture ${index + 1}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className={`w-full sm:w-auto ${authPrimaryButtonClassName}`}
                  disabled={loading}
                >
                  {loading ? "Signing Up…" : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center space-y-2">
              <Link
                className={`inline-flex min-h-10 items-center justify-center rounded-md px-3 text-sm sm:text-base ${authInlineLinkClassName}`}
                to="/login"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;

//

// v1
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Footer from "./Footer";
// import Header from "./Header";
// import PreferencesPopup from "./PreferencesPopup";
// // Import eye icons for password visibility toggle
// import { Eye, EyeOff } from "lucide-react";
// import Modal from "./TermsConditionModal";
// import { option } from "framer-motion/client";

// const SignupPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//     gender: "",
//     dob: "",
//     religion: "",
//     marital_status: "",
//   });
//   const [preferences, setPreferences] = useState({
//     preference1: "",
//     preference2: "",
//     preference3: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();
//   const [showPreferences, setShowPreferences] = useState(false);
//   // Add state for password visibility
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePreferenceChange = (e) => {
//     const { name, value } = e.target;
//     setPreferences({ ...preferences, [name]: value });
//   };

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const onTermsConditionAccept = () => {
//     setShowModal(false);
//     handleSubmit();
//   };

//   const TermsCondition = (e) => {
//     e.preventDefault();

//     setShowModal(true);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const selectedPreferences = Object.values(preferences).filter(
//       (pref) => pref !== ""
//     );

//     const payload = { ...formData, preferences: selectedPreferences };

//     try {
//       const response = await fetch(
//         "https://backend-nm1z.onrender.com/api/users/register",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();
//       setLoading(false);

//       if (response.ok) {
//         // Show success message
//         alert("Registration successful! Please login to continue.");

//         // Redirect to login page and scroll to top
//         navigate("/login", { replace: true });
//         window.scrollTo(0, 0);
//       } else {
//         alert(data.message || "Registration failed. Please try again.");
//       }
//     } catch (error) {
//       setLoading(false);
//       alert("An error occurred. Please check your network and try again.");
//     }
//   };

//   // Custom field renderer function to handle special cases like password
//   const renderField = (field) => {
//     if (field.type === "select") {
//       return (
//         <select
//           name={field.name}
//           value={formData[field.name]}
//           onChange={handleChange}
//           className="w-full p-3 border border-[#6B4132] rounded-lg"
//           required
//         >
//           {/* <option value="">Select value</option> */}
//           {field.options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       );
//     } else if (field.name === "password") {
//       return (
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name={field.name}
//             value={formData[field.name]}
//             onChange={handleChange}
//             className="w-full p-3 border border-[#6B4132] rounded-lg"
//             required
//           />
//           <button
//             type="button"
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B4132] hover:text-[#4F2F1D] focus:outline-none"
//             onClick={togglePasswordVisibility}
//             aria-label={showPassword ? "Hide password" : "Show password"}
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>
//       );
//     } else {
//       return (
//         <input
//           type={field.type}
//           name={field.name}
//           value={formData[field.name]}
//           onChange={handleChange}
//           className="w-full p-3 border border-[#6B4132] rounded-lg"
//           required
//         />
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2]">
//       <Header />
//       <Modal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onAccept={onTermsConditionAccept}
//       >
//         <div>
//           <p>I declare that:</p>
//           <ol type="1">
//             <li>
//               The information filled up by me in this form is correct and if any
//               error, I shall be responsible for the same.
//             </li>

//             <li>
//               2. Before fixing up my marriage, with my future partner, I shall
//               know satisfactory information about the family and the partner
//               herself/himself. The Punjabi Marriage Forum (punjabi-rishtey.com)
//               is not responsible for any mishap.
//             </li>

//             <li>
//               After getting married, I shall inform the website incharge about
//               the same.
//             </li>
//             <li>
//               I will respectfully follow all the terms and conditions provided
//               by PUNJABI MARRIAGE FORUM.
//             </li>
//           </ol>
//         </div>
//       </Modal>
//       {/* Signup Form */}
//       <div className="flex-grow flex items-center justify-center my-16">
//         <div className="flex space-x-10">
//           <div
//             className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg"
//             style={{ width: "450px" }}
//           >
//             <h2
//               className="text-3xl mb-6 text-[#4F2F1D]"
//               style={{
//                 fontFamily: "'Tiempos Headline', serif",
//                 fontWeight: 400,
//               }}
//             >
//               Sign Up
//             </h2>
//             <form onSubmit={TermsCondition} className="space-y-4">
//               {[
//                 { label: "Name", name: "name", type: "text" },
//                 { label: "Mobile", name: "mobile", type: "text" },
//                 {
//                   label: "Gender",
//                   name: "gender",
//                   type: "select",
//                   options: [
//                     { value: "", label: "Select Gender" },
//                     { value: "male", label: "Male" },
//                     { value: "female", label: "Female" },
//                   ],
//                 },
//                 { label: "Date of Birth", name: "dob", type: "date" },
//                 {
//                   label: "Religion",
//                   name: "religion",
//                   type: "select",
//                   options: [
//                     { value: "", label: "Select Religion" },
//                     { value: "hindu", label: "Hindu" },
//                     { value: "sikh", label: "Sikh" },
//                   ],
//                 },
//                 {
//                   label: "caste",
//                   name: "caste",
//                   type: "select",
//                   options: [
//                     { value: "", label: "Select Caste" },
//                     { value: "khatri", label: "Khatri" },
//                     { value: "arora", label: "Arora" },
//                     { value: "brahmin", label: "Brahmin" },
//                     { value: "multani", label: "Multani" },
//                     { value: "other", label: "Other" },
//                   ],
//                 },
//                 {
//                   label: "Marital Status",
//                   name: "marital_status",
//                   type: "select",
//                   options: [
//                     { value: "", label: "Select Marital Status" },
//                     { value: "never_married", label: "Never Married" },
//                     { value: "divorced", label: "Divorced" },
//                     { value: "widow_widower", label: "Widow/Widower" },
//                     { value: "awaiting_divorce", label: "Awaiting Divorce" },
//                   ],
//                 },
//                 { label: "Email", name: "email", type: "email" },
//                 { label: "Password", name: "password", type: "password" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label className="block text-[#6B4132] mb-2">
//                     {field.label}
//                   </label>
//                   {renderField(field)}
//                 </div>
//               ))}

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className={`bg-[#990000] text-white font-bold py-2 px-6 rounded-lg transition duration-300 ${
//                     loading
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-[#800000]"
//                   }`}
//                   disabled={loading}
//                 >
//                   {loading ? "Signing Up..." : "Sign Up"}
//                 </button>
//               </div>
//             </form>
//             <div className="mt-6 text-center space-y-2">
//               <button
//                 className="text-[#4A4A4A] hover:text-[#2D2D2D] hover:underline transition duration-300"
//                 onClick={() => navigate("/login")}
//               >
//                 Already have an account? Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default SignupPage;
