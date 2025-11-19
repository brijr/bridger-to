import Image from "next/image";
import Link from "next/link";

import LogoLight from "@/public/logo.svg";
import LogoDark from "@/public/logo-dark.svg";

export const Logo = ({
  href = "/",
  width = 18,
  height,
  className,
}: {
  href?: string;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <Link href={href} className={className}>
      <div className="relative">
        <Image
          width={width}
          height={height}
          src={LogoLight}
          alt="Bridger Tower Logo"
          className="opacity-100 dark:opacity-0 transition-opacity duration-700 ease"
        />
        <Image
          width={width}
          height={height}
          src={LogoDark}
          alt="Bridger Tower Logo"
          className="absolute top-0 left-0 opacity-0 dark:opacity-100 transition-opacity duration-700 ease"
        />
      </div>
    </Link>
  );
};
