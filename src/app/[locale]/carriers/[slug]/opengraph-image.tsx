import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { carrierPartners } from "@/lib/site-data";
import { slugify } from "@/lib/utils";

export const alt = "Allsberry Insurance Agency — carrier partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CarrierOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const carrier = carrierPartners.find(
    (candidate) => slugify(candidate.name) === slug,
  );
  const carrierName = carrier?.name ?? "Carrier partner";

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
          background:
            "linear-gradient(145deg, #001033 0%, #00205c 30%, #0a3578 65%, #1a4f9a 100%)",
          color: "white",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.6) 28%, #f5c518 62%, #da291c 100%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
            Carrier partner
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Allsberry Insurance Agency
          </div>
          <div
            style={{
              fontSize: "82px",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
            }}
          >
            {carrierName}
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "820px",
            }}
          >
            Independent access to {carrierName} — compared against 20+ carriers for
            Corona, Riverside, and Southern California clients.
          </div>
        </div>

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
            Compare {carrierName} quote
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "20px", fontWeight: 600 }}>
            allsberryagency.com/carriers
          </div>
        </div>
      </div>
    ),
    size,
  );
}
