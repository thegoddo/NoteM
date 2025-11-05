"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
};

export default function EditorPane({ content, onContentChange, isEditing }) {
  const { theme } = useTheme();

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const currentTheme = theme === "dark" ? vscDarkPlus : vs;
      return !inline && match ? (
        <SyntaxHighlighter
          style={currentTheme}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
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
        <motion.div {...animation} className="w-1/2 h-full p-4 overflow-y-auto">
          <Markdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
            {content}
          </Markdown>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      {...animation}
      className="prose dark:prose-invert max-w-none w-full h-full p-4 overflow-y-auto"
    >
      <Markdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
        {content}
      </Markdown>
    </motion.div>
  );
}
