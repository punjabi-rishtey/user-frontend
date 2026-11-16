import { MoreHorizontal } from "lucide-react";
import { CHAPTERS, COMPLETION_TARGET } from "./constants";
import {
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
  authTextButtonClassName,
} from "@/components/ui/formStyles";
import { cn } from "@/lib/utils";

export default function DossierShell({
  chapterIndex,
  completionPercent,
  notice,
  onBack,
  onContinue,
  onSave,
  showSave = true,
  saving = false,
  continueLabel = "Continue",
  accountMenuOpen,
  onToggleAccountMenu,
  onChangePassword,
  onDeleteAccount,
  onLogout,
  children,
}) {
  const chapter = CHAPTERS[chapterIndex];
  const atTarget = completionPercent >= COMPLETION_TARGET;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-28 pt-8 sm:px-6 sm:pt-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-semibold tracking-tight text-brown sm:text-5xl">
            {completionPercent}%
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
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

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleAccountMenu(e);
            }}
            className="inline-flex size-10 items-center justify-center rounded-lg text-brown transition-colors hover:bg-secondary"
            aria-label="Account options"
            aria-expanded={accountMenuOpen}
          >
            <MoreHorizontal className="size-5" />
          </button>
          {accountMenuOpen ? (
            <div
              className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-border bg-card py-1 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="block w-full px-4 py-2.5 text-left text-sm text-brown hover:bg-secondary"
                onClick={onChangePassword}
              >
                Change password
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2.5 text-left text-sm text-brown hover:bg-secondary"
                onClick={onLogout}
              >
                Log out
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2.5 text-left text-sm text-maroon hover:bg-secondary"
                onClick={onDeleteAccount}
              >
                Delete account
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        Chapter {chapterIndex + 1} of {CHAPTERS.length} · {chapter.label}
      </p>

      <nav
        className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar"
        aria-label="Profile chapters"
      >
        {CHAPTERS.map((item, index) => (
          <span
            key={item.id}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-xs",
              index === chapterIndex
                ? "bg-brown text-ivory"
                : index < chapterIndex
                  ? "bg-secondary text-brown"
                  : "text-muted-foreground"
            )}
          >
            {item.label}
          </span>
        ))}
      </nav>

      <h1 className="mt-6 font-display text-3xl font-semibold text-brown sm:text-4xl">
        {chapter.title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {chapter.guidance}
      </p>

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

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-xl gap-3 px-4 py-3 sm:px-6">
          {chapterIndex > 0 ? (
            <button
              type="button"
              onClick={onBack}
              disabled={saving}
              className={cn(authSecondaryButtonClassName, "flex-1")}
            >
              Back
            </button>
          ) : (
            <div className="flex-1" />
          )}
          {showSave ? (
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className={cn(authTextButtonClassName, "px-2")}
            >
              {saving ? "Saving…" : "Save this chapter"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onContinue}
            disabled={saving}
            className={cn(authPrimaryButtonClassName, "flex-[1.4]")}
          >
            {saving ? "Please wait…" : continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
