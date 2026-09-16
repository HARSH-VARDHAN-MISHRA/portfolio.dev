import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08080b",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#9a9aa8",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: "#22d3ee" }} />
          {site.role} · {site.roleDetail}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 76,
            fontWeight: 700,
            color: "#f3f3f6",
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          I build the frontend that CRM systems and warehouses run on.
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 28, color: "#6d5ef9" }}>{site.name}</div>
      </div>
    ),
    { ...size }
  );
}
