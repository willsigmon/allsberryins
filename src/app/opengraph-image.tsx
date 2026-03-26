import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoData = await readFile(
    join(process.cwd(), "public", "android-chrome-512x512.png"),
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #001033 0%, #00205c 30%, #0a3578 65%, #1a4f9a 100%)",
          color: "white",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,102,179,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(218,41,28,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            height: "4px",
            background: "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.6) 28%, #f5c518 62%, #da291c 100%)",
            display: "flex",
          }}
        />

        {/* Header row: logo + location badge */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt=""
            width={80}
            height={80}
            style={{ borderRadius: "20px" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Southern California
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            Allsberry Insurance Agency
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "780px",
            }}
          >
            Personalized home, auto, life, and business insurance for families and businesses across Southern California.
          </div>
        </div>

        {/* Bottom row: CTA + tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              background: "#DA291C",
              padding: "14px 32px",
              boxShadow: "0 8px 24px -8px rgba(218,41,28,0.5)",
            }}
          >
            Get a Free Quote
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "20px", fontWeight: 600 }}>
            allsberryagency.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
