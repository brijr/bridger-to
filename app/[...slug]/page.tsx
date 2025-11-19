import { Main, Section, Container, Prose } from "@/components/ds";
import { MDXContent } from "@/components/markdown/mdx-content";
import { Meta } from "@/components/markdown/meta";
import { Hero } from "@/components/site/hero";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import type { Post } from ".velite";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post: Post) => ({
    slug: post.slug.split("/"),
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug.join("/");
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const slug = params.slug.join("/");
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <Main>
      <Section>
        <Container className="space-y-8">
          <Hero
            paths={[
              { label: "Posts", href: "/posts" },
              { label: post.title, href: `/${post.slug}` },
            ]}
          />
          <Meta title={post.title} date={post.date} author={post.author} />
          <Prose isArticle isSpaced>
            <MDXContent code={post.body} />
          </Prose>
        </Container>
      </Section>
    </Main>
  );
}
