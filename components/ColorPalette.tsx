interface Color {
  hex: string;
  label?: string;
  gradient?: boolean;
}

interface ColorPaletteProps {
  colors: Color[];
  textColor?: string;
}

export default function ColorPalette({
  colors,
  textColor = "#000",
}: ColorPaletteProps) {
  return (
    <div className="flex flex-col gap-2">
      <p
        className="font-body text-sm mb-2"
        style={{ color: textColor, opacity: 0.8 }}
      >
        Palette de couleurs
      </p>
      <div className="flex flex-col gap-3">
        {colors.map((c, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full shrink-0 border border-white/10"
              style={{
                background: c.gradient
                  ? "linear-gradient(135deg, #a084ca 0%, #13dfce 50%, #5acc29 100%)"
                  : c.hex,
              }}
            />
            <span
              className="font-body text-xs opacity-70"
              style={{ color: textColor }}
            >
              {c.label ?? c.hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
