"use client";

import { useState } from "react";
import Markdown from "react-markdown";

export default function EditorPane({ content, onContentChange }) {
  // const [markdown, setMarkdown] = useState("# Hello, World!");

  return (
    <div className="flex w-full h-full">
      <textarea
        className="w-1/2 h-full border-r border-gray-300 p-4"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <div className="w-1/2 h-full p-4">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
