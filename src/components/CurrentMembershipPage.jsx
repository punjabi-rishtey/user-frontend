import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Added for navigation
import axios from "axios";
import { apiUrl } from "../config/constants";

const CurrentMembershipPage = () => {
  const { user } = useAuth();
  const [userStatusDetails, setUserStatusDetails] = useState();
  const [daysRemaining, setDaysRemaining] = useState();
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const userId = user.id;
    const fetchUserSubscriptionDetails = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(
          apiUrl(`/api/users/subscription/${userId}`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(">fetching user subscription details: ", response.data);
        if (response.data) {
          const details = response.data.data;
          const expiry = details.expiresAt;
          setUserStatusDetails(expiry);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (userId) {
      console.log("userId: ", userId);
      fetchUserSubscriptionDetails(userId);
    }
  }, [user?.id]);

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const expiryDate = new Date(userStatusDetails);
      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays);
    };

    if (userStatusDetails) {
      calculateDaysRemaining();
    }
  }, [userStatusDetails]);

  function formatDateToDDMMYYYY(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto mt-10 px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")} // Adjust route as needed
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
              Expires at: {formatDateToDDMMYYYY(userStatusDetails)}
            </h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMembershipPage;
