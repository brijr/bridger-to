import { Section, Container } from "@/components/ds";
import { List } from "@/components/posts/list";
import { AnimatedContent } from "@/components/site/animated-content";

import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <Container className="space-y-8">
        <AnimatedContent>
          <List posts={posts} />
        </AnimatedContent>
      </Container>
    </Section>
  );
}
