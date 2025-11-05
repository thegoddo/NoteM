"use client";

import Markdown from "react-markdown";
import { motion } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";

export default function EditorPane({ content, onContentChange, isEditing }) {
  const { theme } = useTheme();
  

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  };

  if (isEditing) {
    return (
      <div className="flex w-full h-full">
        <motion.div
          {...animation}
          className="w-1/2 h-full border-r border-gray-300"
        >
          <CodeMirror
            value={content}
            onChange={onContentChange}
            extensions={[
              markdown(),
              EditorView.contentAttributes.of({ spellcheck: "true" }),
            ]}
            className="h-full w-full"
            readOnly={false}
            theme={theme === "dark" ? "dark" : "light"}
          />
        </motion.div>
        <motion.div
          {...animation} // 6. Apply the animation
          className="w-1/2 h-full p-4"
        >
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </motion.div>
      </div>
    );
  }
  return (
    <motion.div
      {...animation} // 8. Apply the animation
      className="prose dark:prose-invert max-w-none w-full h-full p-4"
    >
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </motion.div>
  );
}
