"use client";

import { forwardRef } from "react";
import Markdown from "react-markdown";

const EditorPane = forwardRef(({ content, onContentChange }, ref) => {
  return (
    <div className="flex w-full h-full">
      <textarea
        ref={ref}
        className="w-1/2 h-full border-r border-gray-300 p-4"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <div className="w-1/2 h-full p-4">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
});

// For Debugging purpose
EditorPane.displayName = "EditorPane";

export default EditorPane;
