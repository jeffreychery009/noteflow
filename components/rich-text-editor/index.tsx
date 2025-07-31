"use client";

import {
  ArrowLeft,
  FileText,
  Save,
  Share,
  MoreHorizontal,
  Palette,
  Type,
  ImageIcon,
  Menu,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { EditorSidebar } from "./editor-sidebar";
import { NoteEditor } from "./note-editor";
import { AIAssistantButton } from "./placeholder-components";

export default function NewNotePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Get folder ID and note ID from URL parameters
  const folderId = searchParams.get("folder") || searchParams.get("folderId");
  const noteId = searchParams.get("noteId");

  // Load existing note data if noteId is provided
  useEffect(() => {
    const loadNote = async () => {
      if (noteId) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/notes/${noteId}`);
          if (response.ok) {
            const result = await response.json();
            const note = result.data;
            setTitle(note.title || "");
            setContent(note.content || "");
          } else {
            console.error("Failed to load note");
          }
        } catch (error) {
          console.error("Error loading note:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadNote();
  }, [noteId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const noteData = {
        title: title || "Untitled Note",
        content: content,
        folderId: folderId,
        tags: [],
      };

      console.log("Saving note with data:", noteData);

      const url = noteId ? `/api/notes/${noteId}` : "/api/notes";
      const method = noteId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `Failed to save note: ${response.status} - ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Note saved successfully:", result);

      // Redirect to the folder page - use the actual folder ID from the response
      const redirectFolderId = folderId || result.data.folder;
      router.push(`/folders/${redirectFolderId}`);
    } catch (error) {
      console.error("Error saving note:", error);
      // Show error to user (you might want to add a toast notification system)
      alert(error instanceof Error ? error.message : "Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    console.log("Sharing note:", { title, content });
  };

  const handleCreateFolder = (name: string, color: string) => {
    console.log("Creating folder:", { name, color });
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      {/* Desktop Sidebar - with smooth animation */}
      <div
        className={`hidden border-r border-gray-200 transition-all duration-300 ease-in-out md:block dark:border-gray-800 ${
          sidebarVisible
            ? "opacity-100 md:w-80"
            : "overflow-hidden opacity-0 md:w-0"
        }`}
      >
        <EditorSidebar onCreateFolder={handleCreateFolder} />
      </div>

      {/* Main Editor Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="shrink-0 border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-10 rounded-full"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] p-0">
                  <EditorSidebar
                    onCreateFolder={(name, color) => {
                      handleCreateFolder(name, color);
                      setSidebarOpen(false);
                    }}
                  />
                </SheetContent>
              </Sheet>

              {/* Desktop sidebar toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hidden size-10 rounded-full hover:bg-gray-100 md:flex dark:hover:bg-gray-800"
              >
                {sidebarVisible ? (
                  <PanelLeftClose className="size-5" />
                ) : (
                  <PanelLeft className="size-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="size-5" />
              </Button>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-500 p-2 shadow-lg">
                  <FileText className="size-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  veltnote
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="rounded-full border-gray-200 bg-white/50 backdrop-blur-sm hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800"
              >
                <Share className="mr-2 size-4" />
                Share
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-full bg-purple-500 text-white shadow-lg transition-all duration-200 hover:bg-purple-600 hover:shadow-xl"
              >
                <Save className="mr-2 size-4" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <MoreHorizontal className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Palette className="mr-2 size-4" />
                    Change theme
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Type className="mr-2 size-4" />
                    Font settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ImageIcon className="mr-2 size-4" />
                    Insert image
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Delete note
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Editor Container - Full Height */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-gray-900">
          {/* Title Section - More Natural */}
          <div className="mx-auto w-full max-w-4xl shrink-0 px-12 pb-6 pt-12">
            <div
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setTitle(e.currentTarget.textContent || "")}
              className="h-auto border-none bg-transparent p-0 font-['Arial'] text-6xl font-bold leading-tight text-gray-900 outline-none focus:outline-none dark:text-white"
              style={{ minHeight: "1.2em" }}
            >
              {title || "Untitled"}
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
              <span>Just now</span>
              <span>•</span>
              <span>0 words</span>
            </div>
          </div>

          {/* Editor Section - Takes remaining height */}
          <div className="flex-1 overflow-hidden">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-400">
                    Loading note...
                  </div>
                  <div className="mx-auto size-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
                </div>
              </div>
            ) : (
              <NoteEditor content={content} onChange={setContent} />
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Button */}
      <AIAssistantButton
        editor={content}
        onInsert={(text) => setContent((prev) => prev + text)}
      />
    </div>
  );
}
