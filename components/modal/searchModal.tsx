import {
  Check,
  Clock,
  Search,
  Send,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { useFriends } from "@/hooks/useFriends";
import type { Friend } from "@/hooks/useFriends";
import { useOnlineUsers } from "@/hooks/useOnlineUsers";
import type { OnlineUser } from "@/hooks/useOnlineUsers";

import TabsComp from "../tabs/Tabs";
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
  const [selectedUsers, setSelectedUsers] = useState<(OnlineUser | Friend)[]>(
    []
  );
  const [activeTab, setActiveTab] = useState("friends");
  const { onlineUsers, loading: onlineLoading } = useOnlineUsers();
  const {
    friends,
    pendingRequests,
    sentRequests,
    loading: friendsLoading,
    sendFriendRequest,
    respondToFriendRequest,
  } = useFriends();

  const handleUserToggle = (user: OnlineUser | Friend) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[600px]">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            Share {itemType}
          </DialogTitle>
          <DialogDescription>
            Share &quot;{itemName}&quot; with your friends. You can only share
            with users who are in your friends list.
          </DialogDescription>
        </DialogHeader>

        {/* Selected Users */}
        {selectedUsers.length > 0 && (
          <div className="px-6 pb-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Selected users:
              </span>
              <Badge variant="secondary" className="rounded-full">
                {selectedUsers.length}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary"
                >
                  <Avatar className="size-5">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                  <button
                    className="ml-1 rounded-full p-0.5 hover:bg-primary/10"
                    onClick={() => handleUserToggle(user)}
                  >
                    <span className="sr-only">Remove {user.name}</span>
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <TabsComp
          itemType={itemType}
          friends={friends}
          pendingRequests={pendingRequests}
          sentRequests={sentRequests}
          onlineUsers={onlineUsers}
          selectedUsers={selectedUsers}
          searchTerm={searchTerm}
          activeTab={activeTab}
          friendsLoading={friendsLoading}
          onlineLoading={onlineLoading}
          onSearchChange={setSearchTerm}
          onTabChange={setActiveTab}
          onUserToggle={handleUserToggle}
          onSendFriendRequest={sendFriendRequest}
          onRespondToFriendRequest={respondToFriendRequest}
        />

        <div className="border-t border-gray-200 bg-gray-50 p-6 pt-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedUsers.length > 0 ? (
                <span>
                  {selectedUsers.length} friend
                  {selectedUsers.length !== 1 ? "s" : ""} selected
                </span>
              ) : (
                <span>Select friends to share with</span>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                disabled={selectedUsers.length === 0}
                className="rounded-full"
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
