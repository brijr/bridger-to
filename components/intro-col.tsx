import Image from "next/image";
import Link from "next/link";
import { Link1Icon } from "@radix-ui/react-icons";

const IntroCol = () => {
  return (
    <>
      <div>
        {/* top element */}
        <h1 className="sr-only">Bridger Tower | Designer and Developer</h1>
        <p className="group mt-6 flex cursor-default items-center gap-3 text-3xl lowercase transition-all">
          <span className="block md:group-hover:invert md:inline">
            <Image
              className="spin w-8"
              width={24}
              height={24}
              src="/x.svg"
              alt="a little x thing"
            />
          </span>
          <span className="inline group-hover:hidden">Bridger Tower</span>{" "}
          <span className="hidden group-hover:inline">bridger.to</span>
        </p>
        <h2 className="mt-12 text-xl">
          Designer, Developer, and Marketer from Salt Lake City, UT. Crafting
          innovative software and websites using AI and modern technologies.
        </h2>
        <h3 className="mt-6 opacity-70">
          As a creative technologist, I combine my passion for design and code
          to create timeless brands, comprehensive design systems, impactful
          digital software, and captivating websites.
        </h3>

        <div className="grid gap-4 my-12">
          <Link
            className="hover:ml-1 transition-all w-fit items-center flex gap-2"
            href="https://components.bridger.to"
          >
            <Link1Icon />
            components.bridger.to
          </Link>
          <Link
            className="hover:ml-1 transition-all w-fit items-center flex gap-2"
            href="https://product.bridger.to"
          >
            <Link1Icon />
            product.bridger.to
          </Link>
          <Link
            className="hover:ml-1 transition-all w-fit items-center flex gap-2"
            href="https://design.bridger.to"
          >
            <Link1Icon />
            design.bridger.to
          </Link>
        </div>
      </div>

      {/* Description etc. */}
      <div className="flex flex-col gap-4">
        <p className="hidden text-xs opacity-50 md:block">
          © <a href="https://x.com/bridgertower">Bridger Tower</a>, All rights
          reserved.
        </p>
      </div>
    </>
  );
};

export default IntroCol;
