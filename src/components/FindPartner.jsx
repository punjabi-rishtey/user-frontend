import { useState, useEffect, useMemo, useCallback } from "react";
import { apiUrl } from "../config/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import profileIcon from "../assets/profile.png";
import PageShell from "./PageShell";
import MembershipRequired from "./MembershipRequired";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { authApi, isSessionExpiryError } from "../config/authClient";
import { findPartnerRefusal } from "./findPartnerAccess";

const FindPartner = () => {
  const [filters, setFilters] = useState({
    manglik: "",
    maritalStatus: "",
    nriStatus: "",
    occupation: "",
    ageMin: "",
    ageMax: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, refreshUser } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [profileComplete, setProfileComplete] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(10);
  const [sortOption, setSortOption] = useState("newest");

  // Helper to get query parameters from URL
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      page: parseInt(params.get("page")) || 1,
      search: params.get("search") || "",
      manglik: params.get("manglik") || "",
      maritalStatus: params.get("maritalStatus") || "",
      nriStatus: params.get("nriStatus") || "",
      occupation: params.get("occupation") || "",
      ageMin: params.get("ageMin") || "",
      ageMax: params.get("ageMax") || "",
      sort: params.get("sort") || "newest",
    };
  };

  // Initialize state from URL query parameters
  useEffect(() => {
    const queryParams = getQueryParams();
    setCurrentPage(queryParams.page);
    setSearchTerm(queryParams.search);
    setFilters({
      manglik: queryParams.manglik,
      maritalStatus: queryParams.maritalStatus,
      nriStatus: queryParams.nriStatus,
      occupation: queryParams.occupation,
      ageMin: queryParams.ageMin,
      ageMax: queryParams.ageMax,
    });
    setSortOption(queryParams.sort);
  }, [location.search]);

  // Update URL with push to create new history entry
  const updateQueryParams = (newPage) => {
    const params = new URLSearchParams({
      page: newPage || currentPage,
      search: searchTerm,
      manglik: filters.manglik,
      maritalStatus: filters.maritalStatus,
      nriStatus: filters.nriStatus,
      occupation: filters.occupation,
      ageMin: filters.ageMin,
      ageMax: filters.ageMax,
      sort: sortOption,
    });
    navigate(`${location.pathname}?${params.toString()}`, { replace: false }); // Use push instead of replace
  };

  // Handle popstate for back/forward button navigation
  useEffect(() => {
    const handlePopstate = () => {
      const queryParams = getQueryParams();
      console.log("Popstate event: Setting currentPage to", queryParams.page);
      setCurrentPage(queryParams.page);
      setSearchTerm(queryParams.search);
      setFilters({
        manglik: queryParams.manglik,
        maritalStatus: queryParams.maritalStatus,
        nriStatus: queryParams.nriStatus,
        occupation: queryParams.occupation,
        ageMin: queryParams.ageMin,
        ageMax: queryParams.ageMax,
      });
      setSortOption(queryParams.sort);
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  // Update URL when state changes (except for initial load or popstate)
  useEffect(() => {
    updateQueryParams();
  }, [currentPage, searchTerm, filters, sortOption]);

  // Give auth context time to initialize before checking
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthChecked(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, []);

  // Refresh user data when component mounts to get latest gender
  useEffect(() => {
    if (isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated, refreshUser]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && authChecked) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate, authChecked]);

  // Check profile completeness
  useEffect(() => {
    const checkProfileCompleteness = async () => {
      if (!isAuthenticated) return;

      try {
        await authApi.get(apiUrl("/api/users/find-my-partner"));
        setProfileComplete(true);
      } catch (err) {
        console.error("Error checking profile completeness:", err);
        if (isSessionExpiryError(err)) {
          return;
        }

        if (err.response?.status === 403) {
          const message = err.response?.data?.error || "";
          let completionPercent = null;
          if (!/70%\s*complete/i.test(message)) {
            try {
              const completion = await authApi.get(
                apiUrl("/api/users/profile-completion")
              );
              const pct = completion.data?.completionPercentage;
              if (typeof pct === "number" && !Number.isNaN(pct)) {
                completionPercent = pct;
              }
            } catch (completionError) {
              if (isSessionExpiryError(completionError)) return;
            }
          }
          if (findPartnerRefusal(message, completionPercent) === "profile") {
            setProfileComplete(false);
            setError(
              message ||
                "Your profile must be at least 70% complete to access this feature."
            );
          } else {
            setProfileComplete(true);
            setError(null);
          }
        } else {
          setError(
            "Failed to check profile completeness. Please try again later."
          );
        }
        setLoading(false);
      }
    };

    if (isAuthenticated && authChecked) {
      checkProfileCompleteness();
    }
  }, [isAuthenticated, authChecked]);

  const buildSearchParams = useCallback(() => {
    const params = {
      page: currentPage,
      limit: profilesPerPage,
    };

    if (filters.ageMin || filters.ageMax) {
      params.minAge = filters.ageMin || "18";
      params.maxAge = filters.ageMax || "99";
    }
    if (filters.maritalStatus) {
      const maritalApiValue = {
        "Never Married": "never_married",
        Divorced: "divorced",
        Widowed: "widow_widower",
        Separated: "separated",
      }[filters.maritalStatus];
      params.marital_status = maritalApiValue || filters.maritalStatus;
    }
    if (filters.manglik) params.manglik = filters.manglik;
    if (filters.nriStatus) params.nri_status = filters.nriStatus;
    if (filters.occupation) params.occupation = filters.occupation;
    if (searchTerm.trim()) params.search = searchTerm.trim();

    return params;
  }, [currentPage, filters, profilesPerPage, searchTerm]);

  useEffect(() => {
    if (!isAuthenticated || !authChecked || !profileComplete) {
      return;
    }

    const controller = new AbortController();

    const fetchPartnerPage = async () => {
      setLoading(true);
      try {
        const response = await authApi.get(apiUrl("/api/users/search"), {
          params: buildSearchParams(),
          signal: controller.signal,
        });
        const data = response.data || {};
        const results = Array.isArray(data.results) ? data.results : [];
        setUsers(
          results.map((item) => ({
            ...item,
            _id: item._id,
            user: item.user || item._id,
            age:
              item.age ??
              (item.dob
                ? new Date().getFullYear() - new Date(item.dob).getFullYear()
                : null),
            occupation: item.occupation ?? null,
            nri_status:
              item.nri_status ?? item.lifestyle?.nri_status ?? false,
            city: item.city ?? item.location?.city ?? "",
            manglik: item.manglik ?? item.mangalik,
            profile_picture:
              item.profile_picture ||
              (Array.isArray(item.profile_pictures) &&
              item.profile_pictures.length > 0
                ? item.profile_pictures[0]
                : null),
          }))
        );
        setTotalResults(typeof data.total === "number" ? data.total : 0);
        setTotalPages(typeof data.pages === "number" ? data.pages : 0);
        setError(null);
      } catch (err) {
        if (controller.signal.aborted || isSessionExpiryError(err)) {
          return;
        }

        console.error("Error fetching partner search:", err);
        setUsers([]);
        setTotalResults(0);
        setTotalPages(0);
        setError(
          err.response?.data?.error ||
            "Failed to load users. Please try again later."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPartnerPage();

    return () => controller.abort();
  }, [isAuthenticated, authChecked, profileComplete, buildSearchParams]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to page 1 on sort change
  };

  const handleClearFilters = () => {
    setFilters({
      manglik: "",
      maritalStatus: "",
      nriStatus: "",
      occupation: "",
      ageMin: "",
      ageMax: "",
    });
    setSearchTerm("");
    setSortOption("newest");
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search change
  };

  const handleProfileClick = (profile) => {
    console.log(profile, profile.user, profile._id);
    navigate(`/profile/${profile.user || profile._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const matchesSupplementalFilters = (item) => {
    const isManglik =
      item.manglik === true ||
      item.manglik === "true" ||
      item.manglik === "manglik";
    const isNRI =
      item.nri_status === true ||
      item.nri_status === "true" ||
      item.nri_status === "yes";
    const userOccupation = item.occupation || "";

    return (
      (filters.manglik === "" ||
        (filters.manglik === "true" && isManglik) ||
        (filters.manglik === "false" && !isManglik)) &&
      (filters.nriStatus === "" ||
        (filters.nriStatus === "true" && isNRI) ||
        (filters.nriStatus === "false" && !isNRI)) &&
      (filters.occupation === "" || userOccupation === filters.occupation) &&
      (searchTerm === "" ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const sortedProfiles = useMemo(() => {
    const list = Array.isArray(users)
      ? users.filter((item) => item && matchesSupplementalFilters(item))
      : [];

    return [...list].sort((a, b) => {
      if (sortOption === "newest") {
        const dateA = a.metadata?.register_date
          ? new Date(a.metadata.register_date)
          : new Date(0);
        const dateB = b.metadata?.register_date
          ? new Date(b.metadata.register_date)
          : new Date(0);
        return dateB - dateA;
      }
      if (sortOption === "alphabetical-asc") {
        return a.name?.toLowerCase().localeCompare(b.name?.toLowerCase());
      }
      if (sortOption === "alphabetical-desc") {
        return b.name?.toLowerCase().localeCompare(a.name?.toLowerCase());
      }
      return 0;
    });
  }, [users, sortOption, filters, searchTerm]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateQueryParams(pageNumber); // Explicitly update URL with new page
  };

  // Extract unique values for filters (unused helper removed)

  // Format options
  const formatOption = (option) => {
    if (option === undefined || option === null) return "";
    const optionStr = String(option);
    return optionStr
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Card variants for animation
  const cardVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    hover: {
      y: -2,
      transition: { duration: 0.25 },
    },
  };

  // Predefined filter options
  const predefinedOptions = {
    manglik: ["true", "false"],
    nriStatus: ["true", "false"],
    maritalStatus: ["Never Married", "Divorced", "Widowed", "Separated"],
  };

  const filterOptions = [
    {
      label: "Occupation",
      name: "occupation",
      options: [
        { value: "", label: "Any" },
        { value: "Private Job", label: "Private Job" },
        { value: "Government Job", label: "Government Job" },
        { value: "Business Owner", label: "Business Owner" },
      ],
    },
    {
      label: "NRI Status",
      name: "nriStatus",
      options: [
        { value: "", label: "Any" },
        { value: "false", label: "Indian" },
        { value: "true", label: "NRI" },
      ],
    },
    {
      label: "Marital Status / History",
      name: "maritalStatus",
      options: predefinedOptions.maritalStatus,
    },
    {
      label: "Manglik",
      name: "manglik",
      options: [
        { value: "", label: "Any" },
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ],
    },
  ];

  // Pagination component
  const Pagination = ({
    profilesPerPage,
    totalProfiles,
    currentPage,
    paginate,
  }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProfiles / profilesPerPage); i++) {
      pageNumbers.push(i);
    }

    let displayedPageNumbers = [];
    const totalPages = pageNumbers.length;

    if (totalPages <= 5) {
      displayedPageNumbers = pageNumbers;
    } else {
      displayedPageNumbers.push(currentPage);
      for (let i = 1; i <= 2; i++) {
        if (currentPage - i > 0) {
          displayedPageNumbers.unshift(currentPage - i);
        }
      }
      for (let i = 1; i <= 2; i++) {
        if (currentPage + i <= totalPages) {
          displayedPageNumbers.push(currentPage + i);
        }
      }
      while (displayedPageNumbers.length < 5 && displayedPageNumbers[0] > 1) {
        displayedPageNumbers.unshift(displayedPageNumbers[0] - 1);
      }
      while (
        displayedPageNumbers.length < 5 &&
        displayedPageNumbers[displayedPageNumbers.length - 1] < totalPages
      ) {
        displayedPageNumbers.push(
          displayedPageNumbers[displayedPageNumbers.length - 1] + 1
        );
      }
      if (displayedPageNumbers[0] > 1) {
        displayedPageNumbers = [
          1,
          "...",
          ...displayedPageNumbers.slice(displayedPageNumbers[0] === 2 ? 1 : 0),
        ];
      }
      if (displayedPageNumbers[displayedPageNumbers.length - 1] < totalPages) {
        displayedPageNumbers = [...displayedPageNumbers, "...", totalPages];
      }
    }

    return (
      <nav className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          <li>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  paginate(currentPage - 1);
                }
              }}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4F2F1D] text-white hover:bg-[#6B4132]"
              } transition duration-300`}
            >
              «
            </button>
          </li>
          {displayedPageNumbers.map((number, index) => (
            <li key={index}>
              {number === "..." ? (
                <span className="px-3 py-2">...</span>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(number);
                  }}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === number
                      ? "bg-[#990000] text-white"
                      : "bg-[#F5EDE7] text-[#4F2F1D] hover:bg-[#E5D3C8]"
                  } transition duration-300`}
                >
                  {number}
                </button>
              )}
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < pageNumbers.length) {
                  paginate(currentPage + 1);
                }
              }}
              disabled={
                currentPage === pageNumbers.length || pageNumbers.length === 0
              }
              className={`px-3 py-2 rounded-md ${
                currentPage === pageNumbers.length || pageNumbers.length === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4F2F1D] text-white hover:bg-[#6B4132]"
              } transition duration-300`}
            >
              »
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  Pagination.propTypes = {
    profilesPerPage: PropTypes.number.isRequired,
    totalProfiles: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
  };

  // Loading indicator
  if (!authChecked) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center py-24 text-brown">
          Checking authentication…
        </div>
      </PageShell>
    );
  }

  // Incomplete profile message
  if (!profileComplete) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center px-6 py-20">
          <MembershipRequired
            title="Complete your profile first"
            description="Your profile must be at least 70% complete before you can search for a partner."
            ctaLabel="Complete your profile"
            onCta={() => navigate("/profilepage")}
          />
        </div>
      </PageShell>
    );
  }

  // Membership status check (after profile completeness)
  const isSubscriptionExpired =
    user?.metadata?.exp_date && new Date() > new Date(user.metadata.exp_date);

  if (user && (user.status !== "Approved" || isSubscriptionExpired)) {
    return (
      <PageShell>
        <div className="relative min-h-[70vh] overflow-hidden px-6 py-16">
          <div className="pointer-events-none mx-auto grid max-w-5xl grid-cols-2 gap-4 opacity-60 blur-sm sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-xl border border-border bg-secondary"
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-paper/40 px-6 backdrop-blur-[2px]">
            <MembershipRequired
              title={
                isSubscriptionExpired
                  ? "Your Gold membership has expired"
                  : "Gold unlocks full profiles"
              }
              description="Verified Punjabi matches are waiting. Unlock Gold for ₹2,000 a year to browse with confidence."
              ctaLabel={
                isSubscriptionExpired ? "Renew Gold" : "Unlock with Gold"
              }
            />
          </div>
        </div>
      </PageShell>
    );
  }

  const filterFieldClass =
    "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-ink focus-visible:border-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/20";

  const renderFilterFields = (forMobile = false) => (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-brown">
          Age Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="ageMin"
            placeholder="Min"
            value={filters.ageMin}
            onChange={handleChange}
            min="18"
            max="100"
            className={filterFieldClass}
          />
          <span className="text-muted-foreground">to</span>
          <input
            type="number"
            name="ageMax"
            placeholder="Max"
            value={filters.ageMax}
            onChange={handleChange}
            min="18"
            max="100"
            className={filterFieldClass}
          />
        </div>
      </div>
      {filterOptions.map(({ label, name, options }, index) => (
        <div key={index}>
          <label className="mb-2 block text-sm font-medium text-brown">
            {label}
          </label>
          <select
            name={name}
            value={filters[name]}
            onChange={handleChange}
            className={filterFieldClass}
          >
            <option value="">{forMobile ? `Select ${label}` : `Any ${label}`}</option>
            {Array.isArray(options)
              ? options.map((option, idx) => {
                  if (option && typeof option === "object" && "value" in option) {
                    return (
                      <option key={idx} value={option.value}>
                        {option.label || formatOption(option.value)}
                      </option>
                    );
                  }
                  return (
                    <option key={idx} value={option}>
                      {formatOption(option)}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      ))}
      <button
        type="button"
        className="rounded-lg bg-maroon px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-maroon/90"
        onClick={handleClearFilters}
      >
        Clear filters
      </button>
    </div>
  );

  if (loading) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center py-24 text-brown">
          Loading profiles…
        </div>
      </PageShell>
    );
  }

  if (error && profileComplete) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center py-24 text-maroon">
          {error}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="border-b border-border px-4 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search by name…"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full flex-1 rounded-lg border border-border bg-card px-4 py-3 text-ink focus-visible:border-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/20"
          />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-ink sm:w-56 focus-visible:border-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/20"
          >
            <option value="newest">Newest first</option>
            <option value="alphabetical-asc">Alphabetical (A–Z)</option>
            <option value="alphabetical-desc">Alphabetical (Z–A)</option>
          </select>
          <button
            type="button"
            className="rounded-lg bg-brown px-4 py-3 text-sm font-medium text-ivory md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide filters" : "Show filters"}
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-8 md:flex-row">
        <div
          className={`fixed inset-0 z-50 bg-brown-deep/30 backdrop-blur-sm transition-opacity md:hidden ${
            showFilters ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setShowFilters(false)}
        />
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-72 overflow-y-auto border-r border-border bg-card p-5 transition-transform md:hidden ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl text-brown">Filters</h2>
            <button
              type="button"
              className="text-muted-foreground"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>
          {renderFilterFields(true)}
        </aside>

        <aside className="hidden w-72 shrink-0 md:block">
          <div className="sticky top-6 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-6 font-display text-2xl text-brown">Filters</h2>
            {renderFilterFields(false)}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {sortedProfiles.length} of {totalResults} profiles
          </p>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            {sortedProfiles.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No profiles match your search criteria.
              </div>
            ) : (
              sortedProfiles.map((item) => {
                const facts = [
                  { label: "Age", value: item.age ? String(item.age) : null },
                  { label: "City", value: item.city?.trim() || null },
                  { label: "Caste", value: formatOption(item.caste) || null },
                  {
                    label: "Profession",
                    value: formatOption(item.occupation) || null,
                  },
                ].filter((fact) => fact.value);

                return (
                  <motion.button
                    type="button"
                    key={item.user || item._id}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="group rounded-xl border border-border bg-card text-left transition-colors hover:border-brown/40"
                    onClick={() => handleProfileClick(item)}
                  >
                    <div className="flex flex-col">
                      <div className="w-full overflow-hidden rounded-t-xl bg-secondary">
                        <img
                          src={item.profile_picture || profileIcon}
                          alt=""
                          className="aspect-[3/4] w-full object-cover object-top"
                        />
                      </div>
                      <div className="flex flex-col px-4 py-4 sm:px-5 sm:py-5">
                        <h3 className="font-display text-2xl font-semibold leading-tight text-brown">
                          {item.name}
                        </h3>
                        {facts.length > 0 ? (
                          <dl className="mt-3 space-y-2.5">
                            {facts.map(({ label, value }) => (
                              <div
                                key={label}
                                className="flex items-baseline gap-3 text-sm leading-none"
                              >
                                <dt className="w-24 shrink-0 text-muted-foreground">
                                  {label}
                                </dt>
                                <dd className="font-medium whitespace-nowrap text-brown">
                                  {value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                        <span className="mt-4 text-sm font-semibold text-maroon underline-offset-4 group-hover:underline">
                          View profile
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>
          {totalPages > 1 && (
            <Pagination
              profilesPerPage={profilesPerPage}
              totalProfiles={totalResults}
              currentPage={currentPage}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default FindPartner;
