import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import PageShell from "./PageShell";
import MembershipRequired from "./MembershipRequired";
import ProfilePhotosLayout from "./ProfilePhotosLayout";
import AboutLookingSection from "./AboutLookingSection";
import { Button } from "@/components/ui/button";
import {
  FaHeart,
  FaUser,
  FaGraduationCap,
  FaUsers,
  FaArrowLeft,
  FaLock,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  apiUrl,
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_LINK,
  SUPPORT_PHONE_LINK,
  SUPPORT_PHONE_NUMBER,
  SUPPORT_WHATSAPP_LINK,
} from "../config/constants";

// Hybrid brand surfaces (atelier paper + brown ink) - no Material rainbow
const brandCard = {
  bg: "#FFFcf8",
  border: "#E5D9CE",
  title: "#4F2F1D",
  icon: "#990000",
  label: "#6B5344",
  value: "#1C1410",
};

const cardColorSchemes = {
  basicDetails: brandCard,
  lifestyle: brandCard,
  horoscope: brandCard,
  education: brandCard,
  profession: brandCard,
  family: brandCard,
};

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useScroll();

  // Dynamic Scroll Effects for Boxes
  // Scroll progress available for future subtle effects if needed

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await axios.get(apiUrl(`/api/users/${id}`), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("=== PROFILE DATA FROM BACKEND ===");
        console.log("Full response:", response.data);
        console.log("================================");

        setProfileData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        if (err.response?.status === 403) {
          setError(
            err.response?.data?.message ||
              "This profile is private. For an introduction, please contact Punjabi Rishtey support."
          );
        } else {
          setError("Failed to load profile data. Please try again later.");
        }
        if (err.message === "Authentication required") {
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Format values for better display
  const formatValue = (value) => {
    if (value === undefined || value === null) return "Not specified";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value === "") return "Not specified";

    // Format snake_case to Title Case
    if (typeof value === "string" && value.includes("_")) {
      return value
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    return value;
  };

  const formatSelectionValue = (value) => {
    if (value === undefined || value === null || value === "") {
      return "Not specified";
    }

    if (typeof value !== "string") {
      return formatValue(value);
    }

    const normalizedValue = value.replace(/_/g, " ").trim();

    if (!normalizedValue) {
      return "Not specified";
    }

    if (normalizedValue === normalizedValue.toLowerCase()) {
      return normalizedValue.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return normalizedValue;
  };

  const supportLinkBaseClass =
    "inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-[#D8C5B8] bg-white px-4 py-2 text-sm font-semibold text-[#4F2F1D] shadow-[0_1px_0_rgba(79,47,29,0.06)] transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-out hover:border-[#B99682] hover:bg-[#FCF9F2] active:scale-[0.98]";

  const renderSupportLinks = ({ className = "" } = {}) => (
    <div className={`flex flex-col gap-2 sm:flex-row sm:flex-wrap ${className}`}>
      <a
        href={SUPPORT_PHONE_LINK}
        className={supportLinkBaseClass}
      >
        <FaPhoneAlt className="text-xs text-[#990000]" aria-hidden="true" />
        <span>Call {SUPPORT_PHONE_NUMBER}</span>
      </a>
      <a
        href={SUPPORT_WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className={supportLinkBaseClass}
      >
        <FaWhatsapp className="text-base text-[#128C7E]" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
      <a
        href={SUPPORT_EMAIL_LINK}
        className={supportLinkBaseClass}
      >
        <FaEnvelope className="text-sm text-[#990000]" aria-hidden="true" />
        <span>{SUPPORT_EMAIL}</span>
      </a>
    </div>
  );

  if (loading) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center py-24 text-brown">
          Loading profile…
        </div>
      </PageShell>
    );
  }

  if (error) {
    const isPrivateProfileError = error.toLowerCase().includes("private");
    const isMembershipError =
      error.toLowerCase().includes("membership") ||
      error.toLowerCase().includes("renew") ||
      error.toLowerCase().includes("subscription");

    if (isMembershipError) {
      return (
        <PageShell>
          <div className="flex flex-1 items-center justify-center px-6 py-20">
            <MembershipRequired
              title="Gold membership required"
              description={error}
              ctaLabel="Unlock with Gold"
            />
          </div>
        </PageShell>
      );
    }

    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-xl rounded-xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-5 flex items-start gap-3">
              <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-maroon">
                {isPrivateProfileError ? (
                  <FaLock aria-hidden="true" />
                ) : (
                  <FaUser aria-hidden="true" />
                )}
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-brown">
                  {isPrivateProfileError ? "Profile unavailable" : "Something went wrong"}
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {error}
                </p>
              </div>
            </div>
            {isPrivateProfileError && (
              <div className="mb-6 border-t border-border pt-5">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  Request an introduction
                </p>
                {renderSupportLinks()}
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" onClick={handleGoBack}>
                Go back
              </Button>
              {!isPrivateProfileError && (
                <Button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  if (!profileData) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center py-24 text-brown">
          No profile data found.
        </div>
      </PageShell>
    );
  }

  const isSubscriptionExpired =
    user?.metadata?.exp_date && new Date() > new Date(user.metadata.exp_date);

  if (user && (user.status !== "Approved" || isSubscriptionExpired)) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center px-6 py-20">
          <MembershipRequired
            title={
              isSubscriptionExpired
                ? "Your Gold membership has expired"
                : "Gold unlocks this profile"
            }
            ctaLabel={isSubscriptionExpired ? "Renew Gold" : "Unlock with Gold"}
          />
        </div>
      </PageShell>
    );
  }

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return "Not specified";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const contactIntroRequired =
    profileData.contact_access === "admin_intro_required";
  const hiddenContactText = "Hidden in Private Mode";

  // Organize profile data into sections for display
  const basicDetails = {
    Age: calculateAge(profileData.dob),
    "Date of Birth": formatDate(profileData.dob),
    Gender: formatSelectionValue(profileData.gender),
    Height: formatValue(profileData.height),
    Religion: formatSelectionValue(profileData.religion),
    Caste: formatSelectionValue(profileData.caste),
    Language: formatValue(profileData.language),
    "Marital Status": formatValue(profileData.marital_status),
    "Birth Time": formatValue(profileData.birth_details?.birth_time),
    "Birth Place": formatValue(profileData.birth_details?.birth_place),
    Email: contactIntroRequired
      ? hiddenContactText
      : profileData.email || "Not specified",
    Mobile: contactIntroRequired
      ? hiddenContactText
      : profileData.mobile || "Not specified",
    "Secondary Contact": contactIntroRequired
      ? hiddenContactText
      : profileData.secondary_contact || "Not specified",
  };

  // Helper function to format manglik status
  const formatManglikStatus = (value) => {
    // Handle boolean values first (including false)
    if (typeof value === "boolean") {
      return value ? "Manglik" : "Non Manglik";
    }
    // Handle string values
    if (typeof value === "string") {
      if (value === "manglik") return "Manglik";
      if (value === "non_manglik") return "Non Manglik";
      if (value === "partial_manglik") return "Partial Manglik";
      if (value === "true") return "Manglik";
      if (value === "false") return "Non Manglik";
    }
    // Handle null, undefined, or empty string
    if (value === null || value === undefined || value === "") {
      return "Not specified";
    }
    return formatValue(value);
  };

  // Helper function to format NRI status
  const formatNRIStatus = (value) => {
    if (!value && value !== false) return "Not specified";
    if (typeof value === "boolean") {
      return value ? "NRI" : "Indian";
    }
    if (typeof value === "string") {
      if (value === "true" || value.toLowerCase() === "yes") return "NRI";
      if (value === "false" || value.toLowerCase() === "no") return "Indian";
    }
    return formatValue(value);
  };

  // Helper function to format diet preferences
  const formatDietPreference = (value) => {
    if (!value) return "Not specified";
    if (value === "veg") return "Vegetarian";
    if (value === "nonveg") return "Non-Vegetarian";
    if (value === "occasionally_nonveg") return "Occasionally Non-Vegetarian";
    return formatValue(value);
  };

  // Helper function to format abroad_ready
  const formatAbroadReady = (value) => {
    if (value === null || value === undefined || value === "")
      return "Not specified";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "string") {
      if (value === "true" || value.toLowerCase() === "yes") return "Yes";
      if (value === "false" || value.toLowerCase() === "no") return "No";
    }
    return formatValue(value);
  };

  // Physical and lifestyle information
  const lifestyleDetails = {
    "Skin Tone": formatValue(profileData.physical_attributes?.skin_tone),
    "Body Type": formatValue(profileData.physical_attributes?.body_type),
    "Physical Disability": profileData.physical_attributes?.physical_disability
      ? "Yes"
      : "No",
    Smoke: profileData.lifestyle?.smoke ? profileData.lifestyle.smoke : "No",
    Drink: profileData.lifestyle?.drink ? profileData.lifestyle.drink : "No",
    "Diet Preference": formatDietPreference(profileData.lifestyle?.veg_nonveg),
    "NRI Status": formatNRIStatus(profileData.lifestyle?.nri_status),
    "Ready to move Abroad": formatAbroadReady(
      profileData.lifestyle?.abroad_ready
    ),
  };

  // Hobbies details
  const hobbiesDetails = {
    Hobbies:
      Array.isArray(profileData.hobbies) && profileData.hobbies.length > 0
        ? profileData.hobbies.join(", ")
        : "Not specified",
  };

  // Astrology details
  // const astrologyDetails = {
  //   Manglik: formatManglikStatus(profileData.mangalik),
  //   ...profileData.astrology_details,
  // };

  // Education and profession details
  const educationDetails = {};
  if (profileData.education_details) {
    if (profileData.education_details.education_level) {
      educationDetails["Education Level"] =
        formatValue(profileData.education_details.education_level);
    }
    if (profileData.education_details.education_field) {
      educationDetails["Field of Study"] =
        formatValue(profileData.education_details.education_field);
    }
    if (profileData.education_details.college_details?.name) {
      educationDetails["College"] =
        profileData.education_details.college_details.name;
    }
    if (profileData.education_details.college_details?.city) {
      educationDetails["College City"] =
        profileData.education_details.college_details.city;
    }
    if (profileData.education_details.college_details?.passout_year) {
      educationDetails["Passout Year"] =
        profileData.education_details.college_details.passout_year;
    }
    if (profileData.education_details.additional_info) {
      educationDetails["Additional Information"] =
        profileData.education_details.additional_info;
    }
  }

  // Profession details
  const professionDetails = {};
  if (profileData.profession_details) {
    if (profileData.profession_details.occupation) {
      professionDetails["Occupation"] =
        profileData.profession_details.occupation;
    }
    if (profileData.profession_details.designation) {
      professionDetails["Designation"] =
        profileData.profession_details.designation;
    }
    if (profileData.profession_details.working_with) {
      professionDetails["Working With"] =
        profileData.profession_details.working_with;
    }
    if (profileData.profession_details.income) {
      professionDetails["Annual Income"] =
        profileData.profession_details.income;
    }
    if (profileData.profession_details.work_address?.city) {
      professionDetails["Work City"] =
        profileData.profession_details.work_address.city;
    }
    if (profileData.profession_details.work_address?.address) {
      professionDetails["Work Address"] =
        profileData.profession_details.work_address.address;
    }
    if (profileData.profession_details.additional_info) {
      professionDetails["Additional Information"] =
        profileData.profession_details.additional_info;
    }
  }

  // Family details
  const familyDetails = {};
  if (profileData.family_details) {
    if (profileData.family_details.family_type) {
      familyDetails["Family Type"] = profileData.family_details.family_type;
    }
    if (profileData.family_details.family_value) {
      familyDetails["Family Values"] = profileData.family_details.family_value;
    }
    if (profileData.family_details.father?.name) {
      familyDetails["Father"] = profileData.family_details.father.name;
    }
    if (profileData.family_details.father?.occupation) {
      familyDetails["Father's Occupation"] =
        profileData.family_details.father.occupation;
    }
    if (profileData.family_details.mother?.name) {
      familyDetails["Mother"] = profileData.family_details.mother.name;
    }
    if (profileData.family_details.mother?.occupation) {
      familyDetails["Mother's Occupation"] =
        profileData.family_details.mother.occupation;
    }
    if (profileData.family_details.siblings) {
      const brothers = profileData.family_details.siblings.brother_count || 0;
      const sisters = profileData.family_details.siblings.sister_count || 0;
      familyDetails[
        "Siblings"
      ] = `${brothers} Brother(s), ${sisters} Sister(s)`;
    }
  }

  // Add permanent address and city from user location
  if (profileData.location?.address) {
    familyDetails["Permanent Address"] = profileData.location.address;
  }
  if (profileData.location?.city) {
    familyDetails["City"] = profileData.location.city;
  }

  const getCardVariants = () => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  });

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-6xl px-6 pt-8">
        <Button variant="outline" onClick={handleGoBack} className="gap-2">
          <FaArrowLeft /> Back to search
        </Button>
        <header className="mt-10 mb-8 text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Profile
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-brown sm:text-5xl">
            {profileData.name}
          </h1>
        </header>
      </div>

      {/* ProfilePhotosLayout Component - Replaces previous slideshow implementation */}
      <ProfilePhotosLayout photos={profileData.profile_pictures} />

      {/* About & Looking For section: placed between gallery and details */}
      {(() => {
        const about = (profileData.about_myself ?? "").trim();
        const looking = (profileData.looking_for ?? "").trim();
        const showSection = about.length > 0 || looking.length > 0;
        return (
          showSection && (
            <AboutLookingSection aboutMyself={about} lookingFor={looking} />
          )
        );
      })()}

      {/* Profile Details Sections - Masonry Layout */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 w-full px-8 md:px-16 mb-20 mt-8">
        {contactIntroRequired && (
          <motion.div
            variants={getCardVariants("basicDetails")}
            initial="initial"
            animate="animate"
            className="mb-8 inline-block w-full break-inside-avoid rounded-2xl border p-6 shadow-[0_12px_30px_rgba(79,47,29,0.08)]"
            style={{
              backgroundColor: "#FFFDF8",
              borderColor: "#D8C5B8",
            }}
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5EDE7] text-[#990000]">
                <FaLock aria-hidden="true" />
              </div>
              <div>
                <h3
                  className="text-xl"
                  style={{
                    fontFamily: "'Tiempos Headline', serif",
                    fontWeight: 400,
                    color: "#4F2F1D",
                  }}
                >
                  Introductions are handled by support
                </h3>
                <p
                  className="mt-1 text-base leading-relaxed text-[#6B4132]"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {profileData.contact_message ||
                    "For an introduction, please contact Punjabi Rishtey support."}
                </p>
              </div>
            </div>
            {renderSupportLinks()}
          </motion.div>
        )}

        {/* Basic Details */}
        <motion.div
          variants={getCardVariants("basicDetails")}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-8 rounded-xl shadow-lg transition-all break-inside-avoid mb-8 inline-block w-full"
          style={{
            backgroundColor: cardColorSchemes.basicDetails.bg,
            borderColor: cardColorSchemes.basicDetails.border,
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <h3
            className="text-2xl mb-4 flex items-center"
            style={{
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
              color: cardColorSchemes.basicDetails.title,
            }}
          >
            <FaUser
              className="mr-2"
              style={{ color: cardColorSchemes.basicDetails.icon }}
            />{" "}
            Basic Details
          </h3>
          <div className="space-y-2">
            {Object.entries(basicDetails).map(([key, value]) => (
              <p
                key={key}
                className="text-lg"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                <strong style={{ color: cardColorSchemes.basicDetails.label }}>
                  {key}:
                </strong>
                <span
                  style={{ color: cardColorSchemes.basicDetails.value }}
                  className="ml-2"
                >
                  {value}
                </span>
              </p>
            ))}
          </div>
        </motion.div>

        {/* Lifestyle Details */}
        <motion.div
          variants={getCardVariants("lifestyle")}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-8 rounded-xl shadow-lg transition-all break-inside-avoid mb-8 inline-block w-full"
          style={{
            backgroundColor: cardColorSchemes.lifestyle.bg,
            borderColor: cardColorSchemes.lifestyle.border,
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <h3
            className="text-2xl mb-4 flex items-center"
            style={{
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
              color: cardColorSchemes.lifestyle.title,
            }}
          >
            <FaHeart
              className="mr-2"
              style={{ color: cardColorSchemes.lifestyle.icon }}
            />{" "}
            Lifestyle
          </h3>
          <div className="space-y-2">
            {Object.entries(lifestyleDetails).map(([key, value]) => (
              <p
                key={key}
                className="text-lg"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                <strong style={{ color: cardColorSchemes.lifestyle.label }}>
                  {key}:
                </strong>
                <span
                  style={{ color: cardColorSchemes.lifestyle.value }}
                  className="ml-2"
                >
                  {value}
                </span>
              </p>
            ))}
          </div>
        </motion.div>

        {/* Hobbies Details */}
        {Object.keys(hobbiesDetails).length > 0 &&
          hobbiesDetails.Hobbies !== "Not specified" && (
            <motion.div
              variants={getCardVariants("basicDetails")}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="p-8 rounded-xl shadow-lg transition-all break-inside-avoid mb-8 inline-block w-full"
              style={{
                backgroundColor: cardColorSchemes.basicDetails.bg,
                borderColor: cardColorSchemes.basicDetails.border,
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            >
              <h3
                className="text-2xl mb-4 flex items-center"
                style={{
                  fontFamily: "'Tiempos Headline', serif",
                  fontWeight: 400,
                  color: cardColorSchemes.basicDetails.title,
                }}
              >
                <FaUser
                  className="mr-3"
                  style={{ color: cardColorSchemes.basicDetails.icon }}
                />
                Hobbies & Interests
              </h3>
              <div className="space-y-2">
                {Object.entries(hobbiesDetails).map(([key, value]) => (
                  <p
                    key={key}
                    className="text-lg"
                    style={{
                      fontFamily: "'Modern Era', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    <strong
                      style={{ color: cardColorSchemes.basicDetails.label }}
                    >
                      {key}:
                    </strong>
                    <span
                      style={{ color: cardColorSchemes.basicDetails.value }}
                      className="ml-2"
                    >
                      {value}
                    </span>
                  </p>
                ))}
              </div>
            </motion.div>
          )}

        {/* Horoscope Details */}
        <motion.div
          variants={getCardVariants("horoscope")}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-8 rounded-xl shadow-lg transition-all break-inside-avoid mb-8 inline-block w-full"
          style={{
            backgroundColor: cardColorSchemes.horoscope.bg,
            borderColor: cardColorSchemes.horoscope.border,
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <h3
            className="text-2xl mb-4 flex items-center"
            style={{
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
              color: cardColorSchemes.horoscope.title,
            }}
          >
            <FaHeart
              className="mr-2"
              style={{ color: cardColorSchemes.horoscope.icon }}
            />{" "}
            Horoscope
          </h3>
          <div className="space-y-2">
            <p
              className="text-lg"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              <strong style={{ color: cardColorSchemes.horoscope.label }}>
                Manglik Status:
              </strong>
              <span
                style={{ color: cardColorSchemes.horoscope.value }}
                className="ml-2"
              >
                {formatManglikStatus(profileData.mangalik)}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Education Details */}
        {Object.keys(educationDetails).length > 0 && (
          <motion.div
            variants={getCardVariants("education")}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="p-8 rounded-xl shadow-lg transition-all break-inside-avoid mb-8 inline-block w-full"
            style={{
              backgroundColor: cardColorSchemes.education.bg,
              borderColor: cardColorSchemes.education.border,
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <h3
              className="text-2xl mb-4 flex items-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
                color: cardColorSchemes.education.title,
              }}
            >
              <FaGraduationCap
                className="mr-2"
                style={{ color: cardColorSchemes.education.icon }}
              />{" "}
              Education
            </h3>
            <div className="space-y-2">
              {Object.entries(educationDetails).map(([key, value]) => (
                key === "Additional Information" ? (
                  <div key={key} className="mt-4 pt-4 border-t" style={{ borderColor: cardColorSchemes.education.border }}>
                    <strong
                      className="block text-lg mb-2"
                      style={{ color: cardColorSchemes.education.label }}
                    >
                      {key}:
                    </strong>
                    <p
                      className="text-base whitespace-pre-wrap"
                      style={{
                        fontFamily: "'Modern Era', sans-serif",
                        fontWeight: 400,
                        color: cardColorSchemes.education.value,
                      }}
                    >
                      {value || "Not specified"}
                    </p>
                  </div>
                ) : (
                  <p
                    key={key}
                    className="text-lg"
                    style={{
                      fontFamily: "'Modern Era', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    <strong style={{ color: cardColorSchemes.education.label }}>
                      {key}:
                    </strong>
                    <span
                      style={{ color: cardColorSchemes.education.value }}
                      className="ml-2"
                    >
                      {value || "Not specified"}
                    </span>
                  </p>
                )
              ))}
            </div>
          </motion.div>
        )}

        {/* Profession Details */}
        {Object.keys(professionDetails).length > 0 && (
          <motion.div
            variants={getCardVariants("profession")}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="p-8 rounded-xl shadow-lg transition-all break-inside-avoid mb-8 inline-block w-full"
            style={{
              backgroundColor: cardColorSchemes.profession.bg,
              borderColor: cardColorSchemes.profession.border,
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <h3
              className="text-2xl mb-4 flex items-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
                color: cardColorSchemes.profession.title,
              }}
            >
              <FaGraduationCap
                className="mr-2"
                style={{ color: cardColorSchemes.profession.icon }}
              />{" "}
              Profession
            </h3>
            <div className="space-y-2">
              {Object.entries(professionDetails).map(([key, value]) => (
                key === "Additional Information" ? (
                  <div key={key} className="mt-4 pt-4 border-t" style={{ borderColor: cardColorSchemes.profession.border }}>
                    <strong
                      className="block text-lg mb-2"
                      style={{ color: cardColorSchemes.profession.label }}
                    >
                      {key}:
                    </strong>
                    <p
                      className="text-base whitespace-pre-wrap"
                      style={{
                        fontFamily: "'Modern Era', sans-serif",
                        fontWeight: 400,
                        color: cardColorSchemes.profession.value,
                      }}
                    >
                      {value || "Not specified"}
                    </p>
                  </div>
                ) : (
                  <p
                    key={key}
                    className="text-lg"
                    style={{
                      fontFamily: "'Modern Era', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    <strong style={{ color: cardColorSchemes.profession.label }}>
                      {key}:
                    </strong>
                    <span
                      style={{ color: cardColorSchemes.profession.value }}
                      className="ml-2"
                    >
                      {value || "Not specified"}
                    </span>
                  </p>
                )
              ))}
            </div>
          </motion.div>
        )}

        {/* Family Details */}
        {Object.keys(familyDetails).length > 0 && (
          <motion.div
            variants={getCardVariants("family")}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="p-8 rounded-xl shadow-lg transition-all break-inside-avoid mb-8 inline-block w-full"
            style={{
              backgroundColor: cardColorSchemes.family.bg,
              borderColor: cardColorSchemes.family.border,
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <h3
              className="text-2xl mb-4 flex items-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
                color: cardColorSchemes.family.title,
              }}
            >
              <FaUsers
                className="mr-2"
                style={{ color: cardColorSchemes.family.icon }}
              />{" "}
              Family
            </h3>
            <div className="space-y-2">
              {Object.entries(familyDetails).map(([key, value]) => (
                <p
                  key={key}
                  className="text-lg"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  <strong style={{ color: cardColorSchemes.family.label }}>
                    {key}:
                  </strong>
                  <span
                    style={{ color: cardColorSchemes.family.value }}
                    className="ml-2"
                  >
                    {value || "Not specified"}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Contact Actions */}
      <div className="flex justify-center mb-20">
        {user && user._id === profileData._id && (
          <button
            className="bg-[#4F2F1D] hover:bg-[#6B4132] text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            Edit Profile
          </button>
        )}
      </div>

    </PageShell>
  );
};

export default ProfileDetail;
