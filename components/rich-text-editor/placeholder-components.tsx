import { Button } from "../ui/button";

export const AIAssistantButton = ({
  editor,
  onInsert,
}: {
  editor: string;
  onInsert: (text: string) => void;
}) => {
  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-violet-600 p-0 shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-violet-700 hover:shadow-xl"
      onClick={() => onInsert("\n\nAI generated content here...")}
    >
      <svg
        className="size-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    </Button>
  );
};

export const NewFolderDialog = ({
  className,
  size,
  onCreateFolder,
}: {
  className?: string;
  size?: string;
  onCreateFolder: (name: string, color: string) => void;
}) => {
  return (
    <Button
      className={className}
      size={size as any}
      onClick={() => onCreateFolder("New Folder", "purple")}
    >
      <svg
        className="mr-2 size-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      New Folder
    </Button>
  );
};

export const ThemeToggle = ({ className }: { className?: string }) => {
  return (
    <Button variant="ghost" size="icon" className={className}>
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </Button>
  );
};
