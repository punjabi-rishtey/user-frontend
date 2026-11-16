import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { apiUrl } from "@/config/constants";

function StarRow({ rating, className = "" }) {
  const count = Math.max(0, Math.min(5, Number(rating) || 0));
  return (
    <div
      className={`flex gap-0.5 ${className}`}
      aria-label={`${count} out of 5 stars`}
    >
      {[...Array(count)].map((_, i) => (
        <Star
          key={i}
          className="size-3.5 text-maroon"
          fill="currentColor"
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(apiUrl("/api/review/all"));
        const data = Array.isArray(response.data) ? response.data : [];
        const mappedReviews = data.map((review) => ({
          id: review._id,
          rating: Math.max(1, Math.min(5, Math.round(Number(review.ratings) || 5))),
          title: review.user_name?.trim() || "Happy Member",
          text: review.message?.trim() || "",
          author: review.user_name?.trim() || "Anonymous",
        }));
        setReviews(mappedReviews);
        setError("");
      } catch (err) {
        setError("Failed to fetch reviews");
        console.error(err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="overflow-hidden border-t border-border bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Voices
          </p>
          <h2 className="font-display text-3xl font-semibold text-brown sm:text-4xl">
            What families say
          </h2>
          <p className="mt-4 mb-12 text-base leading-relaxed text-muted-foreground sm:mb-14 sm:text-lg">
            Recent words from people who found their match on Punjabi Rishtey.
          </p>
        </div>

        {error ? (
          <p className="mb-4 text-center text-sm text-destructive">{error}</p>
        ) : null}

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-7 md:grid-cols-3 md:gap-8">
          {reviews.length === 0 && !error ? (
            <p className="col-span-full text-center text-sm text-muted-foreground">
              No reviews available
            </p>
          ) : (
            reviews.map((review, index) => (
              <motion.article
                key={`${review.author}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border bg-ivory shadow-[0_14px_36px_-20px_rgba(79,47,29,0.4)] transition-[border-color,box-shadow] hover:border-maroon/30 hover:shadow-[0_18px_40px_-18px_rgba(79,47,29,0.45)]"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-muted/80 to-transparent"
                  aria-hidden
                />
                <div
                  className="absolute inset-y-0 left-0 w-0.5 bg-maroon/70 transition-[width] group-hover:w-1"
                  aria-hidden
                />

                <div className="relative flex h-full flex-col px-6 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8">
                  <span
                    className="font-display text-5xl leading-none text-maroon/25 select-none sm:text-6xl"
                    aria-hidden
                  >
                    &ldquo;
                  </span>

                  <blockquote className="mt-2 flex-1">
                    <p className="font-display text-xl font-medium leading-snug tracking-tight text-brown sm:text-[1.35rem] sm:leading-snug">
                      {review.text}
                    </p>
                  </blockquote>

                  <footer className="mt-8 border-t border-border pt-4">
                    <p className="font-display text-lg font-semibold text-brown">
                      {review.author}
                    </p>
                    <StarRow rating={review.rating} className="mt-2" />
                  </footer>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
