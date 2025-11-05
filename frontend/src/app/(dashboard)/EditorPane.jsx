"use client";

import Markdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import remarkGfm from "remark-gfm";

export default function EditorPane({ content, onContentChange }) {
  return (
    <div className="flex w-full h-full">
      <CodeMirror
        value={content}
        onChange={onContentChange}
        extensions={[
          markdown(),
          EditorView.contentAttributes.of({ spellcheck: "true" }),
        ]}
        className="w-1/2 h-full border-r border-gray-300"
      />

      <div className="w-1/2 h-full p-4">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  );
}
