import Image, { type ImageProps } from "next/image";

function isSupabaseStorage(src: ImageProps["src"]) {
  return typeof src === "string" && src.includes(".supabase.co/storage/");
}

/** Bypasses Vercel image optimizer for Supabase Storage (avoids INVALID_IMAGE_OPTIMIZE_REQUEST). */
export default function ProjectImage(props: ImageProps) {
  return <Image {...props} unoptimized={isSupabaseStorage(props.src) || props.unoptimized} />;
}
