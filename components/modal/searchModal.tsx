import { Check, SearchIcon, UserPlus, Users } from "lucide-react";
import { Types } from "mongoose";
import React, { useState } from "react";

import User from "@/lib/models/user";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface UserType {
  _id: string;
  name: string;
  image?: string;
  isOnline?: boolean;
}

type SearchModalProps = {
  itemType: "folder" | "note";
  itemName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SearchModal = ({
  itemType,
  itemName,
  open,
  onOpenChange,
}: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

  const isUserSelected = (userId: string) => {
    return selectedUsers.includes(userId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[500px]">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            Share {itemType}
          </DialogTitle>
          <DialogDescription>
            Share &quot;{itemName}&quot; with other users. They&apos;ll be able
            to view and edit this {itemType}.
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-6 pb-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="pl-9"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="max-h-80 overflow-y-auto border-t border-gray-200 dark:border-gray-800">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Users className="mx-auto mb-3 size-12 opacity-50" />
              <p className="text-sm">No users found</p>
              <p className="mt-1 text-xs">
                Try searching with a different term
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredUsers.map((user) => {
                const isSelected = isUserSelected(user._id);
                return (
                  <div
                    key={user._id}
                    className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 ${isSelected ? "bg-primary/5 dark:bg-primary/10" : ""}`}
                    onClick={() => console.log(user)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="size-10">
                            <AvatarImage
                              src={user.image || ""}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {user.isOnline && (
                            <Badge
                              variant="outline"
                              className="rounded-full text-xs"
                            >
                              Online
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 p-0"
                          >
                            {isSelected ? (
                              <Check className="size-4" />
                            ) : (
                              <UserPlus className="size-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-6 pt-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedUsers.length > 0 ? (
                <span>
                  {selectedUsers.length} user
                  {selectedUsers.length !== 1 ? "s" : ""} selected
                </span>
              ) : (
                <span>Select users to share with</span>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-full">
                Cancel
              </Button>
              <Button
                size="sm"
                className="rounded-full"
                disabled={selectedUsers.length === 0}
              >
                Share {itemType}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
