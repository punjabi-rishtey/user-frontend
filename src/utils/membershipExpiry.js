export function parseIsLifetimeFlag(value) {
  return value === true || value === "true" || value === 1 || value === "1";
}

/**
 * Whether the signed-in member already has lifetime access.
 * Uses isLifetime from the user profile or subscription payload only.
 */
export function memberHasLifetimeAccess(user, subscriptionRecord) {
  if (
    user?.status === "Approved" &&
    (parseIsLifetimeFlag(user?.isLifetime) ||
      parseIsLifetimeFlag(user?.hasLifetimeAccess) ||
      parseIsLifetimeFlag(user?.metadata?.isLifetime))
  ) {
    return true;
  }

  if (!subscriptionRecord) {
    return false;
  }

  const subscription = subscriptionRecord?.data ?? subscriptionRecord;

  if (!parseIsLifetimeFlag(subscription?.isLifetime)) {
    return false;
  }

  if (user?.status !== "Approved") {
    return false;
  }

  if (
    subscription.reviewStatus &&
    String(subscription.reviewStatus).toLowerCase() !== "approved"
  ) {
    return false;
  }

  return parseMembershipExpiry(user?.metadata?.exp_date) === null;
}

export function isRenewableMembershipPlan(plan) {
  return plan && !parseIsLifetimeFlag(plan?.isLifetime);
}

const LIFETIME_DOWNGRADE_MESSAGE =
  "You already have lifetime membership. Gold and Hallmark cannot replace lifetime access.";

export function getLifetimeDowngradeMessage() {
  return LIFETIME_DOWNGRADE_MESSAGE;
}

/** @returns {Date | null} */
export function parseMembershipExpiry(value) {
  if (value == null || value === "") {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  // Treat Unix epoch as absent expiry (legacy/null sentinels).
  if (parsed.getTime() === 0) {
    return null;
  }

  return parsed;
}

export function hasActiveApprovedMembership(user) {
  if (!user || user.status !== "Approved") {
    return false;
  }

  const expiry = parseMembershipExpiry(user?.metadata?.exp_date);
  if (!expiry) {
    return true;
  }

  return expiry >= new Date();
}

export function isSubscriptionExpired(user) {
  const expiry = parseMembershipExpiry(user?.metadata?.exp_date);
  if (!expiry) {
    return false;
  }

  return new Date() > expiry;
}

export function formatMembershipExpiryDate(value) {
  const expiry = parseMembershipExpiry(value);
  if (!expiry) {
    return "No renewal date";
  }

  const day = String(expiry.getDate()).padStart(2, "0");
  const month = String(expiry.getMonth() + 1).padStart(2, "0");
  const year = expiry.getFullYear();
  return `${day}-${month}-${year}`;
}

/** @returns {number | null} */
export function getMembershipDaysRemaining(value) {
  const expiry = parseMembershipExpiry(value);
  if (!expiry) {
    return null;
  }

  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}