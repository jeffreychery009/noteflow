"use client";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import MenuBar from "./menu_bar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RichTextEditor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  const noteId = searchParams.get("noteId");
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Fetch note data if we're editing
  const { data: noteData } = useSWR(
    noteId ? `/api/notes/${noteId}` : null,
    fetcher
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[156px] py-2 px-3 focus:outline-none",
      },
    },
  });

  // Set initial content when editing a note
  useEffect(() => {
    if (editor && noteData?.data) {
      // Combine title and content for editing
      const fullContent = `<h1>${noteData.data.title}</h1>${noteData.data.content}`;
      editor.commands.setContent(fullContent);
    } else if (editor && !noteId) {
      // For new notes, just set heading
      editor.chain().focus().setHeading({ level: 1 }).run();
    }
  }, [editor, noteData, noteId]);

  const handleSave = async () => {
    if (!editor || !folderId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing required information to save the note",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Get the HTML content
      const htmlContent = editor.getHTML();

      // Extract the first heading or paragraph
      const titleMatch = htmlContent.match(/<(h1|h2|h3|p)>(.*?)<\/\1>/);
      const title = titleMatch
        ? titleMatch[2].trim().slice(0, 50)
        : "Untitled Note";

      // Remove the first block and get remaining content
      let content = "";
      if (titleMatch) {
        const titleEndIndex =
          htmlContent.indexOf(titleMatch[0]) + titleMatch[0].length;
        content = htmlContent.slice(titleEndIndex).trim();
      } else {
        content = htmlContent;
      }

      // If content is empty, provide a default empty paragraph
      if (!content) {
        content = "<p></p>";
      }

      const url = noteId ? `/api/notes/${noteId}` : "/api/notes";
      const method = noteId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          folderId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save note");
      }

      toast({
        title: "Success",
        description: "Note has been saved successfully",
        className: "bg-green-500 text-white",
      });

      router.push(`/folders/${folderId}`); // TODO: Redirect to the note
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save note",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!folderId) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Missing Folder ID</h2>
          <p className="text-gray-500">Cannot create a note without a folder</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => router.push("/folders")}
          >
            Go to Folders
          </Button>
        </div>
      </div>
    );
  }

  return (
    // TODO: Styling the editor to be full screen and for mobile
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : noteId ? "Update Note" : "Save Note"}
        </Button>
      </div>

      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="[&_h1]:text-4xl [&_h1]:font-bold [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-2xl [&_h3]:font-bold"
      />
    </div>
  );
};

export default RichTextEditor;
