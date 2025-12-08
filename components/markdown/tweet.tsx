import { Tweet as ReactTweet } from "react-tweet";
import { cn } from "@/lib/utils";

interface TweetProps {
  id: string;
  className?: string;
}

export function Tweet({ id, className }: TweetProps) {
  return (
    <div className={cn("my-6 flex justify-center [&>div]:w-full", className)}>
      <ReactTweet id={id} />
    </div>
  );
}
