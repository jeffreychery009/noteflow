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
import React from "react";

import type { Friend } from "@/hooks/useFriends";
import type { OnlineUser } from "@/hooks/useOnlineUsers";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type TabsCompProps = {
  itemType: "folder" | "note";
  friends: Friend[];
  pendingRequests: { from: Friend }[];
  sentRequests: { from: Friend }[];
  onlineUsers: OnlineUser[];
  selectedUsers: (OnlineUser | Friend)[];
  searchTerm: string;
  activeTab: string;
  friendsLoading: boolean;
  onlineLoading: boolean;
  onSearchChange: (value: string) => void;
  onTabChange: (value: string) => void;
  onUserToggle: (user: OnlineUser | Friend) => void;
  onSendFriendRequest: (username: string) => void;
  onRespondToFriendRequest: (
    username: string,
    status: "accepted" | "rejected"
  ) => void;
};

const TabsComp = ({
  itemType,
  friends,
  pendingRequests,
  sentRequests,
  onlineUsers,
  selectedUsers,
  searchTerm,
  activeTab,
  friendsLoading,
  onlineLoading,
  onSearchChange,
  onTabChange,
  onUserToggle,
  onSendFriendRequest,
  onRespondToFriendRequest,
}: TabsCompProps) => {
  // Filter users based on search term
  const filteredOnlineUsers = onlineUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isUserSelected = (userId: string) => {
    return selectedUsers.some((user) => user._id === userId);
  };

  const renderUserRow = (
    user: OnlineUser | Friend,
    showFriendshipActions = false
  ) => {
    const isSelected = isUserSelected(user._id);
    const isFriend = friends.some((f) => f._id === user._id);
    const isPendingSent = sentRequests.some((r) => r.from._id === user._id);
    const isPendingReceived = pendingRequests.some(
      (r) => r.from._id === user._id
    );

    return (
      <div
        key={user._id}
        className={`p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 ${
          isFriend ? "cursor-pointer" : ""
        } ${isSelected ? "bg-primary/5" : ""}`}
        onClick={() => isFriend && onUserToggle(user)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="size-10">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {user.isOnline ? (
                <div className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
              ) : (
                <div className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-red-500 dark:border-gray-900" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {user.name}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user.isOnline ? (
              <Badge variant="outline" className="rounded-full text-xs">
                Online
              </Badge>
            ) : (
              <Badge variant="outline" className="rounded-full text-xs">
                Offline
              </Badge>
            )}
            {showFriendshipActions ? (
              <div className="flex gap-2">
                {!isFriend && !isPendingSent && !isPendingReceived && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSendFriendRequest(user.username);
                    }}
                    className="rounded-full"
                  >
                    <UserPlus className="mr-1 size-4" />
                    Add Friend
                  </Button>
                )}
                {isPendingSent && (
                  <Badge variant="secondary" className="rounded-full">
                    <Clock className="mr-1 size-3" />
                    Pending
                  </Badge>
                )}
                {isPendingReceived && (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRespondToFriendRequest(user.username, "accepted");
                      }}
                      className="rounded-full px-2"
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRespondToFriendRequest(user.username, "rejected");
                      }}
                      className="rounded-full px-2"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              isFriend && (
                <button
                  className={`rounded-full p-1.5 transition-colors ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUserToggle(user);
                  }}
                >
                  {isSelected ? (
                    <Check className="size-4" />
                  ) : (
                    <UserPlus className="size-4" />
                  )}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Search Input */}
      <div className="px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-gray-200 bg-gray-50 pl-9 dark:border-gray-800 dark:bg-gray-900"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange}>
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="friends" className="text-xs">
              Friends ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="requests" className="text-xs">
              Requests ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="sent" className="text-xs">
              Sent ({sentRequests.length})
            </TabsTrigger>
            <TabsTrigger value="discover" className="text-xs">
              Discover ({onlineUsers.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4 max-h-80 overflow-y-auto border-t border-gray-200 dark:border-gray-800">
          <TabsContent value="friends" className="mt-0">
            {friendsLoading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Users className="mx-auto mb-3 size-12 animate-pulse opacity-50" />
                <p className="text-sm">Loading friends...</p>
              </div>
            ) : filteredFriends.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <UserCheck className="mx-auto mb-3 size-12 opacity-50" />
                <p className="text-sm">No friends found</p>
                <p className="mt-1 text-xs">
                  Add friends to share your {itemType}s with them
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredFriends.map((friend) => renderUserRow(friend))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="requests" className="mt-0">
            {friendsLoading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Users className="mx-auto mb-3 size-12 animate-pulse opacity-50" />
                <p className="text-sm">Loading requests...</p>
              </div>
            ) : pendingRequests.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Send className="mx-auto mb-3 size-12 opacity-50" />
                <p className="text-sm">No pending requests</p>
                <p className="mt-1 text-xs">
                  Friend requests you receive will appear here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {pendingRequests.map((request) =>
                  renderUserRow(request.from, true)
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sent" className="mt-0">
            {friendsLoading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Users className="mx-auto mb-3 size-12 animate-pulse opacity-50" />
                <p className="text-sm">Loading sent requests...</p>
              </div>
            ) : sentRequests.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Clock className="mx-auto mb-3 size-12 opacity-50" />
                <p className="text-sm">No sent requests</p>
                <p className="mt-1 text-xs">
                  Friend requests you send will appear here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {sentRequests.map((request) =>
                  renderUserRow(request.from, true)
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="discover" className="mt-0">
            {onlineLoading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Users className="mx-auto mb-3 size-12 animate-pulse opacity-50" />
                <p className="text-sm">Loading users...</p>
              </div>
            ) : filteredOnlineUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Users className="mx-auto mb-3 size-12 opacity-50" />
                <p className="text-sm">No users found</p>
                <p className="mt-1 text-xs">
                  Try searching with a different term
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredOnlineUsers.map((user) => renderUserRow(user, true))}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TabsComp;
