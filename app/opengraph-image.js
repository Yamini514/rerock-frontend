import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "@/lib/seo";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  const logoBuffer = readFileSync(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c1c1e 0%, #2a1b13 55%, #8f3416 130%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.06) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.04) 2px, transparent 0)",
            backgroundSize: "100px 100px",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og requires a plain <img>, next/image is not supported */}
        <img src={logoSrc} width={560} height={246} alt="" style={{ objectFit: "contain" }} />
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "#f5f1ea",
            letterSpacing: 2,
            display: "flex",
          }}
        >
          Your Real Estate Investment Partner
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 22,
            color: "#d19b74",
            display: "flex",
          }}
        >
          Hyderabad · Kokapet · Gachibowli · Financial District
        </div>
      </div>
    ),
    { ...size }
  );
}
