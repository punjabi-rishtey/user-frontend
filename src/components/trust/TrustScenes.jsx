/**
 * Custom line-art scenes for the “Why families trust us” panels.
 * Stroke color inherits via `currentColor` (set maroon/brown on the parent).
 */

function SceneFrame({ children, className = "" }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Three figures + soft phulkari-like pattern - community circle */
export function SceneCommunity({ className }) {
  return (
    <SceneFrame className={className}>
      <defs>
        <pattern
          id="trust-phulkari"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="14" cy="14" r="1.4" fill="currentColor" opacity="0.22" />
          <path
            d="M14 6.5l1.4 3.6 3.8 1.4-3.8 1.4L14 16.5l-1.4-3.6-3.8-1.4 3.8-1.4z"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.28"
          />
        </pattern>
      </defs>
      <rect width="320" height="200" fill="url(#trust-phulkari)" opacity="0.85" />
      <ellipse
        cx="160"
        cy="168"
        rx="108"
        ry="14"
        fill="currentColor"
        opacity="0.06"
      />
      {/* left figure */}
      <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <circle cx="104" cy="78" r="14" />
        <path d="M80 138c6-28 42-28 48 0" />
      </g>
      {/* center figure */}
      <g stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
        <circle cx="160" cy="66" r="16" />
        <path d="M128 142c8-34 56-34 64 0" />
      </g>
      {/* right figure */}
      <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <circle cx="216" cy="78" r="14" />
        <path d="M192 138c6-28 42-28 48 0" />
      </g>
      {/* ornamental arcs */}
      <path
        d="M48 42c14 0 14 10 28 10s14-10 28-10"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <path
        d="M216 42c14 0 14 10 28 10s14-10 28-10"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
    </SceneFrame>
  );
}

/** Document + verified seal - human review */
export function SceneVerified({ className }) {
  return (
    <SceneFrame className={className}>
      <circle
        cx="160"
        cy="98"
        r="68"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.28"
      />
      <circle
        cx="160"
        cy="98"
        r="52"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="4 5"
        opacity="0.4"
      />
      {/* document */}
      <rect
        x="118"
        y="58"
        width="84"
        height="96"
        rx="5"
        fill="color-mix(in oklab, var(--ivory) 92%, white)"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M136 82h48M136 98h48M136 114h28"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* seal */}
      <circle cx="186" cy="138" r="22" fill="var(--maroon)" />
      <path
        d="M176 138l6.5 6.5 14-14"
        stroke="var(--ivory)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SceneFrame>
  );
}

/** Two figures meeting - respectful introduction */
export function SceneContact({ className }) {
  return (
    <SceneFrame className={className}>
      <path
        d="M40 158c40-56 200-56 240 0"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.22"
      />
      {/* left person */}
      <g stroke="currentColor" strokeWidth="1.85" strokeLinecap="round">
        <circle cx="118" cy="74" r="15" />
        <path d="M92 138c8-30 44-30 52 0" />
      </g>
      {/* right person */}
      <g stroke="currentColor" strokeWidth="1.85" strokeLinecap="round">
        <circle cx="202" cy="74" r="15" />
        <path d="M176 138c8-30 44-30 52 0" />
      </g>
      {/* bridge gesture */}
      <path
        d="M138 100c10 16 34 16 44 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* diamond accents */}
      <path
        d="M56 48l10 5-10 5-10-5z"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.4"
      />
      <path
        d="M264 48l10 5-10 5-10-5z"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.4"
      />
      <path
        d="M160 36l7 3.5-7 3.5-7-3.5z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
    </SceneFrame>
  );
}
