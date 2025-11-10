export interface PageMeta {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
  image?: string;
}

export interface MDXPage {
  metadata: PageMeta;
  content: React.ReactNode;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
