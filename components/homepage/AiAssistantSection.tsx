"use client";

import {
  ArrowRight,
  Sparkles,
  Brain,
  MessageCircle,
  Zap,
  Bot,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const aiFeatures = [
  {
    icon: Brain,
    title: "Smart Summarization",
    description:
      "Juno can instantly summarize your long notes, meeting transcripts, and documents into key points and actionable insights.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: MessageCircle,
    title: "Writing Assistant",
    description:
      "Get help with writing, grammar, tone, and structure. Juno helps you express your ideas clearly and professionally.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Zap,
    title: "Quick Actions",
    description:
      "Extract action items, create to-do lists, generate outlines, and organize your thoughts with simple commands.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Bot,
    title: "Context Aware",
    description:
      "Juno understands your notes and provides relevant suggestions, connections, and insights based on your content.",
    gradient: "from-orange-500 to-red-600",
  },
];

const aiChatMessages = [
  {
    role: "assistant",
    content:
      "Hi! I'm Juno, your AI note-taking assistant. How can I help you today?",
  },
  { role: "user", content: "Can you help me summarize my meeting notes?" },
  {
    role: "assistant",
    content:
      "I can analyze your meeting notes and create a concise summary with key points, action items, and decisions made. Just share your notes with me!",
  },
];

export default function AiAssistantSection() {
  return (
    <div className="mt-48">
      <div className="mb-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 dark:from-purple-900/30 dark:to-pink-900/30">
          <Sparkles className="size-5 text-purple-600 dark:text-purple-400" />
          <span className="font-medium text-purple-600 dark:text-purple-400">
            Powered by AI
          </span>
        </div>
        <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          Meet Juno, Your AI Assistant
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
          Juno is your intelligent note-taking companion that helps you write
          better, organize smarter, and never miss important details.
        </p>
      </div>

      <div className="mb-24 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="space-y-10">
          {aiFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div
                className={`shrink-0 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 shadow-lg`}
              >
                <feature.icon className="size-6 text-white" />
              </div>
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                  <Sparkles className="size-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Juno AI Assistant
                  </h3>
                  <p className="text-sm text-purple-100">
                    Always ready to help
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="size-3 animate-pulse rounded-full bg-green-400"></div>
                </div>
              </div>
            </div>

            <div className="max-h-80 space-y-4 overflow-y-auto p-6">
              {aiChatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-3 lg:max-w-md ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800">
                <input
                  type="text"
                  placeholder="Ask Juno anything about your notes..."
                  className="flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400"
                  disabled
                />
                <Button
                  size="sm"
                  className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 -top-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 text-white shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />
              <span className="text-sm font-medium">AI Powered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-pink-600 p-10 text-white">
          <h3 className="mb-6 text-2xl font-bold">
            Experience the Future of Note-Taking
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-purple-100">
            Let Juno transform how you capture, organize, and work with your
            ideas. Start your AI-powered productivity journey today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="rounded-full bg-white px-8 py-4 text-purple-600 hover:bg-gray-100"
              >
                Try Juno Now
                <Sparkles className="ml-2 size-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white bg-transparent px-8 py-4 text-white hover:bg-white hover:text-purple-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
