import { List } from "@/components/posts/list";
import { Main } from "@/components/ds";

import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Main>
      <List posts={posts} />
    </Main>
  );
}
