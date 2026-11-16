import { useEffect } from "react";
import logoSrc from "@/assets/logo.png";
import coupleSrc from "@/assets/1.jpg";

/**
 * Instagram conversion carousel (Gold, ₹2,000/year).
 * Four 1080x1080 frames. Hindi on the slide. English in the caption.
 *
 * View at /lab/ig-conversion. Export: /lab/ig-conversion?export=1
 *
 * Copy is locked. No em dashes anywhere.
 *
 * Caption:
 * Punjabi rishta चाहिए. Biodata कहीं से भी आ रही है.
 *
 * You want a Punjabi match. The biodatas keep coming from everywhere else.
 * Every profile here is from the Punjabi community. Gold is ₹2,000 a year.
 *
 * Gold लीजिए. punjabi-rishtey.com
 *
 * First comment:
 * Not a dating app. Anyone seeking a Punjabi partner is welcome.
 * WhatsApp +91 73546 19960
 */

const SLIDE = 1080;

const SERIF = '"Noto Serif Devanagari", "Cormorant Garamond", serif';
const SANS =
  '"Noto Sans Devanagari", "Source Sans 3 Variable", "Source Sans 3", sans-serif';

const PAPER = "#faf7f2";
const IVORY = "#f5ede7";
const BROWN = "#4f2f1d";
const BROWN_DEEP = "#2b1810";
const MAROON = "#990000";
const MUTED = "#6b5344";

const LOGO_RATIO = 92 / 150;

function loadDevanagariFonts() {
  const id = "ig-conversion-fonts";
  if (document.getElementById(id)) return;
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "anonymous";
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@500;600;700&display=swap";
  document.head.append(preconnect1, preconnect2, link);
}

function BrandMark({ color, width, style = {} }) {
  return (
    <div
      aria-label="Punjabi Rishtey"
      role="img"
      style={{
        width,
        height: Math.round(width * LOGO_RATIO),
        backgroundColor: color,
        WebkitMaskImage: `url(${logoSrc})`,
        maskImage: `url(${logoSrc})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        ...style,
      }}
    />
  );
}

function Frame({ children, background, index }) {
  return (
    <div
      data-ig-slide
      data-slide-index={index}
      style={{
        position: "relative",
        width: SLIDE,
        height: SLIDE,
        overflow: "hidden",
        background,
        fontFamily: SANS,
        flex: "none",
      }}
    >
      {children}
    </div>
  );
}

function SlideHook() {
  return (
    <Frame background={BROWN_DEEP} index={1}>
      <img
        src={coupleSrc}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 22%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(28,20,16,0.58) 0%, rgba(28,20,16,0.1) 22%, transparent 36%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, rgba(23,16,12,0.95) 0%, rgba(30,19,13,0.84) 30%, rgba(30,19,13,0.32) 56%, transparent 74%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 40% at 20% 100%, rgba(153,0,0,0.4), transparent 70%)",
        }}
      />

      <BrandMark
        color={IVORY}
        width={236}
        style={{
          position: "absolute",
          top: 48,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.96,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 72,
        }}
      >
        <div
          style={{
            width: 80,
            height: 3,
            background: MAROON,
            marginBottom: 22,
          }}
        />
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 1.12,
            color: PAPER,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Punjabi rishta चाहिए.
          <br />
          Biodata कहीं से भी आ रही है.
        </h1>
      </div>
    </Frame>
  );
}

function SlidePosition() {
  return (
    <Frame background={PAPER} index={2}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(45% 32% at 100% 0%, rgba(153,0,0,0.06), transparent 70%), radial-gradient(50% 34% at 0% 100%, rgba(79,47,29,0.07), transparent 72%)",
        }}
      />
      <BrandMark
        color={MAROON}
        width={176}
        style={{
          position: "absolute",
          top: 64,
          left: 72,
        }}
      />
      <h1
        style={{
          position: "absolute",
          left: 72,
          right: 80,
          bottom: 88,
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: 68,
          lineHeight: 1.14,
          color: BROWN,
          margin: 0,
          letterSpacing: "-0.015em",
        }}
      >
        यहाँ हर profile
        <br />
        Punjabi community से है.
      </h1>
    </Frame>
  );
}

function SlideOffer() {
  return (
    <Frame background={PAPER} index={3}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(45% 32% at 100% 0%, rgba(153,0,0,0.06), transparent 70%), radial-gradient(50% 34% at 0% 100%, rgba(79,47,29,0.07), transparent 72%)",
        }}
      />
      <BrandMark
        color={MAROON}
        width={156}
        style={{
          position: "absolute",
          top: 56,
          left: 72,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 220,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1,
            color: BROWN,
            margin: 0,
          }}
        >
          Gold
        </p>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 140,
            lineHeight: 0.92,
            color: MAROON,
            margin: "8px 0 0",
            letterSpacing: "-0.03em",
          }}
        >
          ₹2,000
        </p>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: 42,
            color: BROWN,
            margin: "18px 0 0",
          }}
        >
          साल भर.
        </p>
        <div
          style={{
            width: 72,
            height: 3,
            background: MAROON,
            margin: "28px 0 22px",
          }}
        />
        <p
          style={{
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: 32,
            lineHeight: 1.35,
            color: MUTED,
            margin: 0,
            maxWidth: 780,
          }}
        >
          Team हर payment देखती है.
        </p>
      </div>
    </Frame>
  );
}

function SlideCta() {
  return (
    <Frame
      background={`linear-gradient(160deg, ${BROWN} 0%, ${BROWN_DEEP} 60%, #1d110b 100%)`}
      index={4}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(50% 34% at 50% 8%, rgba(153,0,0,0.28), transparent 70%)",
        }}
      />
      <BrandMark
        color={IVORY}
        width={236}
        style={{
          position: "absolute",
          top: 72,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 340,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 3,
            background: MAROON,
            margin: "0 auto 22px",
          }}
        />
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 72,
            lineHeight: 1.08,
            color: PAPER,
            margin: 0,
            letterSpacing: "-0.015em",
          }}
        >
          Gold लीजिए.
        </h1>
        <p
          style={{
            fontFamily: SANS,
            fontWeight: 600,
            fontSize: 34,
            color: IVORY,
            margin: "28px 0 0",
            letterSpacing: "0.01em",
          }}
        >
          punjabi-rishtey.com
        </p>
      </div>
      <p
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 64,
          textAlign: "center",
          fontFamily: SANS,
          fontWeight: 500,
          fontSize: 26,
          color: "rgba(245,237,231,0.78)",
          margin: 0,
        }}
      >
        WhatsApp +91 73546 19960
      </p>
    </Frame>
  );
}

export default function IgConversionCarousel() {
  useEffect(() => {
    loadDevanagariFonts();
  }, []);

  const isExport =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("export") === "1";
  const scale = isExport ? 1 : 0.48;

  const slides = [
    <SlideHook key="1" />,
    <SlidePosition key="2" />,
    <SlideOffer key="3" />,
    <SlideCta key="4" />,
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: isExport ? "transparent" : "#f0e8e0",
        display: "flex",
        flexDirection: isExport ? "column" : "row",
        flexWrap: isExport ? "nowrap" : "wrap",
        gap: isExport ? 0 : 48,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: isExport ? 0 : 56,
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          style={{
            width: SLIDE * scale,
            height: SLIDE * scale,
            flex: "none",
            boxShadow: isExport
              ? "none"
              : "0 24px 60px -24px rgba(30,20,14,0.5)",
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {slide}
          </div>
        </div>
      ))}
    </div>
  );
}
