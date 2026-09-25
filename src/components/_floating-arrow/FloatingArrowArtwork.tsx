import type { CSSProperties } from "react";

// A 12px rotated square has a 12 * sqrt(2) base and half that exposed height.
export const floatingArrowWidth = 12 * Math.SQRT2;
export const floatingArrowHeight = floatingArrowWidth / 2;

export function floatingArrowStyle(width?: number, height?: number, style?: CSSProperties): CSSProperties {
  return {
    ...(width === undefined ? {} : { "--brick-floating-arrow-width": `${width}px` }),
    ...(height === undefined ? {} : { "--brick-floating-arrow-height": `${height}px` }),
    ...style,
  } as CSSProperties;
}

/** Paint only. Atom owns placement, measurements, refs and collision handling. */
export function FloatingArrowArtwork({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const shapes = [
    {
      side: "bottom",
      points: `0,${height} ${width / 2},0 ${width},${height}`,
      base: `0,${height} ${width},${height}`,
    },
    {
      side: "top",
      points: `0,0 ${width / 2},${height} ${width},0`,
      base: `0,0 ${width},0`,
    },
    {
      side: "right",
      points: `${height},0 0,${width / 2} ${height},${width}`,
      base: `${height},0 ${height},${width}`,
    },
    {
      side: "left",
      points: `0,0 ${height},${width / 2} 0,${width}`,
      base: `0,0 0,${width}`,
    },
  ];
  return shapes.map(({ side, points, base }) => (
    <g key={side} data-arrow-artwork={side}>
      <polygon points={points} stroke="none" />
      <polyline
        className="brick-floating-arrow__join"
        points={base}
        fill="none"
      />
      <polyline
        className="brick-floating-arrow__edge"
        points={points}
        fill="none"
      />
    </g>
  ));
}
