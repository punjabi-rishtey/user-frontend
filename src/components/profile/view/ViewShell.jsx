import { useState } from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import PhotoLightbox from "./PhotoLightbox";

export default function ViewShell({
  photos = [],
  sections = [],
  activeSectionId,
  onSelectSection,
  memberName = "",
  identityLine = "",
  children,
}) {
  const photoList = photos?.length > 0 ? photos : [];
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeIndex =
    photoList.length === 0 ? 0 : Math.min(currentPhoto, photoList.length - 1);
  const portraitUrl = photoList[safeIndex] || null;
  const initial = (memberName || "?").charAt(0).toUpperCase();
  const photoCountLabel =
    photoList.length === 1
      ? "1 photograph"
      : `${photoList.length} photographs`;

  const openLightbox = (index) => {
    setCurrentPhoto(index);
    setLightboxOpen(true);
  };

  const handleLightboxNavigate = (direction) => {
    if (typeof direction === "number") {
      setCurrentPhoto(direction);
      return;
    }
    setCurrentPhoto((prev) => {
      if (direction === "next") {
        return prev === photoList.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? photoList.length - 1 : prev - 1;
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:pb-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {/* Mobile full-bleed portrait with scrim */}
          <div className="-mx-4 sm:-mx-6 lg:mx-0">
            <div className="relative lg:hidden">
              <button
                type="button"
                className="block w-full overflow-hidden bg-secondary text-left focus-visible:ring-2 focus-visible:ring-maroon focus-visible:outline-none"
                onClick={() => (portraitUrl ? openLightbox(safeIndex) : null)}
                disabled={!portraitUrl}
                aria-label={
                  memberName
                    ? `View photos of ${memberName}`
                    : "View photos"
                }
              >
                {portraitUrl ? (
                  <img
                    src={portraitUrl}
                    alt={
                      memberName
                        ? `Portrait of ${memberName}`
                        : "Profile portrait"
                    }
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                ) : (
                  <div
                    className="flex aspect-[4/5] w-full items-center justify-center bg-ivory font-display text-5xl text-brown/25 italic"
                    aria-hidden
                  >
                    {initial}
                  </div>
                )}
              </button>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown-deep/90 via-brown-deep/40 to-transparent px-5 pt-24 pb-5"
                aria-hidden
              >
                {memberName ? (
                  <p className="font-display text-[2rem] leading-tight font-semibold text-ivory">
                    {memberName}
                  </p>
                ) : null}
                {identityLine ? (
                  <p className="mt-2 text-[15px] leading-relaxed text-ivory/80">
                    {identityLine}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Desktop album print */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-sm border border-brown/15 bg-card shadow-[0_20px_55px_-30px_rgba(43,24,16,0.5)]">
                <div className="bg-ivory p-3 pb-0 sm:p-4 sm:pb-0">
                  <button
                    type="button"
                    onClick={() =>
                      portraitUrl ? openLightbox(safeIndex) : null
                    }
                    disabled={!portraitUrl}
                    aria-label={
                      memberName
                        ? `View photos of ${memberName}`
                        : "View photos"
                    }
                    className="block w-full overflow-hidden bg-secondary/30 focus-visible:ring-2 focus-visible:ring-maroon focus-visible:outline-none"
                  >
                    {portraitUrl ? (
                      <img
                        src={portraitUrl}
                        alt={
                          memberName
                            ? `Portrait of ${memberName}`
                            : "Profile portrait"
                        }
                        className="aspect-[4/5] w-full object-cover object-top"
                      />
                    ) : (
                      <div
                        className="flex aspect-[4/5] w-full items-center justify-center font-display text-5xl text-brown/25 italic"
                        aria-hidden
                      >
                        {initial}
                      </div>
                    )}
                  </button>
                </div>
                <div className="px-4 pt-4 pb-5">
                  {memberName ? (
                    <p className="font-display text-lg font-semibold text-brown">
                      {memberName}
                    </p>
                  ) : null}
                  <p className="mt-1 text-[11px] font-medium tracking-[0.14em] text-maroon uppercase">
                    {photoList.length > 0 ? photoCountLabel : "No photographs"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {photoList.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar lg:mt-3 lg:grid lg:grid-cols-4 lg:gap-1.5 lg:overflow-visible">
              {photoList.map((photo, index) => (
                <button
                  key={`${photo}-${index}`}
                  type="button"
                  onClick={() => {
                    setCurrentPhoto(index);
                    openLightbox(index);
                  }}
                  aria-label={`Photo ${index + 1} of ${photoList.length}`}
                  className={cn(
                    "w-16 shrink-0 overflow-hidden rounded-md bg-secondary focus-visible:ring-2 focus-visible:ring-maroon focus-visible:outline-none lg:w-auto",
                    index === safeIndex
                      ? "ring-2 ring-maroon"
                      : "opacity-80 hover:opacity-100"
                  )}
                >
                  <img
                    src={photo}
                    alt=""
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          ) : null}

          {sections.length > 0 ? (
            <>
              <p className="mt-6 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Sections
              </p>
              <nav
                className="mt-2 hidden space-y-0.5 lg:block"
                aria-label="Profile sections"
              >
                {sections.map((item) => {
                  const active = item.id === activeSectionId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectSection?.(item.id)}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] tracking-[0.02em] transition-colors",
                        active
                          ? "bg-secondary/70 font-semibold text-maroon"
                          : "text-brown/80 hover:bg-secondary/40 hover:text-brown"
                      )}
                    >
                      <span
                        className={cn(
                          "h-3.5 w-0.5 shrink-0 rounded-full",
                          active ? "bg-maroon" : "bg-transparent"
                        )}
                        aria-hidden
                      />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
              <nav
                className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1 lg:hidden"
                aria-label="Profile sections"
              >
                {sections.map((item) => {
                  const active = item.id === activeSectionId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectSection?.(item.id)}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "min-h-11 shrink-0 rounded-full px-3.5 text-sm transition-colors",
                        active
                          ? "bg-brown font-semibold text-ivory"
                          : "bg-secondary/70 text-brown/80 hover:text-brown"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </>
          ) : null}
        </aside>

        <div className="min-w-0">{children}</div>
      </div>

      <PhotoLightbox
        photos={photoList}
        activeIndex={safeIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleLightboxNavigate}
      />
    </div>
  );
}

ViewShell.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  activeSectionId: PropTypes.string,
  onSelectSection: PropTypes.func,
  memberName: PropTypes.string,
  identityLine: PropTypes.string,
  children: PropTypes.node,
};
