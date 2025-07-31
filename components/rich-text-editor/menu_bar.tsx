"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center justify-center gap-2 border-b border-gray-100 bg-white/60 p-3 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/60">
      {/* Text Style Group */}
      <div className="flex items-center gap-1 rounded-lg bg-gray-50 p-1 dark:bg-gray-800/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`size-8 p-0 ${
            editor.isActive("bold")
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Bold className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`size-8 p-0 ${
            editor.isActive("italic")
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Italic className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`size-8 p-0 ${
            editor.isActive("underline")
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Underline className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`size-8 p-0 ${
            editor.isActive("strike")
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Strikethrough className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`size-8 p-0 ${
            editor.isActive("code")
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Code className="size-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Heading Group */}
      <div className="flex items-center gap-1 rounded-lg bg-gray-50 p-1 dark:bg-gray-800/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`size-8 p-0 ${
            editor.isActive("heading", { level: 1 })
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Heading1 className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`size-8 p-0 ${
            editor.isActive("heading", { level: 2 })
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Heading2 className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`size-8 p-0 ${
            editor.isActive("heading", { level: 3 })
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Heading3 className="size-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* List Group */}
      <div className="flex items-center gap-1 rounded-lg bg-gray-50 p-1 dark:bg-gray-800/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`size-8 p-0 ${
            editor.isActive("bulletList")
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <List className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`size-8 p-0 ${
            editor.isActive("orderedList")
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <ListOrdered className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`size-8 p-0 ${
            editor.isActive("blockquote")
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Quote className="size-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Alignment Group */}
      <div className="flex items-center gap-1 rounded-lg bg-gray-50 p-1 dark:bg-gray-800/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`size-8 p-0 ${
            editor.isActive({ textAlign: "left" })
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <AlignLeft className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`size-8 p-0 ${
            editor.isActive({ textAlign: "center" })
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <AlignCenter className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`size-8 p-0 ${
            editor.isActive({ textAlign: "right" })
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <AlignRight className="size-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Insert Group */}
      <div className="flex items-center gap-1 rounded-lg bg-gray-50 p-1 dark:bg-gray-800/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`size-8 p-0 ${
            editor.isActive("link")
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Link className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="size-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Minus className="size-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* History Group */}
      <div className="flex items-center gap-1 rounded-lg bg-gray-50 p-1 dark:bg-gray-800/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="size-8 p-0 hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-700"
        >
          <Undo className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="size-8 p-0 hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-700"
        >
          <Redo className="size-4" />
        </Button>
      </div>
    </div>
  );
}
