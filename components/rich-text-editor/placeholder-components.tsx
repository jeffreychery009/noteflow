import { X, Send, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";

import Chatbox from "../chat-box/chatbox";
import { Button } from "../ui/button";

export const AIAssistantButton = ({
  editor,
  onInsert,
}: {
  editor: string;
  onInsert: (text: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hi! I'm your AI assistant. How can I help you with your notes today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        type: "ai" as const,
        content: `I understand you said: ${inputValue}. Here's how I can help...`,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Chatbox isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Toggle Button - Only show when chat is closed */}
      {!isOpen && (
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-violet-600 p-0 shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-violet-700 hover:shadow-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Sparkles className="size-6 text-white" />
        </Button>
      )}
    </>
  );
};

export const NewFolderDialog = ({
  className,
  size,
  onCreateFolder,
}: {
  className?: string;
  size?: string;
  onCreateFolder: (name: string, color: string) => void;
}) => {
  return (
    <Button
      className={className}
      size={size as any}
      onClick={() => onCreateFolder("New Folder", "purple")}
    >
      <svg
        className="mr-2 size-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      New Folder
    </Button>
  );
};

export const ThemeToggle = ({ className }: { className?: string }) => {
  return (
    <Button variant="ghost" size="icon" className={className}>
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </Button>
  );
};
