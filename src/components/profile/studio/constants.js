export const SECTIONS = [
  {
    id: "pictures",
    label: "Pictures",
    title: "Pictures",
    guidance: "Families see your primary portrait first. Add clear, recent photos.",
  },
  {
    id: "identity",
    label: "Who you are",
    title: "Who you are",
    guidance: "The essentials that introduce you with clarity.",
  },
  {
    id: "about",
    label: "About",
    title: "About & looking for",
    guidance: "A few honest lines go further than a long list.",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    title: "Lifestyle & place",
    guidance: "How you live, and where home is.",
  },
  {
    id: "family",
    label: "Family",
    title: "Family",
    guidance: "Share the household that shapes your world.",
  },
  {
    id: "education",
    label: "Education",
    title: "Education",
    guidance: "Your studies, simply stated.",
  },
  {
    id: "profession",
    label: "Profession",
    title: "Profession",
    guidance: "Work and income as families expect to see them.",
  },
  {
    id: "astrology",
    label: "Astrology",
    title: "Astrology",
    guidance: "Optional details for families who value them.",
  },
  {
    id: "account",
    label: "Account",
    title: "Account",
    guidance: "Password, sign out, and account deletion.",
  },
];

export const COMPLETION_TARGET = 70;

/** Linear Previous/Next flow — Account is nav-only, not in this sequence. */
export const FLOW_SECTION_IDS = SECTIONS.filter((s) => s.id !== "account").map(
  (s) => s.id
);

