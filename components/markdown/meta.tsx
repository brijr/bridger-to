import { formatDate } from "@/lib/mdx";
import { CopyArticleButton } from "./copy-article-button";

interface MetaProps {
  title: string;
  date?: string;
  author?: string;
}

export function Meta({ title, date, author }: MetaProps) {
  return (
    <div className="space-y-2 flex items-start justify-between gap-2">
      <div>
        <h1>{title}</h1>
        {(date || author) && (
          <div className="text-sm text-muted-foreground">
            {date && <time dateTime={date}>{formatDate(date)}</time>}
            {date && author && <span className="mx-2">·</span>}
            {author && <span>{author}</span>}
          </div>
        )}
      </div>
      <CopyArticleButton />
    </div>
  );
}
