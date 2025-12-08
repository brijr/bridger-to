import { Tweet as ReactTweet } from "react-tweet";
import { cn } from "@/lib/utils";

interface TweetProps {
  id: string;
  className?: string;
}

export function Tweet({ id, className }: TweetProps) {
  return (
    <div
      className={cn(
        "my-6 [&_.react-tweet-theme]:m-0! [&_.react-tweet-theme]:max-w-none!",
        className
      )}
    >
      <ReactTweet id={id} />
    </div>
  );
}
