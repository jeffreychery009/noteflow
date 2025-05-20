"use client";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

import MenuBar from "./menu_bar";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<h1>Hello World!</h1>",
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md py-2 px-3 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.chain().focus().setHeading({ level: 1 }).run();
    }
  }, [editor]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="[&_h1]:text-4xl [&_h1]:font-bold [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-2xl [&_h3]:font-bold"
      />
    </div>
  );
};

export default RichTextEditor;
