/** Format display values; returns null when empty so rows can be omitted. */

export function formatOption(value) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  const str = String(value).trim();
  if (!str) return null;
  return str
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatRaw(value) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  const str = String(value).trim();
  return str || null;
}

export function calculateAge(dob) {
  if (!dob) return null;
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age > 0 ? String(age) : null;
}

export function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatManglikStatus(value) {
  if (typeof value === "boolean") {
    return value ? "Manglik" : "Non Manglik";
  }
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    if (v === "manglik" || v === "true") return "Manglik";
    if (v === "non_manglik" || v === "false") return "Non Manglik";
    if (v === "partial_manglik") return "Partial Manglik";
    if (!v) return null;
  }
  if (value === null || value === undefined || value === "") return null;
  return formatOption(value);
}

export function formatNRIStatus(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "boolean") return value ? "NRI" : "Indian";
  if (typeof value === "string") {
    const v = value.toLowerCase();
    if (v === "true" || v === "yes") return "NRI";
    if (v === "false" || v === "no") return "Indian";
  }
  return formatOption(value);
}

export function formatDietPreference(value) {
  if (!value) return null;
  if (value === "veg") return "Vegetarian";
  if (value === "nonveg") return "Non-Vegetarian";
  if (value === "occasionally_nonveg") return "Occasionally Non-Vegetarian";
  return formatOption(value);
}

export function formatAbroadReady(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string") {
    const v = value.toLowerCase();
    if (v === "true" || v === "yes") return "Yes";
    if (v === "false" || v === "no") return "No";
  }
  return formatOption(value);
}

/** Build [{ label, value }] and drop empty values. */
export function factsFromEntries(entries) {
  return entries.filter((f) => f.value != null && String(f.value).trim() !== "");
}
