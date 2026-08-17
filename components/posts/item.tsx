import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/mdx";
import { cn } from "@/lib/utils";

interface PostItemProps {
  slug: string;
  title: string;
  date: string;
  className?: string;
}

const PostDate = ({ date }: { date: string }) => {
  return (
    <time
      dateTime={date}
      className="text-muted-foreground text-sm pr-1 hidden sm:block"
    >
      {formatDate(date)}
    </time>
  );
};

export const Item = ({ slug, title, date, className }: PostItemProps) => {
  return (
    <Link
      href={`/${slug}`}
      className={cn(
        "flex min-w-0 items-center justify-between gap-2 hover:text-primary group bg-background p-2 rounded",
        className,
      )}
    >
      <h3 className="flex min-w-0 flex-1 items-center gap-1.5">
        <ArrowUpRight
          strokeWidth={1.5}
          size={20}
          className="shrink-0 sm:hidden group-hover:rotate-45 transition-transform duration-400"
        />
        <ArrowDownRight
          strokeWidth={1.5}
          size={20}
          className="hidden shrink-0 sm:block group-hover:-rotate-45 transition-transform duration-400"
        />
        <span className="min-w-0 truncate sm:overflow-visible sm:whitespace-normal">
          {title}
        </span>
      </h3>

      <PostDate date={date} />
    </Link>
  );
};
