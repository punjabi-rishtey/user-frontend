import { motion } from "framer-motion";
import Section from "@/components/Section";
import {
  SceneCommunity,
  SceneContact,
  SceneVerified,
} from "@/components/trust/TrustScenes";

const pillars = [
  {
    step: "01",
    title: "Community first",
    body: "Only Punjabi rishtas, so every profile you open is already in the circle you care about.",
    Scene: SceneCommunity,
  },
  {
    step: "02",
    title: "Human verification",
    body: "Membership payments are reviewed by our team. You are not left alone with a faceless checkout.",
    Scene: SceneVerified,
  },
  {
    step: "03",
    title: "Respectful contact",
    body: "Introductions can go through Punjabi Rishtey, or directly when families choose to share a number.",
    Scene: SceneContact,
  },
];

export default function WhyChooseUs() {
  return (
    <Section
      eyebrow="Why families trust us"
      title="A premium matrimony, designed for confidence"
      description="Premium does not mean complicated. It means every screen feels intentional before you pay ₹2,000."
    >
      <div className="grid items-stretch gap-8 md:grid-cols-3 md:gap-6">
        {pillars.map((item, index) => {
          const Scene = item.Scene;
          return (
            <motion.article
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-ivory shadow-[0_10px_28px_-18px_rgba(61,42,34,0.35)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-ivory via-paper to-muted text-maroon">
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse at 30% 20%, color-mix(in oklab, var(--color-maroon) 10%, transparent), transparent 55%), radial-gradient(ellipse at 80% 90%, color-mix(in oklab, var(--color-brown) 8%, transparent), transparent 50%)",
                  }}
                  aria-hidden
                />
                <motion.div
                  className="absolute inset-0 flex items-end justify-center p-2 sm:p-3"
                  initial={{ opacity: 0.35 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.12 + index * 0.06 }}
                >
                  <Scene className="h-full w-full motion-reduce:opacity-100" />
                </motion.div>
              </div>

              <div className="flex flex-1 flex-col gap-3 border-t border-border px-5 py-6 sm:px-6">
                <span className="font-display text-sm tracking-[0.15em] text-maroon">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-semibold text-brown sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.body}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
