import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { openSectionIds } from "./sectionStatus.js";

const filled = {
  portraitUrl: "http://127.0.0.1/portrait.jpg",
  identity: {
    fullName: "Meher Kaur",
    mobile: "9000000011",
    secondary_contact: "",
    email: "meher@demo.punjabi-rishtey.test",
    gender: "female",
    dob: "1996-01-01",
    religion: "Sikh",
    marital_status: "never_married",
  },
  about: {
    about_myself: "I live in Chandigarh.",
    looking_for: "A kind partner.",
  },
  lifestyle: {
    height: { feet: "5", inches: "0" },
    caste: "Khatri",
    language: "Punjabi",
    manglik: "no",
    birth_details: { birth_time: "10:00", birth_place: "Chandigarh" },
    physical_attributes: {
      skin_tone: "fair",
      body_type: "average",
      physical_disability: "false",
      disability_reason: "None",
    },
    lifestyle: {
      smoke: "no",
      drink: "no",
      veg_nonveg: "veg",
      nri_status: "false",
      abroad_ready: "false",
    },
    home_address: { address: "Sector 17", city: "Chandigarh" },
  },
  family: {
    family_value: "traditional",
    family_type: "nuclear",
    mother: { name: "Paramjit Kaur", occupation: "Homemaker" },
    father: { name: "Harjit Singh", occupation: "Retired teacher" },
    siblings: { brother_count: 0, sister_count: 0 },
  },
  education: {
    education_level: "Graduate",
    education_field: "Computer Science",
    college_details: { name: "Government College", city: "Chandigarh" },
    additional_info: "",
  },
  profession: {
    occupation: "Private Job",
    designation: "Designer",
    working_with: "Private company",
    income: "6 Lakhs",
    work_address: { address: "Sector 17", city: "Chandigarh" },
    additional_info: "",
  },
  astrology: { rashi_nakshatra: "Mesh", gotra: "Bharadwaj" },
};

describe("openSectionIds", () => {
  it("marks every profile section open when nothing is filled", () => {
    assert.deepEqual(openSectionIds(), [
      "pictures",
      "identity",
      "about",
      "lifestyle",
      "family",
      "education",
      "profession",
      "astrology",
    ]);
  });

  it("marks nothing open when counted fields are filled", () => {
    assert.deepEqual(openSectionIds(filled), []);
  });

  it("treats sibling counts of 0 and height inches of 0 as filled", () => {
    assert.equal(openSectionIds(filled).includes("family"), false);
    assert.equal(openSectionIds(filled).includes("lifestyle"), false);
  });

  it("ignores fields the server does not count", () => {
    const open = openSectionIds({
      ...filled,
      identity: { ...filled.identity, secondary_contact: "" },
      education: { ...filled.education, additional_info: "" },
      profession: { ...filled.profession, additional_info: "" },
    });
    assert.deepEqual(open, []);
  });

  it("opens a section when one counted field is empty", () => {
    const open = openSectionIds({
      ...filled,
      portraitUrl: "",
      lifestyle: {
        ...filled.lifestyle,
        lifestyle: { ...filled.lifestyle.lifestyle, abroad_ready: "" },
      },
      astrology: { rashi_nakshatra: "", gotra: "Bharadwaj" },
    });
    assert.deepEqual(open, ["pictures", "lifestyle", "astrology"]);
  });
});
