"use client";

import type { PortableTextBlock, PortableTextSpan } from "@/types/sanity";

type RichTextProps = {
  blocks?: PortableTextBlock[];
  fallback?: string;
  className?: string;
};

function renderSpan(span: PortableTextSpan, index: number) {
  const text = span.text ?? "";
  if (span.marks?.includes("strong")) {
    return <strong key={index}>{text}</strong>;
  }
  if (span.marks?.includes("em")) {
    return <em key={index}>{text}</em>;
  }
  return <span key={index}>{text}</span>;
}

function renderInline(children?: PortableTextSpan[]) {
  if (!children) return null;
  return children.map((span, i) => renderSpan(span, i));
}

export function RichText({ blocks, fallback, className }: RichTextProps) {
  if (!blocks || blocks.length === 0) {
    if (!fallback) return null;
    return (
      <div className={className}>
        <p>{fallback}</p>
      </div>
    );
  }

  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.listItem === "bullet" || block.listItem === "number") {
      const listType = block.listItem;
      const items: React.ReactNode[] = [];

      while (i < blocks.length && blocks[i].listItem === listType) {
        items.push(
          <li key={blocks[i]._key ?? i}>{renderInline(blocks[i].children)}</li>
        );
        i++;
      }

      if (listType === "bullet") {
        elements.push(<ul key={`list-${i}`}>{items}</ul>);
      } else {
        elements.push(<ol key={`list-${i}`}>{items}</ol>);
      }
    } else {
      const hasContent = block.children?.some((s) => s.text);
      if (hasContent) {
        elements.push(
          <p key={block._key ?? i}>{renderInline(block.children)}</p>
        );
      }
      i++;
    }
  }

  if (elements.length === 0) return null;

  return <div className={className}>{elements}</div>;
}
