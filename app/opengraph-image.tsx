import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} portfolio preview`;

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
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 36%), linear-gradient(135deg, #020202 0%, #090909 55%, #0f172a 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 36,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 28,
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 9999,
                padding: "12px 20px",
                fontSize: 26,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {siteConfig.siteName}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "rgba(255,255,255,0.58)",
                letterSpacing: 2,
              }}
            >
              Portfolio
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 860,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 82,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 34,
                color: "rgba(255,255,255,0.72)",
                letterSpacing: 1,
              }}
            >
              {siteConfig.jobTitle}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.84)",
              }}
            >
              Building high-performance web products with Next.js, React,
              FastAPI, Python, and AWS.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            {["Next.js", "React", "TypeScript", "FastAPI", "AWS"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 9999,
                    padding: "14px 20px",
                    fontSize: 24,
                    color: "rgba(255,255,255,0.76)",
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}
