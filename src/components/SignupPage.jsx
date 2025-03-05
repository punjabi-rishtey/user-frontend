// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Footer from "./Footer";
// import Header from "./Header";
// import PreferencesPopup from "./PreferencesPopup";


// const SignupPage = () => {
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
//   const { signup } = useAuth();
//   const navigate = useNavigate();
//   const [showPreferences, setShowPreferences] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePreferenceChange = (e) => {
//     const { name, value } = e.target;
//     setPreferences({
//       ...preferences,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const result = signup(formData);

//     if (result.success) {
//       setShowPreferences(true);
//     } else {
//       alert(result.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2]">
//       <Header />

//       {/* Signup Form */}
//       <div className="flex-grow flex items-center justify-center my-16">
//         <div className="flex space-x-10">
//           <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg" style={{ width: '450px' }}>
//             <h2
//               className="text-3xl mb-6 text-[#4F2F1D]"
//               style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
//             >
//               Sign Up
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
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
//                     { value: "jain", label: "Jain" },
//                     { value: "buddhist", label: "Buddhist" },
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
//                     { value: "annulled", label: "Annulled" },
//                   ],
//                 },
//                 { label: "Email", name: "email", type: "email" },
//                 { label: "Password", name: "password", type: "password" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label
//                     className="block text-[#6B4132] mb-2"
//                     style={{
//                       fontFamily: "'Modern Era', sans-serif",
//                       fontWeight: 400,
//                     }}
//                   >
//                     {field.label}
//                   </label>
//                   {field.type === "select" ? (
//                     <select
//                       name={field.name}
//                       value={formData[field.name]}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//                       style={{
//                         fontFamily: "'Modern Era', sans-serif",
//                         fontWeight: 400,
//                       }}
//                       required
//                     >
//                       {field.options.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <input
//                       type={field.type}
//                       name={field.name}
//                       value={formData[field.name]}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//                       style={{
//                         fontFamily: "'Modern Era', sans-serif",
//                         fontWeight: 400,
//                       }}
//                       required
//                     />
//                   )}
//                 </div>
//               ))}

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
//                   style={{
//                     fontFamily: "'Modern Era', sans-serif",
//                     fontWeight: 400,
//                   }}
//                 >
//                   Sign Up
//                 </button>
//                 </div>
//             </form>
//             <div className="mt-6 text-center space-y-2">
//               <button
//                 className="text-[#4A4A4A] hover:text-[#2D2D2D] hover:underline transition duration-300"
//                 onClick={() => navigate("/login")}
//                 style={{
//                   fontFamily: "'Modern Era', sans-serif",
//                   fontWeight: 400,
//                 }}
//               >
//                 Already have an account? Login
//               </button>
//             </div>
//           </div>

//           <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg" style={{ width: '450px', height: '450px' }}>
//             <h2 className="text-3xl mb-6 text-[#4F2F1D]">Preferences</h2>
//             <form className="space-y-4">
//               {["preference1", "preference2", "preference3"].map((pref, index) => (
//                 <div key={index} className="flex items-center space-x-4">
//                   <div>
//                     <label className="block text-[#6B4132] mb-2">Preference {index + 1}</label>
//                     <select
//                       name={pref}
//                       value={preferences[pref]}
//                       onChange={handlePreferenceChange}
//                       className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//                       required
//                     >
//                       <option value="">Select Preference</option>
//                       <option value="age">Age</option>
//                       <option value="caste">Caste</option>
//                       <option value="height">Height</option>
//                       <option value="marital_status">Marital Status</option>
//                     </select>
//                   </div>
//                   {(preferences[pref] === "age" || preferences[pref] === "height") && (
//                     <div className="flex items-end space-x-2">
//                       <div>
//                         <label className="block text-[#6B4132] mb-2">Lower Than</label>
//                         <input type="number" className="w-full p-3 border border-[#6B4132] rounded-lg" />
//                       </div>
//                       <div>
//                         <label className="block text-[#6B4132] mb-2">Higher Than</label>
//                         <input type="number" className="w-full p-3 border border-[#6B4132] rounded-lg" />
//                       </div>
//                     </div>
//                   )}
//                   {preferences[pref] === "caste" && (
//                     <div>
//                       <select className="w-full p-3 mt-8 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white">
//                         <option value="">Select Caste</option>
//                         {["Sikh", "Hindu", "Jain", "Muslim", "Christian"].map(caste => (
//                           <option key={caste} value={caste}>{caste}</option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                   {preferences[pref] === "marital_status" && (
//                     <div>
//                       <select className="w-full p-3 mt-8 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white">
//                         <option value="">Select Marital Status</option>
//                         {["Never Married", "Divorced", "Widow/Widower", "Awaiting Divorce", "Annulled"].map(status => (
//                           <option key={status} value={status.toLowerCase()}>{status}</option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </form>
//           </div>
//         </div>
//       </div>

//       {showPreferences && (
//         <PreferencesPopup
//           onClose={() => {
//             setShowPreferences(false);
//             navigate("/", { replace: true });
//             window.scrollTo({ top: 0, behavior: "smooth" });
//           }}
//         />
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default SignupPage;


























import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import PreferencesPopup from "./PreferencesPopup";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    dob: "",
    religion: "",
    marital_status: "",
  });
  const [preferences, setPreferences] = useState({
    preference1: "",
    preference2: "",
    preference3: "",
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPreferences, setShowPreferences] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedPreferences = Object.values(preferences).filter(
      (pref) => pref !== ""
    );

    const payload = { ...formData, preferences: selectedPreferences };

    try {
      const response = await fetch(
        "https://backend-nm1z.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setShowPreferences(true);
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please check your network and try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2]">
      <Header />

      {/* Signup Form */}
      <div className="flex-grow flex items-center justify-center my-16">
        <div className="flex space-x-10">
          <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg" style={{ width: "450px" }}>
            <h2
              className="text-3xl mb-6 text-[#4F2F1D]"
              style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
            >
              Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Mobile", name: "mobile", type: "text" },
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
                    { value: "jain", label: "Jain" },
                    { value: "buddhist", label: "Buddhist" },
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
                    { value: "annulled", label: "Annulled" },
                  ],
                },
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[#6B4132] mb-2">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#6B4132] rounded-lg"
                      required
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#6B4132] rounded-lg"
                      required
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-[#990000] text-white font-bold py-2 px-6 rounded-lg transition duration-300 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#800000]"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center space-y-2">
              <button
                className="text-[#4A4A4A] hover:text-[#2D2D2D] hover:underline transition duration-300"
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </button>
            </div>
          </div>

          <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg" style={{ width: "450px", height: "450px" }}>
            <h2 className="text-3xl mb-6 text-[#4F2F1D]">Preferences</h2>
            <form className="space-y-4">
              {["preference1", "preference2", "preference3"].map((pref, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div>
                    <label className="block text-[#6B4132] mb-2">Preference {index + 1}</label>
                    <select
                      name={pref}
                      value={preferences[pref]}
                      onChange={handlePreferenceChange}
                      className="w-full p-3 border border-[#6B4132] rounded-lg"
                      required
                    >
                      <option value="">Select Preference</option>
                      <option value="age">Age</option>
                      <option value="caste">Caste</option>
                      <option value="height">Height</option>
                      <option value="marital_status">Marital Status</option>
                    </select>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>

      {showPreferences && (
        <PreferencesPopup
          onClose={() => {
            setShowPreferences(false);
            navigate("/", { replace: true });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default SignupPage;
