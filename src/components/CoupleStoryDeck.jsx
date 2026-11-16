import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const storyShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string,
  photo: PropTypes.string,
  quote: PropTypes.string,
  metaLabel: PropTypes.string,
  metaValue: PropTypes.string,
});

const SWIPE_THRESHOLD = 80;
const VELOCITY_THRESHOLD = 500;
const EXIT_DISTANCE = 560;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * Heirloom album deck - layered prints with a real fly-off animation.
 *
 * Reliability notes: the top card is driven by a single `useMotionValue` for x
 * (never `dragSnapToOrigin`, which fights a committed swipe). Committing a swipe
 * or clicking an arrow spawns a decoupled "fly-away" print that continues in the
 * throw direction and leaves the screen, while the index advances so the next
 * print rises into place. This avoids AnimatePresence exit pitfalls entirely and
 * makes arrow clicks animate identically to drags.
 */
export default function CoupleStoryDeck({ stories = [] }) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [flyaway, setFlyaway] = useState(null);
  const flyawayKey = useRef(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-EXIT_DISTANCE, 0, EXIT_DISTANCE], [-16, 0, 16]);

  const count = stories.length;
  const busy = flyaway !== null;

  if (count === 0) return null;

  const top = stories[index];
  const behind = [1, 2]
    .filter((offset) => offset < count)
    .map((offset) => ({
      offset,
      story: stories[(index + offset) % count],
    }));

  // dirIndex: +1 advances to the next couple, -1 goes back to the previous.
  const commit = (dirIndex, fromX = 0) => {
    if (busy || count < 1) return;

    if (reducedMotion) {
      setIndex((i) => (i + dirIndex + count) % count);
      return;
    }

    // A "next" card is thrown to the left; a "previous" card is thrown right.
    const flyDir = dirIndex > 0 ? -1 : 1;
    flyawayKey.current += 1;
    setFlyaway({
      key: flyawayKey.current,
      story: stories[index],
      fromX,
      flyDir,
    });
    x.set(0);
    setIndex((i) => (i + dirIndex + count) % count);
  };

  const snapBack = () => {
    animate(x, 0, { type: "spring", stiffness: 320, damping: 30 });
  };

  const handleDragEnd = (_event, info) => {
    if (reducedMotion) return;
    const { offset, velocity } = info;
    const shouldCommit =
      Math.abs(offset.x) > SWIPE_THRESHOLD ||
      Math.abs(velocity.x) > VELOCITY_THRESHOLD;

    if (!shouldCommit || busy) {
      snapBack();
      return;
    }

    // Throw direction follows the finger; dragging right goes to the previous.
    const dirIndex = offset.x > 0 ? -1 : 1;
    commit(dirIndex, x.get());
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      <div
        className="relative mx-auto h-[min(32rem,72vh)] w-full max-w-md overflow-visible sm:h-[36rem]"
        aria-roledescription="carousel"
        aria-label="Couple success stories album"
      >
        {behind
          .slice()
          .reverse()
          .map(({ offset, story }) => (
            <motion.div
              key={`behind-${story.id}`}
              className="pointer-events-none absolute inset-x-0 top-0 origin-bottom"
              style={{ zIndex: 10 - offset, height: "100%" }}
              initial={false}
              animate={{
                scale: 1 - offset * 0.05,
                y: offset * 16,
                rotate: offset === 1 ? -2.8 : 3.2,
                opacity: 1 - offset * 0.08,
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 26 }
              }
            >
              <AlbumPrint story={story} />
            </motion.div>
          ))}

        {/* Top interactive print - remounts per index so it rises into place. */}
        <motion.article
          key={`top-${index}`}
          className="absolute inset-x-0 top-0 z-20 h-full origin-bottom"
          style={reducedMotion ? undefined : { x, rotate }}
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0.6, scale: 0.94, y: 20 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={
            reducedMotion
              ? { duration: 0.18 }
              : { type: "spring", stiffness: 320, damping: 30 }
          }
          drag={reducedMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
        >
          <div
            className={
              reducedMotion
                ? "h-full"
                : "h-full cursor-grab active:cursor-grabbing"
            }
          >
            <AlbumPrint story={top} />
          </div>
        </motion.article>

        {/* Decoupled fly-away print that carries the outgoing card off screen. */}
        {flyaway && !reducedMotion ? (
          <motion.div
            key={`fly-${flyaway.key}`}
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full origin-bottom"
            initial={{
              x: flyaway.fromX,
              rotate: (flyaway.fromX / EXIT_DISTANCE) * 16,
              opacity: 1,
            }}
            animate={{
              x: flyaway.flyDir * EXIT_DISTANCE,
              rotate: flyaway.flyDir * 16,
              opacity: 0,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onAnimationComplete={() => setFlyaway(null)}
          >
            <AlbumPrint story={flyaway.story} />
          </motion.div>
        ) : null}
      </div>

      <div className="mt-10 flex items-center justify-center gap-5 sm:gap-6">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 rounded-full border-brown/15 bg-ivory text-brown shadow-[0_6px_18px_-12px_rgba(43,24,16,0.45)] hover:border-transparent hover:bg-maroon hover:text-primary-foreground hover:shadow-[0_10px_22px_-12px_rgba(153,0,0,0.55)] disabled:hover:border-brown/15 disabled:hover:bg-ivory disabled:hover:text-brown disabled:hover:shadow-none"
          onClick={() => commit(-1)}
          disabled={busy}
          aria-label="Previous couple"
        >
          <ChevronLeft className="size-5" strokeWidth={1.75} />
        </Button>

        <p
          className="min-w-[4.75rem] text-center font-display text-sm tracking-[0.2em] text-brown/80 tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {String(index + 1).padStart(2, "0")}
          <span className="text-muted-foreground/70"> / </span>
          {String(count).padStart(2, "0")}
        </p>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 rounded-full border-brown/15 bg-ivory text-brown shadow-[0_6px_18px_-12px_rgba(43,24,16,0.45)] hover:border-transparent hover:bg-maroon hover:text-primary-foreground hover:shadow-[0_10px_22px_-12px_rgba(153,0,0,0.55)] disabled:hover:border-brown/15 disabled:hover:bg-ivory disabled:hover:text-brown disabled:hover:shadow-none"
          onClick={() => commit(1)}
          disabled={busy}
          aria-label="Next couple"
        >
          <ChevronRight className="size-5" strokeWidth={1.75} />
        </Button>
      </div>

      {!reducedMotion ? (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Drag the print aside to turn to the next couple
        </p>
      ) : null}
    </div>
  );
}

CoupleStoryDeck.propTypes = {
  stories: PropTypes.arrayOf(storyShape),
};

function AlbumPrint({ story }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-sm border border-brown/15 bg-card shadow-[0_20px_55px_-30px_rgba(43,24,16,0.5)]">
      <div className="min-h-0 flex-[1.35] bg-ivory p-3 pb-0 sm:p-4 sm:pb-0">
        <div className="h-full overflow-hidden bg-secondary/30">
          {story.photo ? (
            <img
              src={story.photo}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center font-display text-5xl text-brown/25 italic"
              aria-hidden
            >
              {story.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6">
        <blockquote className="line-clamp-3 font-display text-lg leading-snug text-brown-deep italic sm:text-xl">
          &ldquo;{story.quote}&rdquo;
        </blockquote>
        <div className="mt-3 border-t border-border pt-3">
          <h3 className="font-display text-base font-semibold text-brown sm:text-lg">
            {story.name}
          </h3>
          {story.metaValue ? (
            <p className="mt-1 text-[10px] font-medium tracking-[0.14em] text-maroon uppercase sm:text-[11px]">
              {story.metaLabel} · {story.metaValue}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

AlbumPrint.propTypes = {
  story: storyShape.isRequired,
};
