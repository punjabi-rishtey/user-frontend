export const RELIGION_OPTIONS = [
  { value: "", label: "Select religion" },
  { value: "hindu", label: "Hindu" },
  { value: "sikh", label: "Sikh" },
  { value: "jain", label: "Jain" },
  { value: "buddhist", label: "Buddhist" },
];

export const MARITAL_STATUS_OPTIONS = [
  { value: "", label: "Select marital status" },
  { value: "never_married", label: "Never Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widow_widower", label: "Widow/Widower" },
  { value: "awaiting_divorce", label: "Awaiting Divorce" },
];

export const GENDER_OPTIONS = [
  { value: "", label: "Select gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const CASTE_OPTIONS = [
  { value: "", label: "Select caste" },
  { value: "khatri", label: "Khatri" },
  { value: "arora", label: "Arora" },
  { value: "brahmin", label: "Brahmin" },
  { value: "other", label: "Other" },
];

export const MANGLIK_OPTIONS = [
  { value: "", label: "Select manglik status" },
  { value: "manglik", label: "Manglik" },
  { value: "partial_manglik", label: "Partial Manglik" },
  { value: "non_manglik", label: "Non Manglik" },
];

export const SKIN_TONE_OPTIONS = [
  { value: "", label: "Select skin tone" },
  { value: "very_fair", label: "Very Fair" },
  { value: "fair", label: "Fair" },
  { value: "wheatish", label: "Wheatish" },
  { value: "dark", label: "Dark" },
];

export const BODY_TYPE_OPTIONS = [
  { value: "", label: "Select body type" },
  { value: "slim", label: "Slim" },
  { value: "athletic", label: "Athletic" },
  { value: "average", label: "Average" },
  { value: "heavy", label: "Heavy" },
];

export const YES_NO_OPTIONS = [
  { value: "", label: "Select" },
  { value: "false", label: "No" },
  { value: "true", label: "Yes" },
];

export const HABIT_OPTIONS = [
  { value: "", label: "Select" },
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
  { value: "occasionally", label: "Occasionally" },
];

export const DIET_OPTIONS = [
  { value: "", label: "Select diet" },
  { value: "veg", label: "Vegetarian" },
  { value: "nonveg", label: "Non-Vegetarian" },
  { value: "occasionally_nonveg", label: "Occasionally Non-Vegetarian" },
];

export const NRI_OPTIONS = [
  { value: "", label: "Select" },
  { value: "false", label: "Indian" },
  { value: "true", label: "NRI" },
];

export const ABROAD_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

export const FAMILY_VALUE_OPTIONS = [
  { value: "", label: "Select family value" },
  { value: "traditional", label: "Traditional" },
  { value: "orthodox", label: "Orthodox" },
  { value: "liberal", label: "Liberal" },
  { value: "modern", label: "Modern" },
];

export const FAMILY_TYPE_OPTIONS = [
  { value: "", label: "Select family type" },
  { value: "nuclear", label: "Nuclear Family" },
  { value: "joint", label: "Joint Family" },
  { value: "extended", label: "Extended Family" },
  { value: "living_alone", label: "Living Alone" },
];

export const EDUCATION_LEVEL_OPTIONS = [
  { value: "", label: "Select education level" },
  { value: "high_school", label: "High School" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
  { value: "post_graduate", label: "Post Graduate" },
  { value: "doctorate", label: "Doctorate" },
];

export const FEET_OPTIONS = Array.from({ length: 4 }, (_, i) => {
  const feet = i + 4;
  return { value: String(feet), label: `${feet} ft` };
});

export const INCHES_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i),
  label: `${i} in`,
}));
