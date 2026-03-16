import { ImageResponse } from "next/og";

import { siteUrl } from "@/lib/utils";

const safeDomain = new URL(siteUrl).host;

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
          background: "linear-gradient(135deg, #00205C 0%, #00448F 52%, #E8F0F8 100%)",
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
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "20px 24px",
            }}
          >
            <div style={{ fontSize: "30px", fontWeight: 800, letterSpacing: "0.08em" }}>ALLSBERRY</div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.82)",
              }}
            >
              Insurance Agency
            </div>
          </div>
          <div
            style={{
              fontSize: "21px",
              letterSpacing: "0.32em",
              color: "rgba(255,255,255,0.82)",
              textTransform: "uppercase",
            }}
          >
            {safeDomain}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "870px" }}>
          <div style={{ fontSize: "62px", fontWeight: 800, lineHeight: 1.05 }}>
            Allsberry Insurance Agency
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.88)",
              maxWidth: "780px",
            }}
          >
            Personalized home, auto, life, and business insurance coverage for Corona and the Inland Empire.
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
              padding: "14px 24px",
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
