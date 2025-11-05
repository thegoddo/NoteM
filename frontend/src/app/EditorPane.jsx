"use client";

import { useState } from "react/cjs/react.production";
import Markdown from "react-markdown";

export default function EditorPane() {
  const [markdown, setMarkdown] = useState("#Hello, World!");

  return (
    <div className="flex w-full h-full">
      <textarea
        className="w-1/2 h-full border-r border-gray-300 p-4"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <div className="w-1/2 h-full p-4">
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
}
