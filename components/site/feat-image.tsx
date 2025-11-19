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
        className="object-cover"
        placeholder="blur"
      />
    </div>
  );
};
