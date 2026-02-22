interface Props {
  bottomColor: string;
  height?: number;
}

export default function ArchDivider({ bottomColor, height = 200 }: Props) {
  return (
    <div
      className="relative w-full overflow-hidden leading-none"
      style={{ backgroundColor: "var(--color-blue)", height }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/Texturelabs_Brick_124XL.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.2,
        }}
      />
      <svg
        viewBox={`0 0 1512 ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="relative w-full h-full"
      >
        <path
          d={`M0,${height} Q756,0 1512,${height} Z`}
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
