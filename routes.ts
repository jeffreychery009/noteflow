export const ROUTES = {
  HOME: "/",
  HOME_PAGE: "/home",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FOLDERS: "/folders",
  FOLDER_DETAILS: (id: string) => `/folders/${id}`,
  NOTES: "/notes",
  NOTE_DETAILS: (id: string) => `/notes/${id}`,
  SHARED_WITH_ME: "/shared-with-me",
  FAVORITES: "/favorites",
  TRASH: "/trash",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  FRIENDS: "/friends",
};
