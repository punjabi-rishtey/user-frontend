import { useEffect } from "react";
import logoSrc from "@/assets/logo.png";

/**
 * Instagram counselling posts (Approach A, atelier).
 * Two 1080x1080 (1:1) frames: full English + full Hindi.
 *
 * View at /lab/ig-counselling. Export opens /lab/ig-counselling?export=1
 * and screenshots each [data-ig-slide] into output/ig-counselling/.
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
const MUTED = "#6b5344";
const BORDER = "#e5d9ce";

const LOGO_RATIO = 92 / 150;

function loadFonts() {
  const id = "ig-counselling-fonts";
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

function Frame({ children, index }) {
  return (
    <div
      data-ig-slide
      data-slide-index={index}
      style={{
        position: "relative",
        width: SLIDE,
        height: SLIDE,
        overflow: "hidden",
        background: PAPER,
        fontFamily: SANS,
        flex: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

function TopicCard({ label, body }) {
  return (
    <div
      style={{
        flex: 1,
        background: IVORY,
        border: `1px solid ${BORDER}`,
        borderTop: `3px solid ${MAROON}`,
        padding: "26px 26px 28px",
        textAlign: "left",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "0.06em",
          color: MAROON,
          margin: "0 0 14px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: SANS,
          fontWeight: 400,
          fontSize: 23,
          lineHeight: 1.5,
          color: BROWN_DEEP,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function CounsellingSlide({
  index,
  eyebrow,
  headline,
  role,
  byline,
  audience,
  preLabel,
  preBody,
  postLabel,
  postBody,
  sessionLine,
  feeLine,
  tagline,
}) {
  // Devanagari conjuncts break apart under wide tracking, so keep it tight.
  const isDevanagari = /[\u0900-\u097F]/.test(headline);
  const track = isDevanagari ? "0.04em" : "0.15em";
  const microSize = isDevanagari ? 21 : 18;

  return (
    <Frame index={index}>
      {/* Header band: brand anchor */}
      <div
        style={{
          flex: "none",
          background: `linear-gradient(158deg, ${BROWN} 0%, ${BROWN_DEEP} 72%, #1d110b 100%)`,
          padding: "48px 72px 40px",
          textAlign: "center",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(52% 60% at 50% 0%, rgba(153,0,0,0.3), transparent 72%)",
          }}
        />
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontFamily: SANS,
              fontWeight: 600,
              letterSpacing: track,
              fontSize: microSize,
              color: "rgba(245,237,231,0.72)",
              margin: 0,
            }}
          >
            {eyebrow}
          </p>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 48,
              lineHeight: 1.16,
              color: PAPER,
              margin: "10px auto 0",
              maxWidth: 880,
            }}
          >
            {headline}
          </h1>
        </div>
      </div>

      <div style={{ flex: "none", height: 6, background: MAROON }} />

      {/* Body: who it is for, then the two topic cards */}
      <div
        style={{
          flex: 1,
          position: "relative",
          padding: "34px 64px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 40% at 100% 0%, rgba(153,0,0,0.05), transparent 70%), radial-gradient(60% 40% at 0% 100%, rgba(79,47,29,0.06), transparent 72%)",
          }}
        />

        <div style={{ position: "relative", textAlign: "center" }}>
          <p
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: microSize,
              letterSpacing: track,
              color: MAROON,
              margin: 0,
            }}
          >
            {role}
          </p>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 36,
              color: BROWN,
              margin: "10px 0 0",
            }}
          >
            {byline}
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: 24,
              color: MUTED,
              margin: "10px 0 0",
            }}
          >
            {audience}
          </p>

          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "stretch",
              margin: "34px 0 0",
            }}
          >
            <TopicCard label={preLabel} body={preBody} />
            <TopicCard label={postLabel} body={postBody} />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 16,
              margin: "34px 0 0",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: 32,
                color: BROWN_DEEP,
              }}
            >
              {sessionLine}
            </span>
            <span
              style={{
                fontFamily: SANS,
                fontWeight: 400,
                fontSize: 21,
                color: MUTED,
              }}
            >
              {feeLine}
            </span>
          </div>
        </div>
      </div>

      {/* Footer band: tagline + contact */}
      <div style={{ flex: "none" }}>
        <div style={{ height: 4, background: MAROON }} />
        <div
          style={{
            background: BROWN_DEEP,
            padding: "30px 64px 34px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: 27,
              lineHeight: 1.3,
              color: PAPER,
              margin: 0,
            }}
          >
            {tagline}
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: 24,
              color: "rgba(245,237,231,0.9)",
              margin: "16px 0 0",
            }}
          >
            +91 73546 19960 &nbsp;·&nbsp; www.punjabi-rishtey.com
          </p>
        </div>
      </div>
    </Frame>
  );
}

function SlideEnglish() {
  return (
    <CounsellingSlide
      index="en"
      eyebrow="Counselling"
      headline="Pre & Post Marriage Counselling"
      role="Counsellor"
      byline="Mrs. Shweta Khatri"
      audience="For individuals, couples, and parents"
      preLabel="Pre-marriage"
      preBody="Clarify expectations, build emotional readiness, and practise healthy communication. Come alone or with a partner."
      postLabel="Post-marriage"
      postBody="Navigate adjustment, resolve conflict with care, and strengthen family harmony."
      sessionLine="1-hour session"
      feeLine="Fee confirmed on or after the appointment call"
      tagline="Consult for a healthy and happy relationship."
    />
  );
}

function SlideHindi() {
  return (
    <CounsellingSlide
      index="hi"
      eyebrow="परामर्श"
      headline="विवाह पूर्व व विवाह पश्चात परामर्श"
      role="परामर्शदाता"
      byline="श्रीमती श्वेता खत्री"
      audience="व्यक्तियों, दंपत्ति और माता-पिता के लिए"
      preLabel="विवाह पूर्व"
      preBody="अपेक्षाएँ स्पष्ट करें, भावनात्मक तैयारी बढ़ाएँ और स्वस्थ संवाद सीखें। अकेले या साथी के साथ आएँ।"
      postLabel="विवाह पश्चात"
      postBody="सामंजस्य बनाएँ, मतभेद समझदारी से सुलझाएँ और पारिवारिक सुलह मज़बूत करें।"
      sessionLine="१ घंटे का सत्र"
      feeLine="शुल्क अपॉइंटमेंट कॉल पर या उसके बाद तय"
      tagline="एक स्वस्थ और सुखी रिश्ते के लिए परामर्श लें।"
    />
  );
}

export default function IgCounsellingPost() {
  useEffect(() => {
    loadFonts();
  }, []);

  const isExport =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("export") === "1";
  const scale = isExport ? 1 : 0.48;

  const slides = [<SlideEnglish key="en" />, <SlideHindi key="hi" />];

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
