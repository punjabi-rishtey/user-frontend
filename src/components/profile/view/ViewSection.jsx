import PropTypes from "prop-types";
import FactRow from "./FactRow";

export default function ViewSection({ id, title, facts = [], children }) {
  const hasFacts = facts.length > 0;
  if (!hasFacts && !children) return null;

  return (
    <section id={id} className="scroll-mt-28">
      <div className="rounded-xl border border-brown/10 bg-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <h2 className="font-sans text-[11px] font-semibold tracking-[0.2em] text-maroon uppercase">
            {title}
          </h2>
          <span className="h-px flex-1 bg-brown/10" aria-hidden />
        </div>
        {hasFacts ? (
          <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {facts.map(({ label, value, multiline }) => (
              <FactRow
                key={label}
                label={label}
                value={value}
                multiline={multiline}
              />
            ))}
          </dl>
        ) : null}
        {children ? (
          <div className={hasFacts ? "mt-6" : "mt-4"}>{children}</div>
        ) : null}
      </div>
    </section>
  );
}

ViewSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  facts: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      multiline: PropTypes.bool,
    })
  ),
  children: PropTypes.node,
};
