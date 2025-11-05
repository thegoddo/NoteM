"use client";

import { Button } from "@/components/ui/button";
import {
  Bold, Italic, List, Save, Link, Table, Smile, Image,
} from "lucide-react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { toast } from "sonner";

function ToolBoxButton({ icon: Icon, onClick }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      <Icon className="h-4 w-4" />
    </Button>
  );
}

export default function ToolBox({
  editorRef,
  content,
  onContentChange,
  onSave, 
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSave = () => {
    if(onSave) {
      onSave(); 
    } else {
      toast.error("Save not configured!");
    }
  };


  const handleMarkdownInsert = (syntax) => {
    const editor = editorRef.current;
    if (!editor) return;

    const { selectionStart, selectionEnd } = editor;
    const selectedText = content.substring(selectionStart, selectionEnd);
    let newText = "";

    switch (syntax) {
      case "bold":
        newText = `**${selectedText || "text"}**`;
        break;
      case "italic":
        newText = `*${selectedText || "text"}*`;
        break;
      case "link":
        newText = `[${selectedText || "link text"}](url)`;
        break;
      case "image":
        newText = `![${selectedText || "alt text"}](image_url)`;
        break;
      case "table":
        newText = `\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n`;
        break;
      default:
        newText = syntax;
    }

    const updateContent =
      content.substring(0, selectionStart) +
      newText +
      content.substring(selectionEnd);

    onContentChange(updateContent);
    editor.focus();
  };

  const onEmojiClick = (emojiObject) => {
    handleMarkdownInsert(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="h-12 border-b flex items-center p-2 gap-1 relative">
      <ToolBoxButton icon={Bold} onClick={() => handleMarkdownInsert("bold")} />
      <ToolBoxButton
        icon={Italic}
        onClick={() => handleMarkdownInsert("italic")}
      />
      <ToolBoxButton icon={List} onClick={() => handleMarkdownInsert("* ")} />
      <ToolBoxButton icon={Link} onClick={() => handleMarkdownInsert("link")} />
      <ToolBoxButton
        icon={Image}
        onClick={() => handleMarkdownInsert("image")}
      />
      <ToolBoxButton
        icon={Table}
        onClick={() => handleMarkdownInsert("table")}
      />
      <ToolBoxButton
        icon={Smile}
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      />
      <div className="flex-1"></div>
      <Button variant="ghost" onClick={handleSave}>
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      {showEmojiPicker && (
        <div className="absolute top-12 z-10">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
}