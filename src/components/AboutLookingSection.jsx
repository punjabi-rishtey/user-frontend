import PropTypes from "prop-types";

// Reusable two-card section for About Myself and I am looking for
export default function AboutLookingSection({
  aboutMyself = "",
  lookingFor = "",
}) {
  const cardBase = "p-6 md:p-8 rounded-xl shadow-lg transition-all border-2";

  // Color schemes aligned with existing colorful boxes
  const leftScheme = {
    bg: "#E3F2FD",
    border: "#90CAF9",
    title: "#1565C0",
    text: "#0D47A1",
  };
  const rightScheme = {
    bg: "#F3E5F5",
    border: "#CE93D8",
    title: "#7B1FA2",
    text: "#4A148C",
  };

  const renderText = (text) =>
    text && text.trim().length > 0 ? text : "Not specified";

  return (
    <div className="w-full px-6 md:px-16 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={cardBase}
          style={{
            backgroundColor: leftScheme.bg,
            borderColor: leftScheme.border,
          }}
        >
          <h3
            className="text-xl md:text-2xl mb-3"
            style={{
              color: leftScheme.title,
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
            }}
          >
            About Myself
          </h3>
          <p
            className="text-base md:text-lg whitespace-pre-line"
            style={{
              color: leftScheme.text,
              fontFamily: "'Modern Era', sans-serif",
              fontWeight: 400,
            }}
          >
            {renderText(aboutMyself)}
          </p>
        </div>

        <div
          className={cardBase}
          style={{
            backgroundColor: rightScheme.bg,
            borderColor: rightScheme.border,
          }}
        >
          <h3
            className="text-xl md:text-2xl mb-3"
            style={{
              color: rightScheme.title,
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
            }}
          >
            I am looking for
          </h3>
          <p
            className="text-base md:text-lg whitespace-pre-line"
            style={{
              color: rightScheme.text,
              fontFamily: "'Modern Era', sans-serif",
              fontWeight: 400,
            }}
          >
            {renderText(lookingFor)}
          </p>
        </div>
      </div>
    </div>
  );
}

AboutLookingSection.propTypes = {
  aboutMyself: PropTypes.string,
  lookingFor: PropTypes.string,
};
