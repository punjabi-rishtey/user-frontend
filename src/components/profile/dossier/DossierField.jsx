import {
  authInputClassName,
  authLabelClassName,
} from "@/components/ui/formStyles";
import { cn } from "@/lib/utils";

export function DossierField({
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
  readOnly = false,
  placeholder = "",
  rows = 4,
  hint = "",
}) {
  const displayValue =
    value === true ? "true" : value === false ? "false" : value ?? "";

  return (
    <div className="w-full">
      <label htmlFor={name} className={authLabelClassName}>
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={displayValue}
          onChange={onChange}
          disabled={readOnly}
          className={cn(authInputClassName, readOnly && "bg-secondary/60")}
        >
          {options.map((option) => (
            <option key={String(option.value)} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={displayValue}
          onChange={onChange}
          readOnly={readOnly}
          rows={rows}
          placeholder={placeholder}
          className={cn(
            authInputClassName,
            "min-h-[8rem] resize-y",
            readOnly && "bg-secondary/60"
          )}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={displayValue}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className={cn(authInputClassName, readOnly && "bg-secondary/60")}
        />
      )}
      {hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function DossierFieldGrid({ children, cols = 1 }) {
  return (
    <div
      className={cn(
        "grid gap-5",
        cols === 2 ? "sm:grid-cols-2" : "grid-cols-1"
      )}
    >
      {children}
    </div>
  );
}
