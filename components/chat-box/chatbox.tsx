import {
  MessageCircle,
  Send,
  X,
  History,
  MessageSquare,
  Plus,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import { useAIChat } from "../../hooks/useAIChat";
import { Button } from "../ui/button";

interface ChatboxProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Chatbox = ({ isOpen, setIsOpen }: ChatboxProps) => {
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "history">("chat");

  const {
    messages,
    conversations,
    currentConversationId,
    isLoading,
    error,
    sendMessage,
    createNewConversation,
    loadConversation,
    refreshConversations,
    aiToken,
  } = useAIChat();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (inputValue.trim() && aiToken) {
      await sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div
      className={`fixed bottom-20 right-6 z-50 w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-900 ${
        isOpen
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-95 opacity-0"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 p-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="size-5 text-white" />
          <div className="flex flex-col">
            <span className="text-sm font-light text-white">
              Juno AI Assistant
            </span>
            {currentConversationId && (
              <span className="text-xs text-purple-200">
                Continuing conversation
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === "chat" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (messages.length > 0 && currentConversationId) {
                  // Show confirmation toast with action
                  toast("Start new chat?", {
                    description:
                      "Your current conversation will be saved to history.",
                    action: {
                      label: "Start New",
                      onClick: () => {
                        createNewConversation();
                        toast.success("New chat started", {
                          description:
                            "Your previous conversation has been saved to history.",
                        });
                      },
                    },
                  });
                } else {
                  createNewConversation();
                  toast.success("New chat started", {
                    description: "Ready to start a fresh conversation!",
                  });
                }
              }}
              disabled={messages.length === 0}
              className="size-8 p-0 text-white transition-colors duration-200 hover:bg-white/20 disabled:opacity-50"
              title="New Chat"
            >
              <Plus className="size-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("chat")}
            className={`size-8 p-0 text-white transition-colors duration-200 hover:bg-white/20 ${
              activeTab === "chat" ? "bg-white/20" : ""
            }`}
          >
            <MessageSquare className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveTab("history");
              // Refresh conversations when switching to history tab
              if (aiToken) {
                refreshConversations();
              }
            }}
            className={`size-8 p-0 text-white transition-colors duration-200 hover:bg-white/20 ${
              activeTab === "history" ? "bg-white/20" : ""
            }`}
          >
            <History className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="size-8 p-0 text-white transition-colors duration-200 hover:bg-white/20"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 space-y-3 overflow-y-auto p-4 dark:bg-gray-900">
        {activeTab === "chat" ? (
          <>
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <MessageCircle className="mx-auto mb-2 size-8" />
                  <p className="text-sm">
                    {currentConversationId
                      ? "Continue your conversation"
                      : "Start a new conversation with Juno AI"}
                  </p>
                  {currentConversationId && (
                    <p className="mt-1 text-xs text-gray-400">
                      Conversation ID: {currentConversationId.slice(0, 8)}...
                    </p>
                  )}
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 transition-all duration-200 ${
                    message.role === "user"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2 text-gray-900 dark:bg-gray-700 dark:text-white">
                  <div className="flex items-center gap-2">
                    <div className="size-2 animate-bounce rounded-full bg-gray-400"></div>
                    <div
                      className="size-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="size-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-red-100 px-4 py-2 text-red-700 dark:bg-red-900 dark:text-red-300">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-2">
            {!conversations || conversations.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <History className="mx-auto mb-2 size-8" />
                  <p className="text-sm">No conversation history yet</p>
                  <p className="mt-1 text-xs">
                    Start a new conversation to see it here
                  </p>
                </div>
              </div>
            ) : (
              conversations?.map((conversation) => (
                <div
                  key={conversation.id}
                  className="cursor-pointer rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  onClick={async () => {
                    await loadConversation(conversation.id);
                    setActiveTab("chat");
                  }}
                >
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {conversation.title || "Untitled Conversation"}
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {conversation.createdAt
                      ? new Date(conversation.createdAt).toLocaleDateString()
                      : "Unknown date"}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Input */}
      {activeTab === "chat" && (
        <div className="rounded-b-2xl border-t border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading || !aiToken}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
            />
            <Button
              onClick={handleSend}
              size="sm"
              disabled={isLoading || !aiToken || !inputValue.trim()}
              className="rounded-lg bg-purple-500 px-3 py-2 text-white transition-colors duration-200 hover:bg-purple-600 disabled:opacity-50"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
