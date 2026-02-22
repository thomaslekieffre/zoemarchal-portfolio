"use client";

interface Props {
  topColor: string;
  bottomColor: string;
  size?: number;
  variant?: "down" | "up" | "bubbles";
  bubbleColor?: string;
  reverse?: boolean;
}

export default function ScallopDivider({
  topColor,
  bottomColor,
  size = 40,
  variant = "down",
  bubbleColor,
  reverse = false,
}: Props) {
  const step = size * 2;
  const animName = reverse ? "scallop-wave-ltr" : "scallop-wave-rtl";
  const baseStyle: React.CSSProperties = {
    backgroundSize: `${step}px 100%`,
    backgroundRepeat: "repeat-x",
    animation: `${animName} 3s linear infinite`,
    ["--scallop-step" as string]: `${step}px`,
  };

  if (variant === "bubbles") {
    const color = bubbleColor ?? bottomColor;
    return (
      <div
        className="w-full"
        style={{
          height: size,
          backgroundImage: `radial-gradient(circle at 50% 100%, ${color} ${size * 0.85}px, ${topColor} ${size * 0.85 + 0.5}px)`,
          ...baseStyle,
        }}
      />
    );
  }

  if (variant === "up") {
    return (
      <div
        className="w-full"
        style={{
          height: size,
          backgroundImage: `radial-gradient(circle at 50% 100%, ${bottomColor} ${size - 0.5}px, ${topColor} ${size}px)`,
          ...baseStyle,
        }}
      />
    );
  }

  return (
    <div
      className="w-full"
      style={{
        height: size,
        backgroundImage: `radial-gradient(circle at 50% 100%, ${bottomColor} ${size - 0.5}px, ${topColor} ${size}px)`,
        ...baseStyle,
      }}
    />
  );
}
