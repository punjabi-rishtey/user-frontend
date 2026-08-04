import { Link } from "react-router-dom";
import { MessageCircle, MonitorSmartphone, Phone } from "lucide-react";
import PageShell from "./PageShell";
import {
  SUPPORT_PHONE_LINK,
  SUPPORT_PHONE_NUMBER,
  SUPPORT_WHATSAPP_LINK,
} from "../config/constants";
import {
  authCardClassName,
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
  authSupportChipClassName,
} from "./ui/formStyles";

const SessionLimitPage = () => {
  return (
    <PageShell>
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:py-16">
        <div className={`mx-auto max-w-md text-center ${authCardClassName}`}>
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-secondary text-maroon">
            <MonitorSmartphone className="size-7" aria-hidden="true" />
          </div>
          <p className="mb-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Punjabi Rishtey
          </p>
          <h1 className="font-display text-3xl font-semibold text-brown sm:text-4xl">
            Already signed in elsewhere
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This account can be signed in on up to 2 browsers or devices at a
            time. Log out from one of your other open sessions, then try again.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link to="/login" className={authPrimaryButtonClassName}>
              Back to login
            </Link>
            <Link to="/" className={authSecondaryButtonClassName}>
              Go to home
            </Link>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-3 text-sm text-muted-foreground">
              Need help ending another session?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={SUPPORT_PHONE_LINK}
                className={authSupportChipClassName}
              >
                <Phone className="size-4" aria-hidden="true" />
                {SUPPORT_PHONE_NUMBER}
              </a>
              <a
                href={SUPPORT_WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className={authSupportChipClassName}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default SessionLimitPage;
