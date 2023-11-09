import Image from "next/image";

const IntroColumn = () => {
  return (
    <>
      <h1 className="sr-only">Bridger Tower | Designer and Developer</h1>
      <p className="group flex gap-3 cursor-default items-center text-3xl lowercase transition-all">
        <span className="block md:inline">
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
      <div className="flex flex-col gap-2">
        <h2 className="text-lg">
          Designer, Developer, and Marketer from Salt Lake City, UT. Crafting
          software and websites. Using Next.js, Figma, Tailwind CSS, Typscript,
          Webflow, Wordpress, Laravel, and more.
        </h2>
        <h3 className="opacity-70">
          As a creative technologist, I combine my passion for design and code
          to create{" "}
          <a
            className="border-b hover:border-orange-300 border-orange-500"
            href="https://design.bridger.to"
          >
            timeless brands
          </a>
          , comprehensive design systems,{" "}
          <a
            className="border-b hover:border-orange-300 border-orange-500"
            href="https://product.bridger.to"
          >
            impactful digital products
          </a>
          , and captivating websites.
        </h3>
      </div>
    </>
  );
};

export default IntroColumn;
