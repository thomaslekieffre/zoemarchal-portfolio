interface SectionBannerProps {
  bgColor: string;
  textColor: string;
  text: string;
}

export default function SectionBanner({
  bgColor,
  textColor,
  text,
}: SectionBannerProps) {
  const items = Array.from({ length: 12 });

  return (
    <div
      className="w-full py-6 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="flex items-center gap-10 whitespace-nowrap w-max"
        style={{ animation: "marquee 20s linear infinite" }}
      >
        {items.map((_, i) => (
          <span
            key={i}
            className="font-heading text-2xl uppercase tracking-widest shrink-0"
            style={{ color: textColor }}
          >
            {text} <span className="mx-4">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
