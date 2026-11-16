import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { useAuth } from "@/context/AuthContext";
import { apiUrl } from "@/config/constants";
import { authApi, authFetch, isSessionExpiryError } from "@/config/authClient";
import StudioShell, { UnsavedChangesDialog } from "./profile/studio/StudioShell";
import { FLOW_SECTION_IDS } from "./profile/studio/constants";
import { openSectionIds } from "./profile/studio/sectionStatus";
import AccountSection from "./profile/studio/AccountSection";
import PhotosChapter from "./profile/dossier/PhotosChapter";
import IdentityChapter from "./profile/dossier/IdentityChapter";
import AboutChapter from "./profile/dossier/AboutChapter";
import LifestyleChapter from "./profile/dossier/LifestyleChapter";
import FamilyChapter from "./profile/dossier/FamilyChapter";
import EducationChapter from "./profile/dossier/EducationChapter";
import ProfessionChapter from "./profile/dossier/ProfessionChapter";
import AstrologyChapter from "./profile/dossier/AstrologyChapter";
import {
  DeleteAccountModal,
  PasswordModal,
} from "./profile/dossier/AccountModals";

const emptyIdentity = {
  fullName: "",
  mobile: "",
  secondary_contact: "",
  email: "",
  gender: "",
  dob: "",
  religion: "",
  marital_status: "",
  age: "",
};

function parseContentRejected(error) {
  const data = error?.response?.data;
  if (!data || data.code !== "content_rejected") return null;
  const fields = data.fields && typeof data.fields === "object" ? data.fields : {};
  const messages = Object.values(fields)
    .map((entry) => entry?.message)
    .filter(Boolean);
  return {
    fields: Object.fromEntries(
      Object.entries(fields).map(([key, entry]) => [key, entry?.message || ""])
    ),
    message:
      messages[0] ||
      data.message ||
      "Please revise the highlighted fields and try again.",
  };
}

const emptyLifestyle = {
  height: { feet: "", inches: "" },
  caste: "",
  language: "",
  manglik: "",
  birth_details: { birth_time: "", birth_place: "" },
  physical_attributes: {
    skin_tone: "",
    body_type: "",
    physical_disability: "",
    disability_reason: "",
  },
  lifestyle: {
    smoke: "",
    drink: "",
    veg_nonveg: "",
    nri_status: "",
    abroad_ready: "",
  },
  home_address: { address: "", city: "" },
};

const emptyFamily = {
  family_value: "",
  family_type: "",
  mother: { name: "", occupation: "" },
  father: { name: "", occupation: "" },
  siblings: { brother_count: 0, sister_count: 0 },
};

const emptyEducation = {
  education_level: "",
  education_field: "",
  college_details: { name: "", city: "" },
  additional_info: "",
};

const emptyProfession = {
  occupation: "",
  designation: "",
  working_with: "",
  income: "",
  work_address: { address: "", city: "" },
  additional_info: "",
};

const emptyAstrology = {
  rashi_nakshatra: "",
  gotra: "",
};

