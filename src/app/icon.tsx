import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080b",
          borderRadius: 16,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: -1,
            color: "#f3f3f6",
          }}
        >
          HM
        </div>
        <div
          style={{
            display: "flex",
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "#22d3ee",
            marginLeft: 3,
            marginTop: 20,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
