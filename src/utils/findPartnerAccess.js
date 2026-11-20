/** Backend 403 `code` values for GET /api/users/find-my-partner (when present). */
export const FIND_PARTNER_ACCESS = {
  ALLOWED: "allowed",
  EXPIRED: "expired",
  NOT_APPROVED: "not_approved",
  PROFILE_INCOMPLETE: "profile_incomplete",
  ERROR: "error",
};

/**
 * Classify find-my-partner access from a 403 body, using `code` when present
 * and falling back to legacy `error` message text for older backends.
 */
export function classifyFindPartnerForbidden(responseData) {
  const code = responseData?.code;
  if (code === "EXPIRED") return FIND_PARTNER_ACCESS.EXPIRED;
  if (code === "NOT_APPROVED") return FIND_PARTNER_ACCESS.NOT_APPROVED;
  if (code === "PROFILE_INCOMPLETE") {
    return FIND_PARTNER_ACCESS.PROFILE_INCOMPLETE;
  }

  const error = (responseData?.error || "").toLowerCase();
  if (error.includes("expired") || error.includes("renew")) {
    return FIND_PARTNER_ACCESS.EXPIRED;
  }
  if (
    error.includes("not active") ||
    error.includes("approval") ||
    error.includes("approved")
  ) {
    return FIND_PARTNER_ACCESS.NOT_APPROVED;
  }
  if (error.includes("70%") || error.includes("complete")) {
    return FIND_PARTNER_ACCESS.PROFILE_INCOMPLETE;
  }

  return FIND_PARTNER_ACCESS.ERROR;
}