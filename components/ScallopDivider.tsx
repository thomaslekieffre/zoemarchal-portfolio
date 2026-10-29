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

  let scallopStyle: React.CSSProperties;

  if (variant === "bubbles") {
    const color = bubbleColor ?? bottomColor;
    scallopStyle = {
      backgroundImage: `radial-gradient(circle at 50% 100%, ${color} ${size * 0.85}px, ${topColor} ${size * 0.85 + 0.5}px)`,
      ...baseStyle,
    };
  } else if (variant === "up") {
    scallopStyle = {
      backgroundImage: `radial-gradient(circle at 50% 100%, ${bottomColor} ${size - 0.5}px, ${topColor} ${size}px)`,
      ...baseStyle,
    };
  } else {
    scallopStyle = {
      backgroundImage: `radial-gradient(circle at 50% 100%, ${bottomColor} ${size - 0.5}px, ${topColor} ${size}px)`,
      ...baseStyle,
    };
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: size }}>
      <div className="absolute inset-0" style={scallopStyle} />
    </div>
  );
}
