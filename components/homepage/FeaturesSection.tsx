"use client";

import { FileText, CheckSquare, Calendar } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Organization",
    description:
      "Organize your notes with folders, tags, and smart categorization that adapts to your workflow.",
    bgColor: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description:
      "Turn your notes into actionable tasks with built-in to-do lists and progress tracking.",
    bgColor: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    icon: Calendar,
    title: "Daily Insights",
    description:
      "Get daily quotes, reminders, and insights to keep you motivated and productive.",
    bgColor: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

export default function FeaturesSection() {
  return (
    <div className="mb-32 grid grid-cols-1 gap-8 md:grid-cols-3">
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          <div
            className={`mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl ${feature.bgColor}`}
          >
            <feature.icon className={`size-8 ${feature.iconColor}`} />
          </div>
          <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
