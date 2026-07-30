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
    </div>
  );
};
