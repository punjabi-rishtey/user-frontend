import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PhotoLightbox({
  photos,
  activeIndex,
  open,
  onClose,
  onNavigate,
}) {
  const closeRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 0);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate?.("prev");
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate?.("next");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === "function"
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [open, onClose, onNavigate]);

  if (!open || !photos?.length) return null;

  const current = photos[activeIndex] ?? photos[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        ref={closeRef}
        type="button"
        className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        onClick={onClose}
        aria-label="Close"
      >
        <FaTimes size={20} />
      </button>

      <img
        src={current}
        alt=""
        className="max-h-[85vh] max-w-[85vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {photos.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute top-1/2 left-4 z-50 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("prev");
            }}
            aria-label="Previous photo"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-4 z-50 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("next");
            }}
            aria-label="Next photo"
          >
            <FaChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 px-3 py-2">
            {photos.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`size-2 rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                  index === activeIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(index);
                }}
                aria-label={`Photo ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

PhotoLightbox.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
  activeIndex: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNavigate: PropTypes.func,
};
