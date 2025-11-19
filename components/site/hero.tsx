import Link from "next/link";

export const Hero = ({
  path,
  pathHref,
}: {
  path?: string;
  pathHref?: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <h1 className="flex items-center gap-2">
        <Link href="/" className={path && "text-muted-foreground"}>
          Bridger Tower
        </Link>

        {path && pathHref && (
          <>
            <span className="text-muted-foreground">/</span>
            <Link href={pathHref}>{path}</Link>
          </>
        )}
      </h1>
      <h2 className="text-muted-foreground">Designer and Software Engineer</h2>
    </div>
  );
};
