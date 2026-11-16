import { useEffect } from "react";
import { Globe, Phone, Mail } from "lucide-react";
import logoSrc from "@/assets/logo.png";
import coupleSrc from "@/assets/4.jpg";

/**
 * Instagram heritage carousel (Approach A, atelier).
 * Three 1080x1080 (1:1) frames, Hindi copy, brand paper/maroon/brown palette.
 *
 * View at /lab/ig-heritage. The export script opens /lab/ig-heritage?export=1
 * and screenshots each [data-ig-slide] at full 1080x1080.
 *
 * Copy is locked. No em dashes anywhere.
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

const LOGO_RATIO = 92 / 150;

function loadDevanagariFonts() {
  const id = "ig-heritage-fonts";
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

function BrandMark({ color, width, className = "", style = {} }) {
  return (
    <div
      className={className}
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

function Eyebrow({ children, color }) {
  return (
    <span
      style={{
        fontFamily: SANS,
        fontWeight: 600,
        letterSpacing: "0.1em",
        fontSize: 24,
        textTransform: "none",
        color,
      }}
    >
      {children}
    </span>
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

function SlideHeritage() {
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
          objectPosition: "center 28%",
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
        width={240}
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
          bottom: 64,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Eyebrow color="rgba(245,237,231,0.82)">विरासत</Eyebrow>
        <div
          style={{
            width: 80,
            height: 3,
            background: MAROON,
            margin: "12px 0 14px",
          }}
        />
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 92,
            lineHeight: 1.02,
            color: PAPER,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          २६ साल का विश्वास
        </h1>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: 40,
            color: IVORY,
            margin: "16px 0 0",
          }}
        >
          पंजाबी मैरिज फोरम
        </p>
        <p
          style={{
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: 28,
            color: "rgba(245,237,231,0.82)",
            margin: "10px 0 0",
          }}
        >
          स्थापना: वर्ष २०००
        </p>
        <p
          style={{
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: 28,
            color: "rgba(245,237,231,0.82)",
            margin: "2px 0 0",
          }}
        >
          संस्थापक: बलराज सबलोक
        </p>
      </div>
    </Frame>
  );
}

function SlideCommunity() {
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

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 88,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Eyebrow color={MAROON}>समुदाय</Eyebrow>
        <h2
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 78,
            lineHeight: 1.08,
            color: BROWN,
            margin: "18px 0 0",
          }}
        >
          पंजाबी समाज की सेवा में
        </h2>
        <p
          style={{
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: 32,
            lineHeight: 1.4,
            color: "#6b5344",
            margin: "22px 0 0",
            maxWidth: 820,
          }}
        >
          श्रीमती श्वेता खत्री के नेतृत्व में, वर्ष २०२० से हमारा डिजिटल मंच
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 200,
        }}
      >
        <div
          style={{
            width: 100,
            height: 3,
            background: MAROON,
            marginBottom: 28,
          }}
        />
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.28,
            color: BROWN_DEEP,
            margin: 0,
          }}
        >
          खत्री · अरोड़ा · सिख · मुल्तानी · ब्राह्मण
        </p>
        <p
          style={{
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: 32,
            color: "#6b5344",
            margin: "16px 0 0",
          }}
        >
          और समस्त पंजाबी समुदाय
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 72,
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        <BrandMark color={MAROON} width={148} style={{ opacity: 0.9 }} />
      </div>
    </Frame>
  );
}

function ContactRow({ Icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 9999,
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(245,237,231,0.08)",
          border: "1px solid rgba(245,237,231,0.24)",
        }}
      >
        <Icon size={28} color={PAPER} strokeWidth={1.6} />
      </div>
      <span
        style={{
          fontFamily: SANS,
          fontWeight: 500,
          fontSize: 34,
          color: PAPER,
          letterSpacing: "0.01em",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function SlideContact() {
  return (
    <Frame
      background={`linear-gradient(160deg, ${BROWN} 0%, ${BROWN_DEEP} 60%, #1d110b 100%)`}
      index={3}
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
        width={260}
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
          top: 240,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 3,
            background: MAROON,
            marginBottom: 18,
          }}
        />
        <h2
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 72,
            color: PAPER,
            margin: 0,
          }}
        >
          संपर्क करें
        </h2>
      </div>

      <div
        style={{
          position: "absolute",
          left: 100,
          right: 100,
          top: 400,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <ContactRow Icon={Globe}>www.punjabi-rishtey.com</ContactRow>
        <ContactRow Icon={Phone}>+91 73546 19960</ContactRow>
        <ContactRow Icon={Mail}>support@punjabi-rishtey.com</ContactRow>
      </div>

      <p
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 64,
          textAlign: "center",
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize: 36,
          color: "rgba(245,237,231,0.9)",
          margin: 0,
        }}
      >
        पंजाबी रिश्ते: आपका डिजिटल मंच
      </p>
    </Frame>
  );
}

export default function IgHeritageCarousel() {
  useEffect(() => {
    loadDevanagariFonts();
  }, []);

  const isExport =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("export") === "1";
  const scale = isExport ? 1 : 0.48;

  const slides = [
    <SlideHeritage key="1" />,
    <SlideCommunity key="2" />,
    <SlideContact key="3" />,
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: isExport ? "transparent" : "#d8d2ca",
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
