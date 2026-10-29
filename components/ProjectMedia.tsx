import ProjectImage from "@/components/ProjectImage";

const VIDEO_URL = /\.(mp4|webm|mov)(\?.*)?$/i;

export function isVideoUrl(url: string) {
  return VIDEO_URL.test(url);
}

/**
 * Image, GIF ou vidéo courte (mp4 / webm / mov) d'un projet.
 * Les vidéos tournent en boucle, muettes, sans contrôles.
 */
export default function ProjectMedia({
  src,
  alt,
  fill = false,
  className = "",
  sizes,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}) {
  const hide = (e: React.SyntheticEvent<HTMLElement>) => { e.currentTarget.style.display = "none"; };

  if (isVideoUrl(src)) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={hide}
        className={fill ? `absolute inset-0 w-full h-full object-cover ${className}` : `block w-full h-auto ${className}`}
      />
    );
  }

  if (fill) {
    return (
      <ProjectImage src={src} alt={alt} fill className={`object-cover ${className}`} sizes={sizes} onError={hide} />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={`block w-full h-auto ${className}`} onError={hide} />;
}
