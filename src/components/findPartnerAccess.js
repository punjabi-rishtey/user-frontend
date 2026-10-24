const PROFILE_COMPLETION_TARGET = 70;

/** A 403 from Find Partner is either a thin profile or a missing plan. */
export function findPartnerRefusal(errorMessage, completionPercent) {
  const message = String(errorMessage || "");
  if (/70%\s*complete/i.test(message)) return "profile";
  if (
    typeof completionPercent === "number" &&
    completionPercent < PROFILE_COMPLETION_TARGET
  ) {
    return "profile";
  }
  return "membership";
}
