"use client";

import { useState } from "react";
import Markdown from "react-markdown";

export default function EditorPane() {
  const [markDown, setMarkDown] = useState("# Hello, World!");

  return (
    <div className="flex w-full h-full">
      <textarea
        className="w-1/2 h-full border-r border-gray-300 p-4"
        value={markDown}
        onChange={(e) => setMarkDown(e.target.value)}
      />
      <div className="w-1/2 h-full p-4">
        <Markdown>{markDown}</Markdown>
      </div>
    </div>
  );
}
