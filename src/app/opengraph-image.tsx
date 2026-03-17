import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #00205C 0%, #00448F 48%, #E8F0F8 100%)",
          color: "white",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "88px",
              width: "88px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: "36px",
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Southern California
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "820px" }}>
          <div style={{ fontSize: "68px", fontWeight: 800, lineHeight: 1.05 }}>Allsberry Insurance Agency</div>
          <div style={{ fontSize: "28px", lineHeight: 1.45, color: "rgba(255,255,255,0.86)" }}>
            Personalized home, auto, life, and business insurance guidance for Southern California families and businesses.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "24px",
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              background: "#DA291C",
              padding: "16px 28px",
            }}
          >
            Get a Quote
          </div>
          <div>Simple. Affordable. Tailored for You.</div>
        </div>
      </div>
    ),
    size,
  );
}
