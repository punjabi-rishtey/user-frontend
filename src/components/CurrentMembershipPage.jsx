import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { apiUrl } from "@/config/constants";
import { authApi, isSessionExpiryError } from "@/config/authClient";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CurrentMembershipPage() {
  const { user } = useAuth();
  const [userStatusDetails, setUserStatusDetails] = useState();
  const [daysRemaining, setDaysRemaining] = useState();
  const navigate = useNavigate();
  const expiryDate = user?.metadata?.exp_date
    ? new Date(user.metadata.exp_date)
    : null;
  const hasActiveMembership =
    user?.status === "Approved" &&
    (!expiryDate || expiryDate >= new Date());

  useEffect(() => {
    if (user && !hasActiveMembership) {
      navigate("/membership", { replace: true });
    }
  }, [hasActiveMembership, navigate, user]);

  useEffect(() => {
    const userId = user?.id || user?._id;
    const fetchUserSubscriptionDetails = async (id) => {
      try {
        const response = await authApi.get(
          apiUrl(`/api/users/subscription/${id}`)
        );
        if (response.data) {
          setUserStatusDetails(response.data.data.expiresAt);
        }
      } catch (err) {
        if (isSessionExpiryError(err)) return;
        console.log(err);
      }
    };
    if (userId) fetchUserSubscriptionDetails(userId);
  }, [user?.id, user?._id]);

  useEffect(() => {
    if (!userStatusDetails) return;
    const expiry = new Date(userStatusDetails);
    const diffDays = Math.ceil((expiry - new Date()) / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);
  }, [userStatusDetails]);

  function formatDateToDDMMYYYY(date) {
    if (!date) return "-";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-lg px-6 py-16">
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to home
        </Button>
        <div className="mt-10 rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Current plan
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-brown">
            Gold Membership
          </h1>
          <Separator className="my-6" />
          <p className="text-muted-foreground">Expires</p>
          <p className="font-display text-2xl text-brown">
            {formatDateToDDMMYYYY(userStatusDetails)}
          </p>
          <p className="mt-6 font-display text-4xl text-maroon">
            {daysRemaining ?? "-"}
            <span className="ml-2 text-base font-sans text-muted-foreground">
              days remaining
            </span>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
