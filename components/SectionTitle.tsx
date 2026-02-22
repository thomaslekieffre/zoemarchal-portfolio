"use client";

import WavyUnderline from "./WavyUnderline";

interface SectionTitleProps {
  children: React.ReactNode;
  color?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-[20px]",
  md: "text-[24px]",
  lg: "text-[32px]",
};

export default function SectionTitle({
  children,
  color = "#a17cc1",
  size = "md",
}: SectionTitleProps) {
  return (
    <div className="flex flex-col w-fit mb-6">
      <h2
        className={`font-heading leading-tight ${sizes[size]}`}
        style={{ color }}
      >
        {children}
      </h2>
      <WavyUnderline width="100%" height={size === "lg" ? 10 : 7} />
    </div>
  );
}
