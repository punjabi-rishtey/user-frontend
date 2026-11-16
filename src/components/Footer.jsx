import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import logoSrc from "@/assets/logo.png";
import { useAppNav } from "@/hooks/useAppNav";

/** Swap `href` values when real profile URLs are ready. */
const socialLinks = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
];

const exploreLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Find Partner", path: "/findpartner", action: "findPartner" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const trustLinks = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Safety Standards", path: "/safety-standards" },
  { label: "Membership", action: "membership" },
  { label: "Contact", path: "/contact" },
];

const linkClass =
  "block w-full text-left text-sm leading-6 text-ivory/75 transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep";

const columnLabelClass =
  "mb-3 pt-1.5 text-xs font-medium tracking-[0.16em] text-ivory/50 uppercase";

export default function Footer() {
  const { navigate, goFindPartner, goMembership } = useAppNav();

  const go = (link) => {
    if (link.action === "findPartner") {
      goFindPartner();
    } else if (link.action === "membership") {
      goMembership();
    } else {
      navigate(link.path);
    }
    window.scrollTo(0, 0);
  };

  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-gradient-to-b from-brown to-brown-deep text-ivory">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 8% 100%, color-mix(in oklab, var(--maroon) 18%, transparent), transparent 65%), radial-gradient(ellipse 50% 40% at 92% 0%, color-mix(in oklab, var(--maroon) 10%, transparent), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:gap-x-10 lg:gap-x-14">
          {/* Brand - logo only, no tall spacer band */}
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => go({ path: "/" })}
              className="w-fit outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep"
              aria-label="Punjabi Rishtey home"
            >
              <img
                src={logoSrc}
                alt=""
                className="h-12 w-auto brightness-0 invert sm:h-14"
              />
            </button>
            <p className="mt-4 max-w-[16rem] text-sm leading-6 text-ivory/65">
              Find your perfect life partner within the Punjabi community.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-ivory/40 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 focus-visible:ring-offset-brown-deep"
                >
                  <Icon className="size-4" strokeWidth={1.5} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Explore" className="flex flex-col">
            <p className={columnLabelClass}>Explore</p>
            <ul className="flex flex-col gap-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => go(link)}
                    className={linkClass}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Trust" className="flex flex-col">
            <p className={columnLabelClass}>Trust</p>
            <ul className="flex flex-col gap-2.5">
              {trustLinks.map((link) => (
                <li key={`trust-${link.label}`}>
                  <button
                    type="button"
                    onClick={() => go(link)}
                    className={linkClass}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-ivory/15 pt-6">
          <p className="text-xs leading-5 text-ivory/50">
            © {new Date().getFullYear()} Punjabi Rishtey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
