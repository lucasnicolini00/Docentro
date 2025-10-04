"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";

interface ClientMarkdownPreviewProps {
  source: string;
  className?: string;
}

export default function ClientMarkdownPreview({
  source,
  className = "",
}: ClientMarkdownPreviewProps) {
  return (
    <div className={className}>
      <MarkdownPreview
        source={source}
        style={{ background: "transparent", color: "inherit" }}
      />
    </div>
  );
}
