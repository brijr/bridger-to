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
    <time dateTime={date} className="text-xs text-muted-foreground">
      {formatDate(date)}
    </time>
  );
};

export const Item = ({
  slug,
  title,
  date,
  className,
}: PostItemProps) => {
  return (
    <Link
      href={`/${slug}`}
      className={cn(
        "flex items-center justify-between gap-2 hover:text-primary group bg-background p-2 rounded",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <ArrowDownRight
          strokeWidth={1.5}
          className="group-hover:-rotate-45 transition-transform"
        />
        <span className="font-medium">{title}</span>
      </div>

      <PostDate date={date} />
    </Link>
  );
};
