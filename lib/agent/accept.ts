function quality(accept: string, type: string): number | null {
  const parts = accept.split(",").map((part) => part.trim());
  let best: number | null = null;

  for (const part of parts) {
    const [media, ...params] = part.split(";").map((value) => value.trim());
    if (!media) continue;

    const matches =
      media === type ||
      media === "*/*" ||
      (media.endsWith("/*") && type.startsWith(`${media.slice(0, -1)}`));

    if (!matches) continue;

    let q = 1;
    for (const param of params) {
      if (param.startsWith("q=")) {
        const parsed = Number.parseFloat(param.slice(2));
        if (!Number.isNaN(parsed)) q = parsed;
      }
    }

    const specificity = media === type ? 2 : media.endsWith("/*") ? 1 : 0;
    const score = q + specificity * 0.001;
    if (best === null || score > best) best = score;
  }

  return best;
}

export function wantsMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;
  const markdown = quality(acceptHeader, "text/markdown");
  if (markdown === null) return false;
  const html = quality(acceptHeader, "text/html");
  if (html === null) return true;
  return markdown > html;
}
