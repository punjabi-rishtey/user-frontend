import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageShell from "./PageShell";
import MembershipRequired from "./MembershipRequired";
import { Button } from "@/components/ui/button";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  apiUrl,
  SUPPORT_PHONE_LINK,
  SUPPORT_PHONE_NUMBER,
  SUPPORT_WHATSAPP_LINK,
} from "../config/constants";
import ViewShell from "./profile/view/ViewShell";
import ViewSection from "./profile/view/ViewSection";
import SupportLinks from "./profile/view/SupportLinks";
import {
  calculateAge,
  formatAbroadReady,
  formatDate,
  formatDietPreference,
  formatManglikStatus,
  formatNRIStatus,
  formatOption,
  formatRaw,
  factsFromEntries,
} from "./profile/view/formatters";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function possessivePronoun(gender) {
  const g = String(gender || "").toLowerCase();
  if (g === "female") return { own: "her", looking: "she's", who: "she" };
  if (g === "male") return { own: "his", looking: "he's", who: "he" };
  return { own: "their", looking: "they're", who: "they" };
}

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const reducedMotion = usePrefersReducedMotion();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });

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
  }, [id, navigate, reducedMotion]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const scrollToSection = (sectionId) => {
    setActiveSectionId(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: profileData?.name
            ? `${profileData.name} · Punjabi Rishtey`
            : "Punjabi Rishtey profile",
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
    } catch {
      // User cancelled share or clipboard unavailable — ignore
    }
  };

  useEffect(() => {
    if (!profileData) return undefined;

    const ids = ["about", "who", "family", "work", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] }
    );

    ids.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [profileData]);

  const built = useMemo(() => {
    if (!profileData) return null;

    const contactIntroRequired =
      profileData.contact_access === "admin_intro_required";
    const pronouns = possessivePronoun(profileData.gender);

    const age = calculateAge(profileData.dob);
    const city =
      formatRaw(profileData.location?.city) ||
      formatRaw(profileData.profession_details?.work_address?.city);
    const caste = formatOption(profileData.caste);
    const profession =
      formatOption(profileData.profession_details?.occupation) ||
      formatRaw(profileData.profession_details?.occupation);

    const identityLine = [
      age ? `${age} years` : null,
      city,
      caste,
      profession,
    ]
      .filter(Boolean)
      .join("  ·  ");

    const about = (profileData.about_myself ?? "").trim();
    const looking = (profileData.looking_for ?? "").trim();

    const disability =
      profileData.physical_attributes?.physical_disability === true
        ? "Yes"
        : profileData.physical_attributes?.physical_disability === false
          ? "No"
          : null;

    const whoFacts = factsFromEntries([
      { label: "Date of Birth", value: formatDate(profileData.dob) },
      { label: "Gender", value: formatOption(profileData.gender) },
      { label: "Height", value: formatRaw(profileData.height) },
      { label: "Religion", value: formatOption(profileData.religion) },
      { label: "Caste", value: caste },
      { label: "Language", value: formatRaw(profileData.language) },
      {
        label: "Marital Status",
        value: formatOption(profileData.marital_status),
      },
      {
        label: "Birth Time",
        value: formatRaw(profileData.birth_details?.birth_time),
      },
      {
        label: "Birth Place",
        value: formatRaw(profileData.birth_details?.birth_place),
      },
      {
        label: "Skin Tone",
        value: formatOption(profileData.physical_attributes?.skin_tone),
      },
      {
        label: "Body Type",
        value: formatOption(profileData.physical_attributes?.body_type),
      },
      { label: "Physical Disability", value: disability },
      {
        label: "Smoke",
        value: formatRaw(profileData.lifestyle?.smoke) || null,
      },
      {
        label: "Drink",
        value: formatRaw(profileData.lifestyle?.drink) || null,
      },
      {
        label: "Diet",
        value: formatDietPreference(profileData.lifestyle?.veg_nonveg),
      },
      {
        label: "NRI Status",
        value: formatNRIStatus(profileData.lifestyle?.nri_status),
      },
      {
        label: "Ready to move Abroad",
        value: formatAbroadReady(profileData.lifestyle?.abroad_ready),
      },
      {
        label: "Manglik Status",
        value: formatManglikStatus(profileData.mangalik),
      },
      {
        label: "Hobbies",
        value:
          Array.isArray(profileData.hobbies) && profileData.hobbies.length > 0
            ? profileData.hobbies.join(", ")
            : null,
        multiline: true,
      },
    ]);

    const ed = profileData.education_details;
    const pr = profileData.profession_details;
    const workFacts = factsFromEntries([
      { label: "Education Level", value: formatOption(ed?.education_level) },
      { label: "Field of Study", value: formatOption(ed?.education_field) },
      { label: "College", value: formatRaw(ed?.college_details?.name) },
      { label: "College City", value: formatRaw(ed?.college_details?.city) },
      {
        label: "Passout Year",
        value: formatRaw(ed?.college_details?.passout_year),
      },
      {
        label: "Education notes",
        value: formatRaw(ed?.additional_info),
        multiline: true,
      },
      {
        label: "Occupation",
        value: formatOption(pr?.occupation) || formatRaw(pr?.occupation),
      },
      { label: "Designation", value: formatRaw(pr?.designation) },
      { label: "Working With", value: formatRaw(pr?.working_with) },
      { label: "Annual Income", value: formatRaw(pr?.income) },
      { label: "Work City", value: formatRaw(pr?.work_address?.city) },
      { label: "Work Address", value: formatRaw(pr?.work_address?.address) },
      {
        label: "Work notes",
        value: formatRaw(pr?.additional_info),
        multiline: true,
      },
    ]);

    const fam = profileData.family_details;
    let siblings = null;
    if (fam?.siblings) {
      const brothers = fam.siblings.brother_count ?? 0;
      const sisters = fam.siblings.sister_count ?? 0;
      if (brothers > 0 || sisters > 0) {
        siblings = `${brothers} Brother(s), ${sisters} Sister(s)`;
      }
    }

    const familyFacts = factsFromEntries([
      { label: "Family Type", value: formatOption(fam?.family_type) },
      { label: "Family Values", value: formatOption(fam?.family_value) },
      { label: "Father", value: formatRaw(fam?.father?.name) },
      {
        label: "Father's Occupation",
        value: formatRaw(fam?.father?.occupation),
      },
      { label: "Mother", value: formatRaw(fam?.mother?.name) },
      {
        label: "Mother's Occupation",
        value: formatRaw(fam?.mother?.occupation),
      },
      { label: "Siblings", value: siblings },
      {
        label: "Permanent Address",
        value: formatRaw(profileData.location?.address),
      },
      { label: "City", value: formatRaw(profileData.location?.city) },
    ]);

    const contactFacts = contactIntroRequired
      ? []
      : factsFromEntries([
          { label: "Email", value: formatRaw(profileData.email) },
          { label: "Mobile", value: formatRaw(profileData.mobile) },
          {
            label: "Secondary Contact",
            value: formatRaw(profileData.secondary_contact),
          },
        ]);

    const whoTitle =
      pronouns.who === "they"
        ? "Who they are"
        : `Who ${pronouns.who} is`;

    const navSections = [];
    if (about || looking) navSections.push({ id: "about", label: "About" });
    if (whoFacts.length) navSections.push({ id: "who", label: whoTitle });
    if (familyFacts.length) navSections.push({ id: "family", label: "Family" });
    if (workFacts.length)
      navSections.push({ id: "work", label: "Education & work" });
    if (contactFacts.length || contactIntroRequired)
      navSections.push({ id: "contact", label: "Contact" });

    return {
      contactIntroRequired,
      identityLine,
      about,
      looking,
      whoFacts,
      whoTitle,
      familyFacts,
      workFacts,
      contactFacts,
      navSections,
      pronouns,
      photos: Array.isArray(profileData.profile_pictures)
        ? profileData.profile_pictures.filter(Boolean)
        : [],
    };
  }, [profileData]);

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
                  {isPrivateProfileError
                    ? "Profile unavailable"
                    : "Something went wrong"}
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
                <SupportLinks />
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

  if (!profileData || !built) {
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

  const {
    contactIntroRequired,
    identityLine,
    about,
    looking,
    whoFacts,
    whoTitle,
    familyFacts,
    workFacts,
    contactFacts,
    navSections,
    pronouns,
    photos,
  } = built;

  const aboutHeading = `In ${pronouns.own} own words`;
  const lookingHeading =
    pronouns.looking === "they're"
      ? "What they're looking for"
      : `What ${pronouns.looking} looking for`;

  return (
    <PageShell>
      <ViewShell
        photos={photos}
        sections={navSections}
        activeSectionId={activeSectionId || navSections[0]?.id}
        onSelectSection={scrollToSection}
        memberName={profileData.name}
        identityLine={identityLine}
      >
        <button
          type="button"
          onClick={handleGoBack}
          className="inline-flex min-h-11 items-center px-1 text-sm font-medium text-muted-foreground transition-colors hover:text-brown"
        >
          ← Back to search
        </button>

        {/* Desktop identity band — mobile gets name via portrait scrim */}
        <div className="mt-5 hidden -mx-0 rounded-xl bg-brown-deep px-6 py-8 sm:px-9 sm:py-10 lg:block">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-ivory/55 uppercase">
            Punjabi Rishtey member
          </p>
          <h1 className="mt-3 font-display text-[2.75rem] leading-[1.05] font-semibold tracking-[-0.01em] text-ivory sm:text-6xl">
            {profileData.name}
          </h1>
          {identityLine ? (
            <p className="mt-4 text-[17px] leading-relaxed text-ivory/80">
              {identityLine}
            </p>
          ) : null}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="min-w-[13rem]"
              onClick={() => scrollToSection("contact")}
            >
              Request an introduction
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-ivory/35 bg-transparent text-ivory hover:bg-ivory hover:text-brown"
              onClick={handleShare}
            >
              Share with family
            </Button>
          </div>
        </div>

        {/* Mobile CTAs under portrait */}
        <div className="mt-5 flex flex-col gap-3 lg:hidden">
          <Button
            size="lg"
            className="w-full"
            onClick={() => scrollToSection("contact")}
          >
            Request an introduction
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={handleShare}
          >
            Share with family
          </Button>
        </div>

        <div className="mt-8 space-y-5">
          {(about || looking) && (
            <section id="about" className="scroll-mt-28 space-y-5">
              {about ? (
                <div className="rounded-xl border border-brown/10 bg-card p-6 sm:p-9">
                  <h2 className="font-display text-[1.6rem] font-semibold text-brown">
                    {aboutHeading}
                  </h2>
                  <div className="mt-3 h-px w-12 bg-maroon" aria-hidden />
                  <p className="mt-5 font-display text-[1.3rem] leading-[1.6] whitespace-pre-line text-brown-deep">
                    {about}
                  </p>
                </div>
              ) : null}
              {looking ? (
                <div className="rounded-xl border border-brown/10 bg-card p-6 sm:p-9">
                  <h2 className="font-display text-[1.6rem] font-semibold text-brown">
                    {lookingHeading}
                  </h2>
                  <div className="mt-3 h-px w-12 bg-maroon" aria-hidden />
                  <p className="mt-5 font-display text-[1.3rem] leading-[1.6] whitespace-pre-line text-brown-deep">
                    {looking}
                  </p>
                </div>
              ) : null}
            </section>
          )}

          <ViewSection id="who" title={whoTitle} facts={whoFacts} />
          <ViewSection id="family" title="Family" facts={familyFacts} />
          <ViewSection
            id="work"
            title="Education & work"
            facts={workFacts}
          />

          {(contactFacts.length > 0 || contactIntroRequired) && (
            <section id="contact" className="scroll-mt-28">
              {contactIntroRequired ? (
                <div className="rounded-xl bg-brown-deep px-6 py-8 sm:px-9 sm:py-10">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-ivory/55 uppercase">
                    Private profile
                  </p>
                  <h2 className="mt-3 font-display text-[1.75rem] font-semibold text-ivory sm:text-3xl">
                    Introductions are made personally
                  </h2>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ivory/75">
                    {profileData.contact_message ||
                      "This family has asked us to handle first contact. Tell us you're interested and we'll introduce you."}
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={SUPPORT_PHONE_LINK}
                      className="inline-flex min-h-12 items-center justify-center rounded-lg bg-maroon px-6 text-base font-semibold text-primary-foreground hover:bg-[#7a0000]"
                    >
                      Call {SUPPORT_PHONE_NUMBER}
                    </a>
                    <a
                      href={SUPPORT_WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 items-center justify-center rounded-lg border border-ivory/35 px-6 text-base font-semibold text-ivory hover:bg-ivory hover:text-brown"
                    >
                      WhatsApp us
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-brown/10 bg-card p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <h2 className="font-sans text-[11px] font-semibold tracking-[0.2em] text-maroon uppercase">
                      Contact
                    </h2>
                    <span className="h-px flex-1 bg-brown/10" aria-hidden />
                  </div>
                  <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                    {contactFacts.map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-[13px] tracking-[0.06em] text-muted-foreground uppercase">
                          {label}
                        </dt>
                        <dd className="mt-1 text-[17px] leading-snug font-medium break-words text-brown-deep">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 border-t border-brown/10 pt-5">
                    <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                      Prefer an introduction?
                    </p>
                    <SupportLinks />
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </ViewShell>
    </PageShell>
  );
};

export default ProfileDetail;
