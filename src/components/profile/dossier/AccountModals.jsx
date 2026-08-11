import {
  authInputClassName,
  authLabelClassName,
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
  authTextButtonClassName,
} from "@/components/ui/formStyles";
import { cn } from "@/lib/utils";

export function PasswordModal({
  open,
  form,
  error,
  loading,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown-deep/60 p-4">
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-6"
        role="dialog"
        aria-labelledby="dossier-password-title"
      >
        <h2
          id="dossier-password-title"
          className="font-display text-2xl text-brown"
        >
          Change password
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          After a successful change you will be signed out and asked to log in
          again.
        </p>
        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="currentPassword" className={authLabelClassName}>
              Current password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={form.currentPassword}
              onChange={onChange}
              className={authInputClassName}
              autoComplete="current-password"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className={authLabelClassName}>
              New password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={onChange}
              className={authInputClassName}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={authLabelClassName}>
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={onChange}
              className={authInputClassName}
              autoComplete="new-password"
            />
          </div>
          {error ? (
            <p className="text-sm text-maroon" role="alert">
              {error}
            </p>
          ) : null}
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className={cn(authSecondaryButtonClassName, "flex-1")}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={cn(authPrimaryButtonClassName, "flex-1")}
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "Saving…" : "Update password"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeleteAccountModal({ open, loading, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown-deep/60 p-4">
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-6"
        role="dialog"
        aria-labelledby="dossier-delete-title"
      >
        <h2
          id="dossier-delete-title"
          className="font-display text-2xl text-brown"
        >
          Delete account
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This permanently removes your profile and cannot be undone. Are you
          sure?
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className={cn(authSecondaryButtonClassName, "flex-1")}
            onClick={onClose}
            disabled={loading}
          >
            Keep account
          </button>
          <button
            type="button"
            className={cn(
              authPrimaryButtonClassName,
              "flex-1 bg-maroon hover:bg-[#7a0000]"
            )}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting…" : "Delete permanently"}
          </button>
        </div>
        <button
          type="button"
          className={cn(authTextButtonClassName, "mt-4")}
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
