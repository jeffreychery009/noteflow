import {
  FileText,
  Folder,
  Home,
  Settings,
  Star,
  Trash,
  Users,
  User,
} from "lucide-react";

import { ROUTES } from "@/routes";

export const navLinks = [
  {
    subTitle: "Main",
    links: [
      {
        label: "Home",
        href: ROUTES.HOME_PAGE,
        icon: Home,
      },
      {
        label: "Recent Notes",
        href: ROUTES.NOTES,
        icon: FileText,
      },
      {
        label: "Folders",
        href: ROUTES.FOLDERS,
        icon: Folder,
      },
    ],
  },
  {
    subTitle: "Library",
    links: [
      {
        label: "All Folders",
        href: ROUTES.FOLDERS,
        icon: Folder,
      },
      {
        label: "Shared with me",
        href: ROUTES.SHARED_WITH_ME,
        icon: Users,
      },
      {
        label: "Favorites",
        href: ROUTES.FAVORITES,
        icon: Star,
      },
      {
        label: "Trash",
        href: ROUTES.TRASH,
        icon: Trash,
      },
    ],
  },
  {
    subTitle: "Account",
    links: [
      {
        label: "Profile",
        href: ROUTES.PROFILE,
        icon: User,
      },
      {
        label: "Settings",
        href: ROUTES.SETTINGS,
        icon: Settings,
      },
    ],
  },
];

// Defining the colors for the folders
export const folderColors = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-red-500", label: "Red" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-pink-500", label: "Pink" },
];
