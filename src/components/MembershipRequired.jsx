import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Shared membership / access gate - bridal paper card with maroon CTA.
 */
export default function MembershipRequired({
  title = "Gold membership required",
  description = "Unlock verified Punjabi profiles for ₹2,000 a year. Browse matches, then connect through Punjabi Rishtey or directly when numbers are shared.",
  ctaLabel = "Unlock with Gold",
  onCta,
  className,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-lg flex-col items-center gap-6 rounded-xl border border-border bg-card px-8 py-12 text-center",
        className
      )}
    >
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Punjabi Rishtey
      </p>
      <h1 className="font-display text-3xl font-semibold text-brown md:text-4xl">
        {title}
      </h1>
      <p className="max-w-md text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Button
        size="lg"
        className="min-w-[12rem]"
        onClick={onCta || (() => navigate("/membership"))}
      >
        {ctaLabel}
      </Button>
    </div>
  );
}
