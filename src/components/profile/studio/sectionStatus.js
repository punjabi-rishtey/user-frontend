function isFilled(value) {
  return value !== null && value !== undefined && value !== "";
}

function missing(values) {
  return values.some((value) => !isFilled(value));
}

/**
 * Section ids that still have an empty counted field.
 * shortcut: an empty picture list does not change the server percentage
 * (empty arrays add nothing to the total). Pictures stays open until a
 * portrait exists, because that is the field this section collects.
 * The number on screen stays the server percentage.
 */
export function openSectionIds(profile = {}) {
  const identity = profile.identity || {};
  const about = profile.about || {};
  const lifestyle = profile.lifestyle || {};
  const family = profile.family || {};
  const education = profile.education || {};
  const profession = profile.profession || {};
  const astrology = profile.astrology || {};
  const height = lifestyle.height || {};
  const birth = lifestyle.birth_details || {};
  const physical = lifestyle.physical_attributes || {};
  const habits = lifestyle.lifestyle || {};
  const home = lifestyle.home_address || {};
  const mother = family.mother || {};
  const father = family.father || {};
  const siblings = family.siblings || {};
  const college = education.college_details || {};
  const work = profession.work_address || {};

  const open = [];

  if (!isFilled(profile.portraitUrl)) open.push("pictures");

  if (
    missing([
      identity.fullName,
      identity.mobile,
      identity.email,
      identity.gender,
      identity.dob,
      identity.religion,
      identity.marital_status,
    ])
  ) {
    open.push("identity");
  }

  if (missing([about.about_myself, about.looking_for])) open.push("about");

  if (
    missing([
      height.feet,
      height.inches,
      lifestyle.caste,
      lifestyle.language,
      lifestyle.manglik,
      birth.birth_time,
      birth.birth_place,
      physical.skin_tone,
      physical.body_type,
      physical.physical_disability,
      physical.disability_reason,
      habits.smoke,
      habits.drink,
      habits.veg_nonveg,
      habits.nri_status,
      habits.abroad_ready,
      home.address,
      home.city,
    ])
  ) {
    open.push("lifestyle");
  }

  if (
    missing([
      family.family_value,
      family.family_type,
      mother.name,
      mother.occupation,
      father.name,
      father.occupation,
      siblings.brother_count,
      siblings.sister_count,
    ])
  ) {
    open.push("family");
  }

  if (
    missing([
      education.education_level,
      education.education_field,
      college.name,
      college.city,
    ])
  ) {
    open.push("education");
  }

  if (
    missing([
      profession.occupation,
      profession.designation,
      profession.working_with,
      profession.income,
      work.address,
      work.city,
    ])
  ) {
    open.push("profession");
  }

  if (missing([astrology.rashi_nakshatra, astrology.gotra])) {
    open.push("astrology");
  }

  return open;
}
