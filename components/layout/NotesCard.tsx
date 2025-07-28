"use client";

import { Calendar, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { formatDate } from "@/lib/formatDate";

import DropdownOptions from "../dropdown/DropdownOptions";

interface NotesCardProps {
  note: any;
  onDelete: () => void;
}

const NotesCard = ({ note, onDelete }: NotesCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/new?noteId=${note._id}&folderId=${note.folder}`);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const options = [
    {
      title: "Delete",
      icon: <Trash className="size-4" />,
      onClick: onDelete,
    },
  ];

  return (
    <div
      className="cursor-pointer rounded-3xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
      onClick={handleClick}
    >
      <div className="mb-4 flex items-start justify-between">
        <h3 className="line-clamp-2 text-xl font-semibold text-gray-900 dark:text-white">
          {note.title}
        </h3>
        <div onClick={handleDropdownClick}>
          <DropdownOptions options={options} />
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: note.content,
        }}
        className="mb-6 line-clamp-4 leading-relaxed text-gray-600 dark:text-gray-300"
      />

      {note.tags && note.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {note.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-full border border-purple-200 bg-gradient-to-r from-purple-100 to-violet-100 px-3 py-1 text-xs text-purple-700 dark:border-purple-700 dark:from-purple-900/30 dark:to-violet-900/30 dark:text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="mr-2 size-4" />
          {formatDate(note.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default NotesCard;
