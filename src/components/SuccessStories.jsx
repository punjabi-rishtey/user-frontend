import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiUrl, BACKEND_BASE_URL } from "../config/constants";
import { mapTestimonialsFromApi } from "../utils/testimonials";
import { Button } from "@/components/ui/button";
import CoupleStoryDeck from "./CoupleStoryDeck";

const SuccessStories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl("/api/testimonials/all"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load testimonials");
        }
        return response.json();
      })
      .then((data) => {
        setStories(mapTestimonialsFromApi(data, BACKEND_BASE_URL));
        setError(null);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch success stories:", fetchError);
        setStories([]);
        setError("Failed to load success stories right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="border-t border-border bg-paper py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
        >
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Success stories
          </p>
          <h2 className="font-display text-3xl font-semibold text-brown sm:text-4xl md:text-5xl">
            Couples who found their match
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            Turn through real matches: an album of Punjabi couples who found
            each other on Punjabi Rishtey.
          </p>
        </motion.header>

        {loading ? (
          <div
            className="flex justify-center py-24"
            role="status"
            aria-live="polite"
          >
            <div className="size-10 animate-spin rounded-full border-2 border-maroon/20 border-t-maroon" />
            <span className="sr-only">Loading success stories</span>
          </div>
        ) : error ? (
          <div className="mx-auto max-w-xl rounded-lg border border-destructive/25 bg-destructive/5 px-4 py-3 text-center text-sm text-destructive">
            {error}
          </div>
        ) : stories.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-xl border border-border bg-card px-4 py-8 text-center text-muted-foreground">
            No success stories are available right now.
          </div>
        ) : (
          <CoupleStoryDeck stories={stories} />
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-14 flex justify-center sm:mt-16"
        >
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="border-brown/25 text-brown hover:bg-ivory hover:text-brown"
            onClick={() => navigate("/testimonials")}
          >
            View all success stories
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
