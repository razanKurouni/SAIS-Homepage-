import { richTextToParagraphs } from "@/lib/content";
import type { PortableTextBlock } from "@/types/sanity";

type RichTextProps = {
  blocks?: PortableTextBlock[];
  fallback?: string;
  className?: string;
};

export function RichText({ blocks, fallback, className }: RichTextProps) {
  const paragraphs = richTextToParagraphs(blocks);
  const content = paragraphs.length > 0 ? paragraphs : fallback ? [fallback] : [];

  if (content.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
