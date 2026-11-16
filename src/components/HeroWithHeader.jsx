import { useState } from "react";
import { motion } from "framer-motion";
import videoSrc from "@/assets/WeddingVideo.mp4";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAppNav } from "@/hooks/useAppNav";

export default function HeroWithHeader() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { navigate, goFindPartner, isAuthenticated, hasActiveMembership } =
    useAppNav();
  const memberHasPlan = hasActiveMembership();

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-brown-deep">
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <div className="size-12 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" />
        </div>
      )}

      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        onCanPlayThrough={() => setIsVideoLoaded(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/90 via-brown-deep/45 to-brown-deep/30" />

      <Header variant="overlay" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 pt-28 sm:px-10 sm:pb-20 md:max-w-3xl md:px-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          <p className="text-sm font-medium tracking-[0.22em] text-ivory/80 uppercase">
            Punjabi Rishtey
          </p>
          <h1 className="font-display text-4xl leading-[1.1] font-semibold text-ivory sm:text-5xl md:text-6xl">
            Find a life partner within the Punjabi community.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-ivory/85 sm:text-lg">
            {memberHasPlan
              ? "Browse verified Punjabi matches, and reach a family when you are ready."
              : "Create your profile, unlock Gold for ₹2,000 a year, and browse verified matches with confidence."}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!memberHasPlan && (
              <Button
                size="lg"
                className="px-8"
                onClick={() =>
                  isAuthenticated ? navigate("/membership") : navigate("/signup")
                }
              >
                Begin with Gold
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-ivory/70 bg-transparent px-8 text-base text-ivory hover:bg-ivory hover:text-brown"
              onClick={goFindPartner}
            >
              Find your partner
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
