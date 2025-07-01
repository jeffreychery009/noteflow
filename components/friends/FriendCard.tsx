import React from "react";

interface FriendCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    mutualFriends: number;
    online: boolean;
  };
}

const FriendCard: React.FC<FriendCardProps> = ({ user }) => {
  return (
    <div className="relative flex min-w-0 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Avatar and status */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex size-14 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-400">
            {/* Placeholder avatar */}
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" fill="#e5e7eb" />
              <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#e5e7eb" />
            </svg>
          </div>
          {user.online && (
            <span className="absolute bottom-1 right-1 size-3 rounded-full border-2 border-white bg-green-500" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              {user.name}
            </span>
            {user.online && (
              <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-green-600">
                Online
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">{user.email}</div>
          <div className="mt-1 text-xs text-gray-400">
            {user.mutualFriends} mutual friends
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="mt-2 flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-base font-medium transition hover:bg-blue-50">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M2 21l21-9-9 21-2-8-8-2z" fill="currentColor" />
          </svg>
          Message
        </button>
        <button className="flex size-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="19" cy="12" r="2" fill="currentColor" />
            <circle cx="5" cy="12" r="2" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
