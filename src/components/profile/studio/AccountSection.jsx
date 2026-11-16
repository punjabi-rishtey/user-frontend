import {
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
} from "@/components/ui/formStyles";
import { cn } from "@/lib/utils";

export default function AccountSection({
  onChangePassword,
  onLogout,
  onDeleteAccount,
}) {
  return (
    <div className="max-w-md space-y-4">
      <button
        type="button"
        onClick={onChangePassword}
        className={cn(authSecondaryButtonClassName, "w-full")}
      >
        Change password
      </button>
      <button
        type="button"
        onClick={onLogout}
        className={cn(authSecondaryButtonClassName, "w-full")}
      >
        Log out
      </button>
      <button
        type="button"
        onClick={onDeleteAccount}
        className={cn(
          authPrimaryButtonClassName,
          "w-full bg-maroon hover:bg-[#7a0000]"
        )}
      >
        Delete account
      </button>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Deleting your account permanently removes your profile. This cannot be
        undone.
      </p>
    </div>
  );
}
