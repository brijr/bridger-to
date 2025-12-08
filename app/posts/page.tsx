import { Section, Container } from "@/components/ds";
import { AnimatedContent } from "@/components/site/animated-content";
import { EmailForm } from "@/components/email-form";
import { List } from "@/components/posts/list";

import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <Container className="space-y-8">
        <AnimatedContent>
          <List posts={posts} />
          <EmailForm label="Get notified about new posts" />
        </AnimatedContent>
      </Container>
    </Section>
  );
}
