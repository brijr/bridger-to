import { Main, Section, Container, Prose } from "@/components/ds";
import { MDXContent } from "@/components/markdown/mdx-content";
import { Meta } from "@/components/markdown/meta";
import { Hero } from "@/components/site/hero";
import { AnimatedContent } from "@/components/site/animated-content";

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bridger.to";

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
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
          <AnimatedContent>
            <Meta title={post.title} date={post.date} author={post.author} />
            <Prose isArticle isSpaced>
              <MDXContent code={post.body} />
            </Prose>
          </AnimatedContent>
        </Container>
      </Section>
    </Main>
  );
}
