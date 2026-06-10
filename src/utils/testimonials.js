const formatDate = (value, options) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toLocaleDateString("en-IN", options);
};

const buildMeta = (item) => {
  const marriageDate = formatDate(item.marriage_date, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (marriageDate) {
    return {
      metaLabel: "Married",
      metaValue: marriageDate,
    };
  }

  const registrationDates = [
    formatDate(item.groom_registration_date, { month: "short", year: "numeric" }),
    formatDate(item.bride_registration_date, { month: "short", year: "numeric" }),
  ].filter(Boolean);

  if (registrationDates.length === 2) {
    return {
      metaLabel: "Joined",
      metaValue: `${registrationDates[0]} and ${registrationDates[1]}`,
    };
  }

  if (registrationDates.length === 1) {
    return {
      metaLabel: "Joined",
      metaValue: registrationDates[0],
    };
  }

  return {
    metaLabel: null,
    metaValue: null,
  };
};

export const mapTestimonialsFromApi = (items, backendBaseUrl) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      const meta = buildMeta(item);

      return {
        id: item._id || item.id || `testimonial-${index}`,
        name: item.user_name?.trim() || "Happy Couple",
        photo: item.image_url || (item.image ? `${backendBaseUrl}${item.image}` : ""),
        quote: item.message?.trim() || "",
        createdAt: item.created_at || null,
        marriageDate: item.marriage_date || null,
        groomRegistrationDate: item.groom_registration_date || null,
        brideRegistrationDate: item.bride_registration_date || null,
        ...meta,
      };
    })
    .filter((item) => item.quote)
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
};
