/** Which button a membership card shows once we know the plan they hold. */
export function findHeldPlan(plans, subscription) {
  if (!subscription || !Array.isArray(plans)) return null;

  const name = String(subscription.planName || "").trim();
  if (name) {
    const byName = plans.find((plan) => plan.name === name);
    if (byName) return byName;
  }

  const months = Number(subscription.membershipDurationMonths);
  if (!Number.isInteger(months) || months <= 0) return null;
  return plans.find((plan) => Number(plan.duration) === months) || null;
}

export function membershipCardAction(plan, heldPlan) {
  const name = plan?.name || "Gold";
  if (!heldPlan) {
    return { label: `Unlock with ${name}`, opensPayment: true };
  }

  const samePlan =
    (plan?._id &&
      heldPlan._id &&
      String(plan._id) === String(heldPlan._id)) ||
    (plan?.name && heldPlan.name && plan.name === heldPlan.name);
  if (samePlan) return { label: "Your plan", opensPayment: false };

  const priceDelta = Number(plan?.price) - Number(heldPlan.price);
  const higher =
    priceDelta !== 0
      ? priceDelta > 0
      : Number(plan?.duration) > Number(heldPlan.duration);
  if (!higher) return null;

  return { label: `Choose ${name}`, opensPayment: true };
}