function parseHeight(heightString) {
  if (!heightString) return { feet: "", inches: "" };
  if (typeof heightString === "object" && heightString !== null) {
    return {
      feet: heightString.feet != null ? String(heightString.feet) : "",
      inches: heightString.inches != null ? String(heightString.inches) : "",
    };
  }
  const match = String(heightString).match(/(\d+)'(\d+)"/);
  return match
    ? { feet: match[1], inches: match[2] }
    : { feet: "", inches: "" };
}

function normalizeHabit(value) {
  if (value === true || value === "true" || value === "yes") return "yes";
  if (value === false || value === "false" || value === "no") return "no";
  if (value === "occasionally") return "occasionally";
  return value || "";
}

function normalizeBoolSelect(value) {
  if (value === true || value === "true") return "true";
  if (value === false || value === "false") return "false";
  return "";
}

function normalizeManglikFromUser(userData) {
  const hasMangalik =
    userData.mangalik !== undefined && userData.mangalik !== null;
  const raw = hasMangalik ? userData.mangalik : userData.manglik;
  if (raw === true || raw === "true") return "manglik";
  if (raw === false || raw === "false") return "non_manglik";
  if (raw === "partial" || raw === "partial_manglik") return "partial_manglik";
  if (typeof raw === "string") return raw;
  return "";
}

function setNested(prev, name, value) {
  if (!name.includes(".")) return { ...prev, [name]: value };
  const [section, field] = name.split(".");
  return {
    ...prev,
    [section]: { ...prev[section], [field]: value },
  };
}

function snapshot(value) {
  return JSON.stringify(value);
}

function normalizePortraitUrl(url) {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

export default function ProfileStudioPage() {
  const { user, logout, refreshUser, isAuthenticated } = useAuth();
  const profileUserId = user?._id ?? user?.id;
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);
  const [sectionId, setSectionId] = useState("pictures");
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [portraitUrl, setPortraitUrl] = useState("");
  const [completionPercent, setCompletionPercent] = useState(0);

  const [identity, setIdentity] = useState(emptyIdentity);
  const [about, setAbout] = useState({ about_myself: "", looking_for: "" });
  const [lifestyle, setLifestyle] = useState(emptyLifestyle);
  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState("");
  const [family, setFamily] = useState(emptyFamily);
  const [education, setEducation] = useState(emptyEducation);
  const [profession, setProfession] = useState(emptyProfession);
  const [astrology, setAstrology] = useState(emptyAstrology);

  const [pendingSectionId, setPendingSectionId] = useState(null);
  const [showUnsaved, setShowUnsaved] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const showNotice = useCallback((type, message) => {
    setNotice({ type, message });
  }, []);

  const sectionSnapshot = useMemo(() => {
    switch (sectionId) {
      case "identity":
        return snapshot(identity);
      case "about":
        return snapshot(about);
      case "lifestyle":
        return snapshot({ lifestyle, hobbies });
      case "family":
        return snapshot(family);
      case "education":
        return snapshot(education);
      case "profession":
        return snapshot(profession);
      case "astrology":
        return snapshot(astrology);
      default:
        return "";
    }
  }, [
    sectionId,
    identity,
    about,
    lifestyle,
    hobbies,
    family,
    education,
    profession,
    astrology,
  ]);

  // Set during render so a section change is clean before the buttons paint.
  const baselineRef = useRef(null);
  if (!baselineRef.current || baselineRef.current.id !== sectionId) {
    baselineRef.current = { id: sectionId, snapshot: sectionSnapshot };
  }

  const isDirty =
    sectionId !== "pictures" &&
    sectionId !== "account" &&
    sectionSnapshot !== baselineRef.current.snapshot;

  const openSections = useMemo(
    () =>
      openSectionIds({
        portraitUrl,
        identity,
        about,
        lifestyle,
        family,
        education,
        profession,
        astrology,
      }),
    [
      portraitUrl,
      identity,
      about,
      lifestyle,
      family,
      education,
      profession,
      astrology,
    ]
  );

  const refreshCompletion = useCallback(async () => {
    try {
      const res = await authApi.get(apiUrl("/api/users/profile-completion"));
      const pct = res.data?.completionPercentage;
      if (typeof pct === "number" && !Number.isNaN(pct)) {
        setCompletionPercent(Math.round(pct));
      }
    } catch (error) {
      if (isSessionExpiryError(error)) return;
    }
  }, []);

  const applyUserPayload = (userData) => {
    setIdentity({
      fullName: userData.name || "",
      mobile: userData.mobile || "",
      secondary_contact: userData.secondary_contact || "",
      email: userData.email || "",
      gender: userData.gender || "",
      dob: userData.dob || "",
      religion: userData.religion || "",
      marital_status: userData.marital_status || "",
      age: userData.age || "",
    });
    setAbout({
      about_myself: userData.about_myself || "",
      looking_for: userData.looking_for || "",
    });
    setLifestyle({
      height: parseHeight(userData.height),
      caste: userData.caste || "",
      language: userData.language || "",
      manglik: normalizeManglikFromUser(userData),
      birth_details: {
        birth_time: userData.birth_details?.birth_time || "",
        birth_place: userData.birth_details?.birth_place || "",
      },
      physical_attributes: {
        skin_tone: userData.physical_attributes?.skin_tone || "",
        body_type: userData.physical_attributes?.body_type || "",
        physical_disability: normalizeBoolSelect(
          userData.physical_attributes?.physical_disability
        ),
        disability_reason:
          userData.physical_attributes?.disability_reason || "",
      },
      lifestyle: {
        smoke: normalizeHabit(userData.lifestyle?.smoke),
        drink: normalizeHabit(userData.lifestyle?.drink),
        veg_nonveg: userData.lifestyle?.veg_nonveg || "",
        nri_status: normalizeBoolSelect(userData.lifestyle?.nri_status),
        abroad_ready: normalizeBoolSelect(userData.lifestyle?.abroad_ready),
      },
      home_address: {
        address: userData.location?.address || "",
        city: userData.location?.city || "",
      },
    });
    setHobbies(
      Array.isArray(userData.hobbies)
        ? userData.hobbies.filter((hobby) => hobby && hobby !== "None")
        : []
    );
    const pictures = Array.isArray(userData.profile_pictures)
      ? userData.profile_pictures.filter(Boolean)
      : [];
    setPortraitUrl(
      normalizePortraitUrl(userData.profile_picture || pictures[0] || "")
    );
  };

  const loadAll = useCallback(async () => {
    if (!profileUserId) return;
    setLoading(true);
    setLoadFailed(false);
    try {
      const [userRes, familyRes, educationRes, professionRes, astrologyRes] =
        await Promise.allSettled([
          authApi.get(apiUrl(`/api/users/${profileUserId}`)),
          authApi.get(apiUrl(`/api/families/${profileUserId}`)),
          authApi.get(apiUrl(`/api/educations/${profileUserId}`)),
          authApi.get(apiUrl(`/api/professions/${profileUserId}`)),
          authApi.get(apiUrl(`/api/astrologies/${profileUserId}`)),
        ]);

      if (userRes.status !== "fulfilled") {
        if (userRes.reason && isSessionExpiryError(userRes.reason)) return;
        setLoadFailed(true);
        showNotice("error", "Could not load your profile. Please refresh.");
        return;
      }

      applyUserPayload(userRes.value.data);

      if (familyRes.status === "fulfilled") {
        const data = familyRes.value.data || {};
        setFamily({
          family_value: data.family_value || "",
          family_type: data.family_type || "",
          mother: {
            name: data.mother?.name || "",
            occupation: data.mother?.occupation || "",
          },
          father: {
            name: data.father?.name || "",
            occupation: data.father?.occupation || "",
          },
          siblings: {
            brother_count: data.siblings?.brother_count ?? 0,
            sister_count: data.siblings?.sister_count ?? 0,
          },
        });
      }

      if (educationRes.status === "fulfilled") {
        const data = educationRes.value.data || {};
        setEducation({
          education_level: data.education_level || "",
          education_field: data.education_field || "",
          college_details: {
            name: data.college_details?.name || data.college?.name || "",
            city: data.college_details?.city || data.college?.city || "",
          },
          additional_info: data.additional_info || "",
        });
      }

      if (professionRes.status === "fulfilled") {
        const data = professionRes.value.data || {};
        setProfession({
          occupation: data.occupation || "",
          designation: data.designation || "",
          working_with: data.working_with || "",
          income: data.income || "",
          work_address: {
            address: data.work_address?.address || "",
            city: data.work_address?.city || "",
          },
          additional_info: data.additional_info || "",
        });
      }

      if (astrologyRes.status === "fulfilled") {
        const data = astrologyRes.value.data || {};
        setAstrology({
          rashi_nakshatra: data.rashi_nakshatra || "",
          gotra: data.gotra || "",
        });
      }
      await refreshCompletion();
    } catch (error) {
      if (isSessionExpiryError(error)) return;
      if (error.response?.status === 403) {
        navigate("/login");
        return;
      }
      setLoadFailed(true);
      showNotice("error", "Could not load your profile. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [profileUserId, navigate, showNotice, refreshCompletion]);

  useEffect(() => {
    const timer = setTimeout(() => setAuthChecked(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [authChecked, isAuthenticated, navigate]);

  useEffect(() => {
    if (profileUserId) loadAll();
  }, [profileUserId, loadAll]);

  const goToSection = (nextId) => {
    setNotice(null);
    setFieldErrors({});
    setShowUnsaved(false);
    setPendingSectionId(null);
    setSectionId(nextId);
  };

  const requestSection = (nextId) => {
    if (nextId === sectionId) return;
    if (isDirty) {
      setPendingSectionId(nextId);
      setShowUnsaved(true);
      return;
    }
    goToSection(nextId);
  };

  const saveIdentity = async () => {
    await authApi.put(apiUrl(`/api/users/${profileUserId}`), {
      name: identity.fullName,
      email: identity.email,
      mobile: identity.mobile,
      secondary_contact: identity.secondary_contact,
      dob: identity.dob,
      gender: identity.gender,
      religion: identity.religion,
      marital_status: identity.marital_status,
    });
  };

  const saveAbout = async () => {
    await authApi.put(apiUrl(`/api/users/${profileUserId}`), {
      about_myself: about.about_myself || "",
      looking_for: about.looking_for || "",
    });
  };

  const saveLifestyle = async () => {
    const fixedLifestyle = { ...lifestyle.lifestyle };
    const ar = fixedLifestyle.abroad_ready;
    if (ar === "true" || ar === true) fixedLifestyle.abroad_ready = true;
    else if (ar === "false" || ar === false) fixedLifestyle.abroad_ready = false;
    else fixedLifestyle.abroad_ready = null;

    if (fixedLifestyle.nri_status === "true") fixedLifestyle.nri_status = true;
    else if (fixedLifestyle.nri_status === "false")
      fixedLifestyle.nri_status = false;

    const physical = { ...lifestyle.physical_attributes };
    if (physical.physical_disability === "true")
      physical.physical_disability = true;
    else if (physical.physical_disability === "false")
      physical.physical_disability = false;

    await authApi.put(apiUrl(`/api/users/${profileUserId}`), {
      height: lifestyle.height,
      language: lifestyle.language,
      manglik: lifestyle.manglik,
      caste: lifestyle.caste,
      birth_details: lifestyle.birth_details,
      physical_attributes: physical,
      lifestyle: fixedLifestyle,
      location: {
        city: lifestyle.home_address.city,
        address: lifestyle.home_address.address,
      },
      hobbies,
    });
  };

  const saveCurrentSection = async () => {
    if (sectionId === "pictures" || sectionId === "account") return true;
    setSaving(true);
    setFieldErrors({});
    try {
      switch (sectionId) {
        case "identity":
          await saveIdentity();
          break;
        case "about":
          await saveAbout();
          break;
        case "lifestyle":
          await saveLifestyle();
          break;
        case "family":
          await authApi.put(apiUrl(`/api/families/${profileUserId}`), family);
          break;
        case "education":
          await authApi.put(apiUrl(`/api/educations/${profileUserId}`), education);
          break;
        case "profession":
          await authApi.put(apiUrl(`/api/professions/${profileUserId}`), profession);
          break;
        case "astrology":
          await authApi.put(apiUrl(`/api/astrologies/${profileUserId}`), astrology);
          break;
        default:
          break;
      }
      await refreshUser?.();
      baselineRef.current = { id: sectionId, snapshot: sectionSnapshot };
      await refreshCompletion();
      showNotice("success", "Saved");
      return true;
    } catch (error) {
      if (isSessionExpiryError(error)) return false;
      const rejected = parseContentRejected(error);
      if (rejected) {
        setFieldErrors(rejected.fields);
        showNotice("error", rejected.message);
        return false;
      }
      showNotice(
        "error",
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Could not save this section."
      );
      return false;
    } finally {
      setSaving(false);
    }
  };

  const flowIndex = FLOW_SECTION_IDS.indexOf(sectionId);
  const inFlow = flowIndex >= 0;
  const canGoPrevious =
    sectionId === "account"
      ? true
      : inFlow && flowIndex > 0;
  const canGoNext = inFlow && flowIndex < FLOW_SECTION_IDS.length - 1;

  const handlePrevious = () => {
    if (sectionId === "account") {
      requestSection(FLOW_SECTION_IDS[FLOW_SECTION_IDS.length - 1]);
      return;
    }
    if (!canGoPrevious) return;
    requestSection(FLOW_SECTION_IDS[flowIndex - 1]);
  };

  const handleContinue = async () => {
    if (saving) return;
    if (isDirty) {
      const ok = await saveCurrentSection();
      if (!ok) return;
    }
    if (!canGoNext) return;
    goToSection(FLOW_SECTION_IDS[flowIndex + 1]);
  };

  const handleSaveUnsaved = async () => {
    const ok = await saveCurrentSection();
    if (!ok) return;
    if (pendingSectionId) goToSection(pendingSectionId);
  };

  const handleDiscardUnsaved = async () => {
    // Reload server truth for dirty section, then navigate
    await loadAll();
    if (pendingSectionId) goToSection(pendingSectionId);
  };

  const handlePasswordSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password must match.");
      return;
    }

    setLoadingPassword(true);
    setPasswordError("");
    try {
      await authApi.put(apiUrl("/api/users/change-password"), {
        currentPassword,
        newPassword,
      });
      setShowPasswordModal(false);
      showNotice("success", "Password updated. Please sign in again.");
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setPasswordError(
        error.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoadingDelete(true);
    try {
      const response = await authFetch(apiUrl("/api/users/me"), {
        method: "DELETE",
      });
      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to delete account");
      }
      setShowDeleteModal(false);
      logout();
      navigate("/");
    } catch (error) {
      if (isSessionExpiryError(error)) return;
      showNotice("error", "Could not delete the account. Please try again.");
      setShowDeleteModal(false);
    } finally {
      setLoadingDelete(false);
    }
  };

  const refreshPhotos = async () => {
    if (!profileUserId) return;
    try {
      const res = await authApi.get(apiUrl(`/api/users/${profileUserId}`));
      const data = res.data;
      const pictures = Array.isArray(data.profile_pictures)
        ? data.profile_pictures.filter(Boolean)
        : [];
      setPortraitUrl(
        normalizePortraitUrl(data.profile_picture || pictures[0] || "")
      );
      await refreshCompletion();
    } catch {
      // ignore
    }
  };

  if (!authChecked || !isAuthenticated) {
    return (
      <PageShell>
        <div className="flex min-h-[50vh] items-center justify-center px-4">
          <p className="text-brown">Loading your profile…</p>
        </div>
      </PageShell>
    );
  }

  if (!profileUserId || loading) {
    return (
      <PageShell>
        <div className="flex min-h-[50vh] items-center justify-center px-4">
          <p className="text-brown">Opening your profile…</p>
        </div>
      </PageShell>
    );
  }

  if (loadFailed) {
    return (
      <PageShell>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
          <p className="text-center text-brown">
            We could not load your profile. Please refresh and try again.
          </p>
          <button
            type="button"
            className="rounded-lg bg-maroon px-4 py-2 text-sm font-semibold text-primary-foreground"
            onClick={() => loadAll()}
          >
            Retry
          </button>
        </div>
      </PageShell>
    );
  }

  const showSave = sectionId !== "pictures" && sectionId !== "account";

  return (
    <PageShell>
      <StudioShell
        sectionId={sectionId}
        completionPercent={completionPercent}
        portraitUrl={portraitUrl}
        openSectionIds={openSections}
        notice={notice}
        onSelectSection={requestSection}
        onContinue={handleContinue}
        onPrevious={handlePrevious}
        showSave={showSave}
        isDirty={isDirty}
        saving={saving}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      >
        {sectionId === "pictures" ? (
          <PhotosChapter
            onStatus={(status) => {
              if (status?.type && status?.message) {
                showNotice(status.type, status.message);
              }
              if (status?.type === "success") {
                refreshUser?.();
                refreshPhotos();
              }
            }}
          />
        ) : null}

        {sectionId === "identity" ? (
          <IdentityChapter
            data={identity}
            fieldErrors={fieldErrors}
            onChange={(e) => {
              const { name, value } = e.target;
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                if (name === "fullName") delete next.name;
                return next;
              });
              setIdentity((prev) => ({ ...prev, [name]: value }));
            }}
          />
        ) : null}

        {sectionId === "about" ? (
          <AboutChapter
            data={about}
            fieldErrors={fieldErrors}
            onChange={(e) => {
              const { name, value } = e.target;
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
              });
              setAbout((prev) => ({ ...prev, [name]: value.slice(0, 300) }));
            }}
          />
        ) : null}

        {sectionId === "lifestyle" ? (
          <LifestyleChapter
            data={lifestyle}
            hobbies={hobbies}
            newHobby={newHobby}
            fieldErrors={fieldErrors}
            onChange={(e) => {
              const { name, value } = e.target;
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                if (name === "location.address") delete next["location.address"];
                return next;
              });
              setLifestyle((prev) => setNested(prev, name, value));
            }}
            onHobbyChange={(e) => setNewHobby(e.target.value)}
            onAddHobby={() => {
              const trimmed = newHobby.trim();
              if (!trimmed) return;
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next.hobbies;
                return next;
              });
              setHobbies((prev) => [...prev, trimmed]);
              setNewHobby("");
            }}
            onRemoveHobby={(hobby) => {
              setHobbies((prev) => prev.filter((item) => item !== hobby));
            }}
          />
        ) : null}

        {sectionId === "family" ? (
          <FamilyChapter
            data={family}
            fieldErrors={fieldErrors}
            onChange={(e) => {
              const { name, value } = e.target;
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
              });
              setFamily((prev) => setNested(prev, name, value));
            }}
          />
        ) : null}

        {sectionId === "education" ? (
          <EducationChapter
            data={education}
            fieldErrors={fieldErrors}
            onChange={(e) => {
              const { name, value } = e.target;
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
              });
              setEducation((prev) => setNested(prev, name, value));
            }}
          />
        ) : null}

        {sectionId === "profession" ? (
          <ProfessionChapter
            data={profession}
            fieldErrors={fieldErrors}
            onChange={(e) => {
              const { name, value } = e.target;
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
              });
              setProfession((prev) => setNested(prev, name, value));
            }}
          />
        ) : null}

        {sectionId === "astrology" ? (
          <AstrologyChapter
            data={astrology}
            onChange={(e) => {
              const { name, value } = e.target;
              setAstrology((prev) => ({ ...prev, [name]: value }));
            }}
          />
        ) : null}

        {sectionId === "account" ? (
          <AccountSection
            onChangePassword={() => {
              setPasswordError("");
              setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              });
              setShowPasswordModal(true);
            }}
            onLogout={() => {
              const confirmed = window.confirm("Do you want to log out?");
              if (!confirmed) return;
              logout();
              navigate("/");
            }}
            onDeleteAccount={() => setShowDeleteModal(true)}
          />
        ) : null}
      </StudioShell>

      <UnsavedChangesDialog
        open={showUnsaved}
        saving={saving}
        onSave={handleSaveUnsaved}
        onDiscard={handleDiscardUnsaved}
        onCancel={() => {
          setShowUnsaved(false);
          setPendingSectionId(null);
        }}
      />

      <PasswordModal
        open={showPasswordModal}
        form={passwordForm}
        error={passwordError}
        loading={loadingPassword}
        onChange={(e) => {
          const { name, value } = e.target;
          setPasswordForm((prev) => ({ ...prev, [name]: value }));
        }}
        onClose={() => {
          if (loadingPassword) return;
          setShowPasswordModal(false);
        }}
        onSubmit={handlePasswordSubmit}
      />

      <DeleteAccountModal
        open={showDeleteModal}
        loading={loadingDelete}
        onClose={() => {
          if (loadingDelete) return;
          setShowDeleteModal(false);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </PageShell>
  );
}
