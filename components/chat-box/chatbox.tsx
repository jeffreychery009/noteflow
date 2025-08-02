import { MessageCircle, Send, X } from "lucide-react";
import React, { useState } from "react";

import { Button } from "../ui/button";

interface ChatboxProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Chatbox = ({ isOpen, setIsOpen }: ChatboxProps) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { id: number; type: string; content: string }[]
  >([]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = async () => {
    if (inputValue.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: inputValue,
      };

      setMessages((prev) => [...prev, userMessage]);
      const userInput = inputValue;
      setInputValue("");

      try {
        const response = await fetch(
          "https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_message: userInput }),
          }
        );
        const data = await response.json();
        const aiMessage = {
          id: messages.length + 2,
          type: "ai" as const,
          content: data.response,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
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
          <span className="text-sm font-light text-white">
            Juno AI Assistant
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="size-8 p-0 text-white transition-colors duration-200 hover:bg-white/20"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="h-96 space-y-3 overflow-y-auto p-4 dark:bg-gray-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 transition-all duration-200 ${
                message.type === "user"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="rounded-b-2xl border-t border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
          />
          <Button
            onClick={handleSend}
            size="sm"
            className="rounded-lg bg-purple-500 px-3 py-2 text-white transition-colors duration-200 hover:bg-purple-600"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
