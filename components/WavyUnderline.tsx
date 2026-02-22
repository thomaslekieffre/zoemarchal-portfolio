"use client";

/* Trait décoratif sous les titres — utilise la texture brick du Hero
   affiché dans une bande fine avec bords arrondis. */

interface Props {
  width?: number | string;
  height?: number;
  className?: string;
}

export default function WavyUnderline({
  width = 160,
  height = 8,
  className = "",
}: Props) {
  return (
    <div
      className={`mt-2 ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height,
        borderRadius: height / 2,
        backgroundImage: "url(/Texturelabs_Brick_124XL.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.7,
      }}
    />
  );
}
