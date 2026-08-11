import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export default function FactRow({ label, value, multiline = false }) {
  if (value == null || String(value).trim() === "") return null;

  return (
    <div className={cn(multiline && "sm:col-span-2")}>
      <dt className="text-[13px] tracking-[0.06em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1 text-[17px] leading-snug font-medium break-words text-brown-deep",
          multiline && "whitespace-pre-wrap"
        )}
      >
        {value}
      </dd>
    </div>
  );
}

FactRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  multiline: PropTypes.bool,
};
