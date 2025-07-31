import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { AutoBulletList } from "./auto-bullet-list";
import { EditorToolbar } from "./editor-toolbar";

// Note Editor Component
export function NoteEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
        emptyEditorClass: "is-editor-empty",
      }),
      AutoBulletList,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none h-full min-h-[600px] leading-[1.3]",
        style:
          "font-family: Arial, -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; line-height: 1.3; color: rgb(55 65 81);",
      },
    },
  });

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900">
      <EditorToolbar editor={editor} />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-4xl px-12">
          <EditorContent
            editor={editor}
            className="h-full min-h-[600px] [&_.ProseMirror]:min-h-full [&_.ProseMirror]:border-none [&_.ProseMirror]:px-0 [&_.ProseMirror]:py-8 [&_.ProseMirror]:outline-none [&_.is-editor-empty:first-child::before]:pointer-events-none [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_.is-editor-empty:first-child::before]:text-gray-400 [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]"
          />
        </div>
      </div>
      <style>{`
        .ProseMirror {
          outline: none;
          width: 100%;
          min-height: calc(100vh - 200px);
          font-size: 16px;
          line-height: 1.3;
          color: rgb(55 65 81);
          font-family:
            Arial,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }

        .dark .ProseMirror {
          color: rgb(255 255 255);
        }

        .ProseMirror p {
          margin-bottom: 1.2rem;
          line-height: 1.3;
          font-size: 16px;
          color: rgb(55 65 81);
        }

        .dark .ProseMirror p {
          color: rgb(255 255 255);
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 0;
          margin-bottom: 1.2rem;
        }

        .ProseMirror ul {
          list-style: none;
        }

        .ProseMirror ul li {
          position: relative;
          margin-bottom: 0.1rem;
          line-height: 1.3;
          padding-left: 0;
          color: rgb(55 65 81);
        }

        .dark .ProseMirror ul li {
          color: rgb(255 255 255);
        }

        .ProseMirror ul li::before {
          content: "•";
          position: absolute;
          left: -1rem;
          color: rgb(0 0 0);
          font-weight: bold;
          font-size: 1.2em;
        }

        .dark .ProseMirror ul li::before {
          color: rgb(255 255 255);
        }

        .ProseMirror ol li {
          margin-bottom: 0.4rem;
          line-height: 1.3;
          color: rgb(55 65 81);
        }

        .dark .ProseMirror ol li {
          color: rgb(255 255 255);
        }

        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3 {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          color: rgb(17 24 39);
        }

        .dark .ProseMirror h1 {
          color: rgb(255 255 255);
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          color: rgb(31 41 55);
        }

        .dark .ProseMirror h2 {
          color: rgb(255 255 255);
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          color: rgb(55 65 81);
        }

        .dark .ProseMirror h3 {
          color: rgb(255 255 255);
        }

        .ProseMirror a {
          color: rgb(147 51 234);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .ProseMirror a:hover {
          color: rgb(126 34 206);
        }

        .dark .ProseMirror a {
          color: rgb(196 181 253);
        }

        .dark .ProseMirror a:hover {
          color: rgb(147 51 234);
        }

        .ProseMirror blockquote {
          border-left: 4px solid rgb(147 51 234);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: rgb(75 85 99);
          background-color: rgb(248 250 252);
          padding: 1.5rem;
          border-radius: 0.5rem;
        }

        .dark .ProseMirror blockquote {
          border-left-color: rgb(196 181 253);
          color: rgb(255 255 255);
          background-color: rgb(30 41 59);
        }

        .ProseMirror code {
          background-color: rgb(243 244 246);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family:
            ui-monospace, SFMono-Regular, "SF Mono", Consolas,
            "Liberation Mono", Menlo, monospace;
          font-size: 0.875rem;
          color: rgb(239 68 68);
        }

        .dark .ProseMirror code {
          background-color: rgb(55 65 81);
          color: rgb(248 113 113);
        }

        .ProseMirror hr {
          border: none;
          border-top: 2px solid rgb(229 231 235);
          margin: 3rem auto;
          max-width: 65ch;
        }

        .dark .ProseMirror hr {
          border-top-color: rgb(75 85 99);
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: "Start writing...";
          float: left;
          color: rgb(156 163 175);
          pointer-events: none;
          height: 0;
          font-style: normal;
        }

        .dark .ProseMirror p.is-editor-empty:first-child::before {
          color: rgb(156 163 175);
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror ::selection {
          background-color: rgb(243 232 255);
        }

        .dark .ProseMirror ::selection {
          background-color: rgb(88 28 135);
        }

                  @media (min-width: 768px) {
            .ProseMirror {
              padding-left: 0;
              padding-right: 0;
            }
          }

        @media (max-width: 768px) {
          .ProseMirror {
            padding: 1.5rem 2rem;
            min-height: calc(100vh - 150px);
            font-size: 16px;
          }

          .ProseMirror p,
          .ProseMirror h1,
          .ProseMirror h2,
          .ProseMirror h3,
          .ProseMirror ul,
          .ProseMirror ol,
          .ProseMirror blockquote,
          .ProseMirror hr {
            max-width: none;
            margin-left: 0;
            margin-right: 0;
          }
        }

        .ProseMirror::-webkit-scrollbar {
          width: 8px;
        }

        .ProseMirror::-webkit-scrollbar-track {
          background: transparent;
        }

        .ProseMirror::-webkit-scrollbar-thumb {
          background: rgb(203 213 225);
          border-radius: 4px;
        }

        .dark .ProseMirror::-webkit-scrollbar-thumb {
          background: rgb(75 85 99);
        }

        .ProseMirror::-webkit-scrollbar-thumb:hover {
          background: rgb(148 163 184);
        }

        .dark .ProseMirror::-webkit-scrollbar-thumb:hover {
          background: rgb(107 114 128);
        }
      `}</style>
    </div>
  );
}
