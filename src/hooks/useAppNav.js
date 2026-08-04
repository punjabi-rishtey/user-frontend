import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import profileIcon from "@/assets/profile.png";

export function useAppNav() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const hasActiveMembership = () => {
    const expiryDate = user?.metadata?.exp_date
      ? new Date(user.metadata.exp_date)
      : null;
    return (
      user?.status === "Approved" &&
      (!expiryDate || expiryDate >= new Date())
    );
  };

  const goFindPartner = () => {
    if (isAuthenticated) {
      navigate("/findpartner");
    } else {
      navigate("/login", { state: { from: "/findpartner" } });
    }
  };

  const goMembership = () => {
    if (!isAuthenticated) {
      navigate("/membership");
      return;
    }
    navigate(hasActiveMembership() ? "/current-plan" : "/membership");
  };

  const goProfile = () => navigate("/profilepage");

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Find Your Partner", onClick: goFindPartner },
    { label: "Membership", onClick: goMembership },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ];

  const profileImageSrc =
    user?.profile_picture || user?.profile_pictures?.[0] || profileIcon;

  const firstName = user?.name?.match(/^\s*([^\s]+)/)?.[1];

  return {
    navigate,
    user,
    isAuthenticated,
    navItems,
    goFindPartner,
    goMembership,
    goProfile,
    profileImageSrc,
    firstName,
    hasActiveMembership,
  };
}
