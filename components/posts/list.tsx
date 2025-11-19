import { Item } from "@/components/posts/item";

import type { Post } from "#site/content";

export const List = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-0.5 bg-muted dark:bg-muted/50 p-0.5 rounded">
          <div className="grid gap-0.5">
            {posts.map((post) => (
              <Item
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
              />
            ))}
          </div>
        </div>
      ) : (
        <NoPosts />
      )}
    </div>
  );
};

const NoPosts = () => {
  return (
    <p className="text-muted-foreground">
      No posts yet. Create your first post in the{" "}
      <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
        content/
      </code>
      directory.
    </p>
  );
};
