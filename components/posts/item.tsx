import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
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
    <time dateTime={date} className="text-muted-foreground text-sm pr-1">
      {formatDate(date)}
    </time>
  );
};

export const Item = ({ slug, title, date, className }: PostItemProps) => {
  return (
    <Link
      href={`/${slug}`}
      className={cn(
        "flex items-center justify-between gap-2 hover:text-primary group bg-background p-2 rounded",
        className
      )}
    >
      <h3 className="flex items-center gap-1.5">
        <ArrowDownRight
          strokeWidth={1.5}
          size={20}
          className="group-hover:-rotate-45 transition-transform"
        />
        {title}
      </h3>

      <PostDate date={date} />
    </Link>
  );
};
