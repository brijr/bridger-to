import Image, { StaticImageData } from "next/image";

export const FeatImage = ({
  src,
  alt,
}: {
  src: StaticImageData;
  alt: string;
}) => {
  return (
    <div className="relative aspect-3/2 w-full rounded overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 672px) 624px, 100vw"
        className="object-cover"
        placeholder="blur"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded ring-1 ring-inset ring-black/8 dark:ring-white/8"
      />
    </div>
  );
};
