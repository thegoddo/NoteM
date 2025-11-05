"use client";

import Markdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
};

export default function EditorPane({ content, onContentChange, isEditing }) {
  const { theme } = useTheme();

  const editorWidthClass = isEditing ? "w-1/2 border-r" : "hidden";
  const previewWidthClass = isEditing ? "w-1/2" : "w-full";
  const previewPadding = isEditing ? "p-4" : "p-8"; // Give the read mode more padding

  return (
    <div className="flex w-full h-full">
      <motion.div
        {...animation}
        className={`${editorWidthClass} h-full border-gray-300`}
      >
        <CodeMirror
          value={content}
          onChange={onContentChange}
          extensions={[
            markdown(),
            EditorView.contentAttributes.of({ spellcheck: "true" }),
          ]}
          className="h-full w-full"
          readOnly={!isEditing}
          theme={theme === "dark" ? "dark" : "light"}
        />
      </motion.div>

      <motion.div
        {...animation}
        className={`${previewWidthClass} h-full ${previewPadding} overflow-y-auto`}
      >
        <div className="prose dark:prose-invert max-w-none">
          {/* Ths content is always the preview */}
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      </motion.div>
    </div>
  );
}
