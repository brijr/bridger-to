import Link from "next/link";
import { Subtitle } from "./subtitle";
import { cn } from "@/lib/utils";

export const Hero = ({
  path,
  pathHref,
  paths,
}: {
  path?: string;
  pathHref?: string;
  paths?: Array<{ label: string; href: string }>;
}) => {
  const segments =
    paths || (path && pathHref ? [{ label: path, href: pathHref }] : []);

  const hasSegments = segments.length > 0;

  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="text-muted-foreground">
            Bridger Tower
          </Link>
          <Subtitle className="sm:hidden shrink-0" />
        </div>
        {hasSegments && (
          <h1 className="flex flex-col sm:flex-row sm:items-center gap-2">
            {segments.map((segment, index) => (
              <span
                key={segment.href}
                className="flex items-center gap-2 blur-entrance"
                style={{
                  animationDelay: `${index * 0.25}s`,
                }}
              >
                <span className="text-muted-foreground">/</span>
                <Link
                  href={segment.href}
                  className={cn(
                    index < segments.length - 1 && "text-muted-foreground",
                  )}
                >
                  {segment.label}
                </Link>
              </span>
            ))}
          </h1>
        )}
      </div>
      <Subtitle className="hidden sm:block shrink-0" />
    </div>
  );
};
