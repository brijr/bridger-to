import { Main, Section, Container } from "@/components/ds";
import { List } from "@/components/posts/list";
import { Hero } from "@/components/site/hero";

import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Main>
      <Section>
        <Container className="space-y-8">
          <Hero path="Posts" pathHref="/posts" />
          <List posts={posts} />
        </Container>
      </Section>
    </Main>
  );
}
