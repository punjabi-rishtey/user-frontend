import { cn } from "@/lib/utils";

/** Editorial group label + spacing for field clusters inside a section. */
export default function SectionGroup({ title, children, className }) {
  return (
    <div className={cn("space-y-5", className)}>
      {title ? (
        <h2 className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          {title}
        </h2>
      ) : null}
      {children}
    </div>
  );
}

export function SectionStack({ children }) {
  return <div className="space-y-10">{children}</div>;
}
