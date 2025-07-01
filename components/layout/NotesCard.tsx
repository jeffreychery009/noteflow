"use client";

import { Calendar, MoreHorizontal, Trash } from "lucide-react";
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

  const options = [
    {
      title: "Delete",
      icon: <Trash className="size-4" />,
      onClick: onDelete,
    },
  ];

  return (
    <div>
      <div className="min-h-[200px] cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition-shadow duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <h3 className="font-medium">{note.title}</h3>
          <DropdownOptions options={options} />
        </div>
        <div onClick={handleClick}>
          <p
            dangerouslySetInnerHTML={{
              __html: note.content,
            }}
            className="prose dark:prose-invert mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300"
          />
          <div className="mt-4 flex items-center justify-between">
            <span className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="mr-1 size-4" />
              {formatDate(note.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
