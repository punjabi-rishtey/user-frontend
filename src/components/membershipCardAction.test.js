import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  findHeldPlan,
  membershipCardAction,
} from "./membershipCardAction.js";

const gold = { _id: "gold", name: "Gold", price: 2000, duration: 12 };
const hallmark = {
  _id: "hallmark",
  name: "Hallmark",
  price: 3000,
  duration: 18,
};
const plans = [gold, hallmark];

describe("membership card actions", () => {
  it("shows the held Gold plan and a choice for the longer plan", () => {
    const held = findHeldPlan(plans, {
      planName: "",
      membershipDurationMonths: 12,
    });
    assert.equal(held.name, "Gold");
    assert.deepEqual(membershipCardAction(gold, held), {
      label: "Your plan",
      opensPayment: false,
    });
    assert.deepEqual(membershipCardAction(hallmark, held), {
      label: "Choose Hallmark",
      opensPayment: true,
    });
  });

  it("hides a purchase on the top plan and still lets guests unlock either", () => {
    const held = findHeldPlan(plans, { planName: "Hallmark" });
    assert.equal(membershipCardAction(gold, held), null);
    assert.deepEqual(membershipCardAction(hallmark, held), {
      label: "Your plan",
      opensPayment: false,
    });
    assert.equal(membershipCardAction(gold, null).label, "Unlock with Gold");
  });
});
