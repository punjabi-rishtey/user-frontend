/**
 * AtmosphereCard - reference recreation.
 *
 * A square card with a clean white top for copy, a blurred mesh wash
 * (emerald -> yellow -> orange) along the bottom, and thin white sunburst
 * rays fanning out from a bright convergence point low-left of center,
 * masked so they dissolve into the white text zone.
 *
 * CSS + SVG only. No external assets.
 */

const RAY_COUNT = 104;
// Convergence point (in the 400x400 viewBox) - low and left of center,
// matching the reference bright spot.
const FOCAL_X = 168;
const FOCAL_Y = 250;
const RAY_RADIUS = 780;

function SunburstRays() {
  const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
    const angle = (360 / RAY_COUNT) * i;
    const rad = (angle * Math.PI) / 180;
    return {
      key: i,
      x2: FOCAL_X + RAY_RADIUS * Math.cos(rad),
      y2: FOCAL_Y + RAY_RADIUS * Math.sin(rad),
    };
  });

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g stroke="#ffffff" strokeWidth="0.7" opacity="0.5">
        {rays.map((r) => (
          <line key={r.key} x1={FOCAL_X} y1={FOCAL_Y} x2={r.x2} y2={r.y2} />
        ))}
      </g>
    </svg>
  );
}

export default function AtmosphereCard({
  title = "Blur the edge of possible",
  body = "Push data past its limits, and it starts telling stories you didn't know were there.",
  className = "",
}) {
  return (
    <div
      className={`relative aspect-square w-full max-w-[420px] overflow-hidden rounded-[32px] bg-white font-sans shadow-[0_24px_60px_-24px_rgba(30,30,30,0.4)] ring-1 ring-black/5 ${className}`}
    >
      {/* Mesh wash - blurred organic color field anchored to the bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          filter: "blur(40px)",
          backgroundImage: [
            "radial-gradient(50% 46% at 12% 84%, rgba(22,170,120,1), transparent 72%)",
            "radial-gradient(48% 44% at 33% 72%, rgba(150,200,45,1), transparent 70%)",
            "radial-gradient(46% 42% at 46% 62%, rgba(250,215,70,1), transparent 68%)",
            "radial-gradient(52% 48% at 70% 58%, rgba(246,158,44,1), transparent 70%)",
            "radial-gradient(50% 48% at 92% 70%, rgba(238,132,40,1), transparent 72%)",
            "radial-gradient(46% 44% at 82% 100%, rgba(96,150,70,1), transparent 72%)",
          ].join(","),
        }}
      />

      {/* Bright convergence glow where the rays originate */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(28% 26% at 42% 62%, rgba(255,252,236,0.62), transparent 72%)",
        }}
      />

      {/* Sunburst rays, masked to fade upward into the white zone */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, black 34%, rgba(0,0,0,0.8) 58%, transparent 90%)",
          maskImage:
            "linear-gradient(to top, black 34%, rgba(0,0,0,0.8) 58%, transparent 90%)",
        }}
      >
        <SunburstRays />
      </div>

      {/* White veil so the top reads as clean white and the wash only lives low */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff 32%, rgba(255,255,255,0.62) 46%, rgba(255,255,255,0) 62%)",
        }}
      />

      {/* Copy */}
      <div className="relative flex flex-col gap-2 p-8 sm:p-10">
        <h3
          className="text-[22px] font-bold leading-tight tracking-tight text-neutral-900 sm:text-[26px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {title}
        </h3>
        <p
          className="max-w-[86%] bg-clip-text text-[15px] leading-snug text-transparent sm:text-[17px]"
          style={{
            fontFamily: "var(--font-sans)",
            backgroundImage:
              "linear-gradient(102deg, #444444 0%, #55503f 52%, #7c6a38 72%, #b5852b 100%)",
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}
