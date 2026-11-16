import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppNav } from "@/hooks/useAppNav";

/**
 * Drop real demo URLs into `videoSrc` when ready (mp4 under /public or CDN).
 * Leave null to keep the expandable placeholder.
 */
const steps = [
  {
    step: "01",
    title: "Create your profile",
    body: "Share who you are: family, education, profession, and what you seek in a partner.",
    demoLabel: "Watch: how to register",
    videoSrc: null,
  },
  {
    step: "02",
    title: "Unlock Gold",
    body: "One clear plan: ₹2,000 a year. Verified by the Punjabi Rishtey team after your UPI payment.",
    demoLabel: "Watch: membership & payment",
    videoSrc: null,
  },
  {
    step: "03",
    title: "Meet with intention",
    body: "Browse opposite-gender profiles. Reach out through support, or directly when a number is shared.",
    demoLabel: "Watch: browsing & connecting",
    videoSrc: null,
  },
];

export default function HowItWorks() {
  const { navigate, isAuthenticated, hasActiveMembership } = useAppNav();
  const [activeDemo, setActiveDemo] = useState(null);

  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="Three clear steps to a serious match"
      description="Built for Punjabi families who want clarity, privacy, and a premium experience, not endless swiping."
    >
      <div className="grid items-stretch gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="flex h-full flex-col gap-4 border-t border-border pt-6"
          >
            <span className="font-display text-sm tracking-[0.15em] text-maroon">
              {item.step}
            </span>
            <h3 className="font-display text-2xl font-semibold text-brown">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {item.body}
            </p>

            {item.videoSrc ? (
              <button
                type="button"
                onClick={() => setActiveDemo(item)}
                className="group relative mt-auto aspect-video w-full overflow-hidden rounded-sm border border-border bg-gradient-to-br from-ivory via-paper to-muted text-left outline-none transition-[border-color,box-shadow] hover:border-maroon/35 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`${item.demoLabel}, open demo`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 40%, color-mix(in oklab, var(--color-maroon) 12%, transparent), transparent 55%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--color-brown) 8%, transparent), transparent 50%)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-maroon text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">
                    <Play className="size-5 fill-current" aria-hidden />
                  </span>
                  <span className="font-display text-sm font-medium tracking-wide text-brown">
                    {item.demoLabel}
                  </span>
                </div>
              </button>
            ) : (
              <div
                className="relative mt-auto aspect-video w-full overflow-hidden rounded-sm border border-border/80 bg-gradient-to-br from-ivory via-paper to-muted"
                aria-label={`${item.title}, walkthrough coming soon`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 40%, color-mix(in oklab, var(--color-maroon) 12%, transparent), transparent 55%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--color-brown) 8%, transparent), transparent 50%)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
                  <span className="inline-flex items-center rounded-full border border-maroon/20 bg-maroon/10 px-3 py-1 font-display text-xs font-semibold tracking-wide text-maroon">
                    Coming soon
                  </span>
                  <span className="font-display text-xs text-muted-foreground">
                    Video walkthrough in progress
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {!hasActiveMembership() && (
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={() =>
              navigate(isAuthenticated ? "/membership" : "/signup")
            }
          >
            Begin with Gold
          </Button>
        </div>
      )}

      <Dialog
        open={Boolean(activeDemo)}
        onOpenChange={(open) => {
          if (!open) setActiveDemo(null);
        }}
      >
        <DialogContent
          className="gap-0 overflow-hidden p-0 sm:max-w-2xl"
          showCloseButton
        >
          {activeDemo ? (
            <>
              <DialogHeader className="border-b border-border px-5 py-4 pr-12">
                <DialogTitle className="font-display text-xl text-brown">
                  {activeDemo.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {activeDemo.demoLabel}
                </DialogDescription>
              </DialogHeader>

              <div className="bg-brown/95">
                {activeDemo.videoSrc ? (
                  <video
                    key={activeDemo.videoSrc}
                    className="aspect-video w-full"
                    controls
                    playsInline
                    autoPlay
                    src={activeDemo.videoSrc}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brown to-maroon/90 px-6 text-center">
                    <span className="flex size-14 items-center justify-center rounded-full border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground">
                      <Play className="size-6 fill-current" aria-hidden />
                    </span>
                    <p className="font-display text-lg text-primary-foreground">
                      Demo video coming soon
                    </p>
                    <p className="max-w-sm text-sm text-primary-foreground/70">
                      This slot will play a short walkthrough of “
                      {activeDemo.title.toLowerCase()}” once the recording is
                      ready.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
