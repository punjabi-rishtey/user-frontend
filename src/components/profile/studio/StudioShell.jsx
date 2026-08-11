import { COMPLETION_TARGET, SECTIONS } from "./constants";
import {
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
} from "@/components/ui/formStyles";
import { cn } from "@/lib/utils";

export default function StudioShell({
  sectionId,
  completionPercent,
  portraitUrl,
  notice,
  onSelectSection,
  onSave,
  onPrevious,
  onNext,
  showSave = true,
  canSave = false,
  saving = false,
  justSaved = false,
  canGoPrevious = false,
  canGoNext = false,
  children,
}) {
  const section = SECTIONS.find((item) => item.id === sectionId) || SECTIONS[0];
  const atTarget = completionPercent >= COMPLETION_TARGET;

  const saveLabel = saving
    ? "Saving…"
    : justSaved
      ? "Saved"
      : "Save this section";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:pb-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(240px,300px)_minmax(0,1fr)]">
        {/* Left rail: portrait hero + quiet index */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-xl bg-secondary">
            {portraitUrl ? (
              <img
                src={portraitUrl}
                alt="Your primary portrait"
                className="aspect-[4/5] max-h-[42vh] w-full object-cover object-top sm:max-h-none sm:aspect-[3/4] lg:max-h-[min(52vh,420px)]"
              />
            ) : (
              <div className="flex aspect-[4/5] max-h-[42vh] w-full flex-col items-center justify-center px-6 text-center sm:aspect-[3/4] sm:max-h-none lg:max-h-[min(52vh,420px)]">
                <p className="font-display text-xl text-brown sm:text-2xl">
                  No portrait yet
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add one in Pictures
                </p>
              </div>
            )}
          </div>

          <p className="mt-6 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Sections
          </p>
          <nav
            className="mt-2 border-t border-brown/10"
            aria-label="Profile sections"
          >
            {SECTIONS.map((item) => {
              const active = item.id === sectionId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectSection(item.id)}
                  className={cn(
                    "flex w-full items-center border-b border-brown/10 py-2.5 text-left text-[15px] transition-colors",
                    active
                      ? "font-semibold text-maroon"
                      : "font-normal text-brown/75 hover:text-brown"
                  )}
                >
                  <span
                    className={cn(
                      "mr-3 inline-block h-4 w-px shrink-0",
                      active ? "bg-maroon" : "bg-transparent"
                    )}
                    aria-hidden
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right: editing canvas */}
        <section className="min-w-0">
          <div className="rounded-xl border border-brown/10 bg-card/60 px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Profile strength
              </p>
              <p className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold leading-none tabular-nums text-maroon sm:text-4xl">
                  {completionPercent}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {atTarget
                    ? "Strong enough for serious matches"
                    : `aim for ${COMPLETION_TARGET}%`}
                </span>
              </p>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-brown/10">
              <div
                className="h-full rounded-full bg-maroon transition-[width] duration-300 ease-out"
                style={{ width: `${Math.min(completionPercent, 100)}%` }}
              />
            </div>

            <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-brown sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {section.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {section.guidance}
            </p>

            <div className="mt-5 h-px w-full bg-brown/10" />

            {notice ? (
              <div
                className={cn(
                  "mt-5 rounded-lg border px-4 py-3 text-sm",
                  notice.type === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : notice.type === "warning"
                      ? "border-amber-200 bg-amber-50 text-amber-900"
                      : "border-red-200 bg-red-50 text-red-700"
                )}
                role={notice.type === "success" ? "status" : "alert"}
              >
                {notice.message}
              </div>
            ) : null}

            <div className="mt-8">{children}</div>

            {/* Inline Previous · Save · Next — not sticky/fixed */}
            <div className="mt-10 flex flex-col gap-3 border-t border-brown/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={onPrevious}
                disabled={!canGoPrevious || saving}
                className={cn(authSecondaryButtonClassName, "w-full sm:w-auto")}
              >
                Previous
              </button>

              {showSave ? (
                <button
                  type="button"
                  onClick={onSave}
                  disabled={saving || (!canSave && !justSaved)}
                  className={cn(
                    authPrimaryButtonClassName,
                    "w-full sm:min-w-[14rem] sm:flex-1 sm:max-w-xs duration-500 ease-out",
                    justSaved &&
                      !canSave &&
                      "pointer-events-none bg-emerald-800 opacity-100 shadow-[0_8px_20px_-12px_rgba(6,95,70,0.45)] hover:bg-emerald-800"
                  )}
                >
                  {saveLabel}
                </button>
              ) : (
                <div className="hidden flex-1 sm:block" aria-hidden />
              )}

              <button
                type="button"
                onClick={onNext}
                disabled={!canGoNext || saving}
                className={cn(authSecondaryButtonClassName, "w-full sm:w-auto")}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function UnsavedChangesDialog({
  open,
  onSave,
  onDiscard,
  onCancel,
  saving,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown-deep/60 p-4">
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-6"
        role="dialog"
        aria-labelledby="unsaved-title"
      >
        <h2 id="unsaved-title" className="font-display text-2xl text-brown">
          Unsaved changes
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          You have changes that are not saved yet. What would you like to do?
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            className={authPrimaryButtonClassName}
            onClick={onSave}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            className={authSecondaryButtonClassName}
            onClick={onDiscard}
            disabled={saving}
          >
            Discard changes
          </button>
          <button
            type="button"
            className="py-2 text-sm font-semibold text-brown hover:text-maroon"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
