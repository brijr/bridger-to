import { Main, Section, Container } from "@/components/ds";
import { List } from "@/components/posts/list";
import { Hero } from "@/components/site/hero";
import { Logo } from "@/components/site/logo";

import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Main>
      <Section>
        <Container className="space-y-8">
          <Logo className="block" />
          <Hero path="Posts" pathHref="/posts" />
          <List posts={posts} />
        </Container>
      </Section>
    </Main>
  );
}
