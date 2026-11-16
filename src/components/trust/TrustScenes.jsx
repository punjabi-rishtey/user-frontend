/**
 * Custom tonal paper-cut scenes for the “Why families trust us” panels.
 * Stroke/ink inherits via `currentColor` (maroon on the art frame by default).
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

/** Soft community silhouettes on paper */
export function SceneCommunity({ className }) {
  return (
    <SceneFrame className={className}>
      <rect
        width="320"
        height="200"
        fill="color-mix(in oklab, var(--paper) 80%, var(--ivory))"
      />
      <ellipse cx="160" cy="170" rx="100" ry="12" fill="currentColor" opacity="0.08" />
      <g fill="currentColor" opacity="0.55">
        <circle cx="106" cy="84" r="16" />
        <path d="M82 148c8-34 40-34 48 0z" />
        <circle cx="160" cy="70" r="19" />
        <path d="M128 152c10-40 54-40 64 0z" />
        <circle cx="214" cy="84" r="16" />
        <path d="M190 148c8-34 40-34 48 0z" />
      </g>
      <g fill="var(--ivory)" opacity="0.9">
        <circle cx="106" cy="84" r="6" />
        <circle cx="160" cy="70" r="7" />
        <circle cx="214" cy="84" r="6" />
      </g>
    </SceneFrame>
  );
}

/** Document + verified seal */
export function SceneVerified({ className }) {
  return (
    <SceneFrame className={className}>
      <rect
        width="320"
        height="200"
        fill="color-mix(in oklab, var(--paper) 80%, var(--ivory))"
      />
      <rect
        x="108"
        y="44"
        width="104"
        height="120"
        rx="8"
        fill="var(--ivory)"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.9"
      />
      <rect x="128" y="72" width="64" height="6" rx="3" fill="currentColor" opacity="0.2" />
      <rect x="128" y="90" width="64" height="6" rx="3" fill="currentColor" opacity="0.16" />
      <rect x="128" y="108" width="40" height="6" rx="3" fill="currentColor" opacity="0.12" />
      <circle cx="186" cy="140" r="28" fill="var(--maroon)" />
      <path
        d="M174 140l7 7 14-14"
        stroke="var(--ivory)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SceneFrame>
  );
}

/** Two people meeting with a warm bridge gesture */
export function SceneContact({ className }) {
  return (
    <SceneFrame className={className}>
      <rect
        width="320"
        height="200"
        fill="color-mix(in oklab, var(--paper) 80%, var(--ivory))"
      />
      <path
        d="M48 158c40-44 184-44 224 0"
        stroke="currentColor"
        strokeWidth="8"
        opacity="0.08"
        strokeLinecap="round"
      />
      <g fill="currentColor" opacity="0.5">
        <circle cx="120" cy="82" r="18" />
        <path d="M94 148c8-36 44-36 52 0z" />
        <circle cx="200" cy="82" r="18" />
        <path d="M174 148c8-36 44-36 52 0z" />
      </g>
      <path
        d="M142 112c10 14 26 14 36 0"
        stroke="var(--maroon)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </SceneFrame>
  );
}
