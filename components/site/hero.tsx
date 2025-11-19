import Link from "next/link";

export const Hero = ({
  path,
  pathHref,
  paths,
}: {
  path?: string;
  pathHref?: string;
  paths?: Array<{ label: string; href: string }>;
}) => {
  const segments = paths || (path && pathHref ? [{ label: path, href: pathHref }] : []);

  return (
    <div className="flex items-center justify-between gap-2">
      <h1 className="flex items-center gap-2">
        <Link href="/" className={segments.length > 0 ? "text-muted-foreground" : undefined}>
          Bridger Tower
        </Link>

        {segments.map((segment, index) => (
          <span key={segment.href} className="flex items-center gap-2">
            <span className="text-muted-foreground">/</span>
            <Link href={segment.href} className={index < segments.length - 1 ? "text-muted-foreground" : ""}>
              {segment.label}
            </Link>
          </span>
        ))}
      </h1>
      <h2 className="text-muted-foreground">Design Engineer</h2>
    </div>
  );
};
