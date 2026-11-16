import { cn } from "@/lib/utils";

/**
 * Light atelier content section.
 * @param {{
 *   eyebrow?: string,
 *   title: string,
 *   description?: string,
 *   children?: import("react").ReactNode,
 *   className?: string,
 *   id?: string,
 * }} props
 */
export default function Section({
  eyebrow,
  title,
  description,
  children,
  className,
  id,
}) {
  return (
    <section
      id={id}
      className={cn("border-t border-border bg-paper px-6 py-20 sm:px-10", className)}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && (
            <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl font-semibold text-brown sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
