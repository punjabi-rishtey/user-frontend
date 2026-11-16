import { useState } from "react";
import PropTypes from "prop-types";
import { COMPLETION_TARGET, SECTIONS } from "./constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
  authTextButtonClassName,
} from "@/components/ui/formStyles";
import { cn } from "@/lib/utils";

function CompletionMark({ completionPercent }) {
  const atTarget = completionPercent >= COMPLETION_TARGET;

  return (
    <div>
      <p className="font-display text-4xl font-semibold tracking-tight text-brown tabular-nums">
        {completionPercent}%
      </p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {atTarget
          ? "Strong enough for serious matches."
          : `Aim for at least ${COMPLETION_TARGET}% so families see a complete profile.`}
      </p>
      <div className="mt-4 h-px w-full overflow-hidden bg-brown/15">
        <div
          className="h-full bg-maroon transition-[width] duration-300 ease-out"
          style={{ width: `${Math.min(completionPercent, 100)}%` }}
        />
      </div>
    </div>
  );
}

CompletionMark.propTypes = {
  completionPercent: PropTypes.number.isRequired,
};

function SectionIndex({ sectionId, openSectionIds, onSelect }) {
  const open = new Set(openSectionIds);
  const chapters = SECTIONS.filter((item) => item.id !== "account");
  const account = SECTIONS.find((item) => item.id === "account");

  const renderItem = (item) => {
    const active = item.id === sectionId;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onSelect(item.id)}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex w-full items-baseline justify-between gap-3 border-b border-brown/10 py-2.5 text-left text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30",
          active ? "font-semibold text-maroon" : "text-brown/80 hover:text-brown"
        )}
      >
        <span>{item.label}</span>
        {open.has(item.id) ? (
          <span className="shrink-0 text-sm font-normal text-muted-foreground">
            Open
          </span>
        ) : null}
      </button>
    );
  };

  return (
    <div>
      <nav aria-label="Profile sections">{chapters.map(renderItem)}</nav>
      {account ? (
        <nav aria-label="Account" className="mt-8">
          {renderItem(account)}
        </nav>
      ) : null}
    </div>
  );
}

SectionIndex.propTypes = {
  sectionId: PropTypes.string.isRequired,
  openSectionIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default function StudioShell({
  sectionId,
  completionPercent,
  portraitUrl,
  openSectionIds = [],
  notice,
  onSelectSection,
  onContinue,
  onPrevious,
  showSave = true,
  isDirty = false,
  saving = false,
  canGoPrevious = false,
  canGoNext = false,
  children,
}) {
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const section = SECTIONS.find((item) => item.id === sectionId) || SECTIONS[0];
  const showPrimary =
    section.id !== "account" && (canGoNext || (showSave && isDirty));
  const continueLabel = saving
    ? "Saving…"
    : canGoNext
      ? showSave && isDirty
        ? "Save and continue"
        : "Continue"
      : "Save";

  const chooseSection = (id) => {
    setSectionsOpen(false);
    onSelectSection(id);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:pb-12">
      <div className="flex items-start justify-between gap-4 lg:hidden">
        <CompletionMark completionPercent={completionPercent} />
        <button
          type="button"
          className={cn(authTextButtonClassName, "mt-2 shrink-0")}
          onClick={() => setSectionsOpen(true)}
        >
          Sections
        </button>
      </div>

      <div className="mt-10 grid lg:mt-0 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <button
            type="button"
            onClick={() => onSelectSection("pictures")}
            aria-label={portraitUrl ? "Edit your portrait" : undefined}
            className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30"
          >
            {portraitUrl ? (
              <img
                src={portraitUrl}
                alt=""
                className="size-20 rounded-lg object-cover object-top"
              />
            ) : (
              <span className="text-sm font-semibold text-maroon">
                No portrait yet
              </span>
            )}
          </button>

          <div className="mt-6">
            <CompletionMark completionPercent={completionPercent} />
          </div>

          <div className="mt-6">
            <SectionIndex
              sectionId={sectionId}
              openSectionIds={openSectionIds}
              onSelect={onSelectSection}
            />
          </div>
        </aside>

        <section className="min-w-0">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-brown sm:text-4xl">
            {section.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {section.guidance}
          </p>

          {notice ? (
            <div
              className={cn(
                "mt-6 rounded-lg border px-4 py-3 text-sm",
                notice.type === "success"
                  ? "border-brown/15 bg-secondary text-brown"
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

          <div className="mt-10 hidden items-center justify-between gap-3 border-t border-brown/10 pt-6 lg:flex">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!canGoPrevious || saving}
              className={cn(authSecondaryButtonClassName, "w-auto")}
            >
              Previous
            </button>
            {showPrimary ? (
              <button
                type="button"
                onClick={onContinue}
                disabled={saving}
                className={cn(authPrimaryButtonClassName, "w-auto")}
              >
                {continueLabel}
              </button>
            ) : null}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-paper lg:hidden">
        <div className="mx-auto flex w-full max-w-6xl gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onPrevious}
            disabled={!canGoPrevious || saving}
            className={cn(
              authSecondaryButtonClassName,
              showPrimary ? "flex-1" : "w-full"
            )}
          >
            Back
          </button>
          {showPrimary ? (
            <button
              type="button"
              onClick={onContinue}
              disabled={saving}
              className={cn(authPrimaryButtonClassName, "flex-[1.4]")}
            >
              {continueLabel}
            </button>
          ) : null}
        </div>
      </div>

      <Sheet open={sectionsOpen} onOpenChange={setSectionsOpen}>
        <SheetContent
          side="left"
          className="w-full overflow-y-auto border-brown/10 bg-paper p-0 text-brown sm:max-w-xs"
          closeButtonClassName="text-brown hover:bg-secondary hover:text-brown"
        >
          <SheetHeader className="px-6 pt-6 pr-14">
            <SheetTitle className="font-display text-2xl font-semibold text-brown">
              Sections
            </SheetTitle>
          </SheetHeader>
          <div className="px-6 pb-8">
            <SectionIndex
              sectionId={sectionId}
              openSectionIds={openSectionIds}
              onSelect={chooseSection}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

StudioShell.propTypes = {
  sectionId: PropTypes.string.isRequired,
  completionPercent: PropTypes.number.isRequired,
  portraitUrl: PropTypes.string,
  openSectionIds: PropTypes.arrayOf(PropTypes.string),
  notice: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  onSelectSection: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  showSave: PropTypes.bool,
  isDirty: PropTypes.bool,
  saving: PropTypes.bool,
  canGoPrevious: PropTypes.bool,
  canGoNext: PropTypes.bool,
  children: PropTypes.node,
};

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

UnsavedChangesDialog.propTypes = {
  open: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};
