import PageShell from "@/components/PageShell";
import MembershipRequired from "@/components/MembershipRequired";

export default function BlockingPage() {
  return (
    <PageShell hideFooter>
      <div className="flex flex-1 items-center justify-center px-6 py-20">
        <MembershipRequired
          title="You need an active Gold membership"
          description="Renew or purchase Gold for ₹2,000 a year to keep browsing verified Punjabi profiles."
          ctaLabel="Buy Gold"
        />
      </div>
    </PageShell>
  );
}
