import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/constants";
import { authApi, isSessionExpiryError } from "../config/authClient";
import {
  formatMembershipExpiryDate,
  getMembershipDaysRemaining,
  hasActiveApprovedMembership,
} from "../utils/membershipExpiry";

const CurrentMembershipPage = () => {
  const { user } = useAuth();
  const [userStatusDetails, setUserStatusDetails] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);
  const navigate = useNavigate();
  const hasActiveMembership = hasActiveApprovedMembership(user);

  useEffect(() => {
    if (user && !hasActiveMembership) {
      navigate("/membership", { replace: true });
    }
  }, [hasActiveMembership, navigate, user]);

  useEffect(() => {
    const userId = user?.id || user?._id;
    const fetchUserSubscriptionDetails = async (userId) => {
      try {
        const response = await authApi.get(
          apiUrl(`/api/users/subscription/${userId}`)
        );

        console.log(">fetching user subscription details: ", response.data);
        if (response.data) {
          const details = response.data.data;
          setUserStatusDetails(details?.expiresAt ?? null);
        }
      } catch (err) {
        if (isSessionExpiryError(err)) {
          return;
        }

        console.log(err);
      }
    };
    if (userId) {
      console.log("userId: ", userId);
      fetchUserSubscriptionDetails(userId);
    }
  }, [user?.id, user?._id]);

  useEffect(() => {
    setDaysRemaining(getMembershipDaysRemaining(userStatusDetails));
  }, [userStatusDetails]);

  const expiryLabel = formatMembershipExpiryDate(userStatusDetails);

  return (
    <div>
      <div className="max-w-7xl mx-auto mt-10 px-4">
        <button
          onClick={() => navigate("/")}
          className="mb-6 py-2 px-4 text-[#E5D3C8] bg-[#4F2F1D] rounded-md hover:bg-[#6B4132] transition-colors"
          style={{
            fontFamily: "'Modern Era', sans-serif",
            fontWeight: 500,
          }}
        >
          Back
        </button>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="relative w-full md:w-[380px] p-8 rounded-lg shadow-lg hover:ring-2 hover:ring-[#4F2F1D] bg-[#F5EDE7] cursor-pointer">
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#4F2F1D] text-[#E5D3C8] px-4 py-1 rounded-full z-10"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              Current Plan
            </div>

            <h3
              className="text-2xl mb-4 text-[#4F2F1D]"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              {expiryLabel === "No renewal date"
                ? expiryLabel
                : `Expires at: ${expiryLabel}`}
            </h3>
            {daysRemaining != null && (
              <p
                className="text-3xl mb-2 text-[#4F2F1D]"
                style={{
                  fontFamily: "'Tiempos Headline', serif",
                  fontWeight: 400,
                }}
              >
                {daysRemaining}
                <span
                  className="text-[#6B4132] text-lg ml-1"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Days Remaining
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMembershipPage;