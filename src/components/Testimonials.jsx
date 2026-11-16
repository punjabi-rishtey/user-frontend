import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import { apiUrl, BACKEND_BASE_URL } from "../config/constants";
import { mapTestimonialsFromApi } from "../utils/testimonials";

const Testimonials = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl("/api/testimonials/all"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setClients(mapTestimonialsFromApi(data, BACKEND_BASE_URL));
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
        setClients([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <header className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Archive
          </p>
          <h1 className="font-display text-3xl font-semibold text-brown sm:text-4xl">
            Success stories
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-sans text-base leading-relaxed text-muted-foreground">
            Couples who found their match through Punjabi Rishtey.
          </p>
        </header>

        {loading ? (
          <div
            className="flex justify-center py-20"
            role="status"
            aria-live="polite"
          >
            <div className="size-10 animate-spin rounded-full border-2 border-maroon/20 border-t-maroon" />
            <span className="sr-only">Loading testimonials</span>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/25 bg-destructive/5 px-4 py-3 text-center text-sm text-destructive">
            {error}
          </div>
        ) : clients.length === 0 ? (
          <div className="rounded-xl border border-border bg-card px-4 py-8 text-center text-muted-foreground">
            No testimonials available at the moment.
          </div>
        ) : (
          <ul className="flex flex-col gap-10 sm:gap-12">
            {clients.map((client, index) => (
              <motion.li
                key={client.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border-b border-border pb-10 last:border-b-0 last:pb-0 sm:pb-12"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                  <div className="mx-auto w-28 shrink-0 overflow-hidden rounded-lg bg-ivory sm:mx-0 sm:w-32">
                    <div className="aspect-square">
                      {client.photo ? (
                        <img
                          src={client.photo}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center font-display text-3xl text-brown/30 italic"
                          aria-hidden
                        >
                          {client.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <p className="font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
                      &ldquo;{client.quote}&rdquo;
                    </p>
                    <p className="mt-4 font-display text-lg font-semibold text-brown">
                      {client.name}
                    </p>
                    {client.metaValue ? (
                      <p className="mt-1 text-xs font-medium tracking-[0.14em] text-maroon uppercase">
                        {client.metaLabel} · {client.metaValue}
                      </p>
                    ) : null}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
};

export default Testimonials;
