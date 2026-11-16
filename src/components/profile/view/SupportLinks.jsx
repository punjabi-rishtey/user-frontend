import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import {
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_LINK,
  SUPPORT_PHONE_LINK,
  SUPPORT_PHONE_NUMBER,
  SUPPORT_WHATSAPP_LINK,
} from "../../../config/constants";

export default function SupportLinks({ className = "", variant = "light" }) {
  const onDark = variant === "dark";
  const linkClass = onDark
    ? "text-sm font-medium text-ivory/85 underline-offset-4 hover:text-ivory hover:underline"
    : "text-sm font-medium text-maroon underline-offset-4 hover:underline";

  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5",
        className
      )}
    >
      <a href={SUPPORT_PHONE_LINK} className={linkClass}>
        Call {SUPPORT_PHONE_NUMBER}
      </a>
      <a
        href={SUPPORT_WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        WhatsApp
      </a>
      <a href={SUPPORT_EMAIL_LINK} className={linkClass}>
        {SUPPORT_EMAIL}
      </a>
    </div>
  );
}

SupportLinks.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["light", "dark"]),
};
