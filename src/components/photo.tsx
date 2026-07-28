import Image from "next/image";

/**
 * Fixed-ratio photo built on next/image (fill + object-cover). The warm
 * surface behind it shows while the image loads and in the rare case a file
 * is missing, so layout never shifts.
 */
export function Photo({
  src,
  alt,
  ratio = "aspect-[4/3]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-surface-2 ${ratio} ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName ?? ""}`}
      />
    </div>
  );
}
