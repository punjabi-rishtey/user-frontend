import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findPartnerRefusal } from "./findPartnerAccess.js";

describe("findPartnerRefusal", () => {
  it("keeps a thin profile on the profile gate", () => {
    assert.equal(
      findPartnerRefusal(
        "Profile must be at least 70% complete to access this feature.",
        null
      ),
      "profile"
    );
    assert.equal(
      findPartnerRefusal(
        "Your profile is not active yet. Please wait for approval to access this feature.",
        40
      ),
      "profile"
    );
  });

  it("sends a finished profile with no active plan to membership", () => {
    assert.equal(
      findPartnerRefusal(
        "Your profile is not active yet. Please wait for approval to access this feature.",
        73
      ),
      "membership"
    );
    assert.equal(
      findPartnerRefusal(
        "Your subscription has expired. Please renew to access this feature.",
        80
      ),
      "membership"
    );
  });
});
