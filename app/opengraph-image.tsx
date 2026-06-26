import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "chrisdotmedia — Media & Marketing by Christian Del Pilar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Gradient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60%",
            height: "100%",
            background:
              "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(245,166,35,0.15), transparent)",
          }}
        />

        {/* Domain label */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#4ade80",
            }}
          />
          <span style={{ color: "#7A7A7A", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            chrisdotmedia.com
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <span style={{ color: "#FFFFFF", fontSize: "72px", fontWeight: 800, lineHeight: 1 }}>
              Christian
            </span>
            <span style={{ color: "#FFFFFF", fontSize: "72px", fontWeight: 800, lineHeight: 1 }}>
              Del Pilar
            </span>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 800,
                lineHeight: 1,
                background: "linear-gradient(135deg, #F5A623, #F56B8D)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              media & marketing.
            </span>
          </div>

          <p style={{ color: "#7A7A7A", fontSize: "20px", margin: 0, marginTop: "8px" }}>
            Photographer · Motion Designer · Marketer · Based in Florida
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
