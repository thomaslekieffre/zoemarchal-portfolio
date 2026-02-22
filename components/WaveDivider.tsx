interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  flip?: boolean;
  height?: number;
}

export default function WaveDivider({
  fromColor,
  toColor,
  flip = false,
  height = 100,
}: WaveDividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height, backgroundColor: fromColor }}
    >
      <svg
        viewBox="0 0 1512 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-full"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <path
          d="M0,30 C180,100 380,0 560,55 C740,110 900,15 1080,65 C1260,115 1400,20 1512,45 L1512,100 L0,100 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
