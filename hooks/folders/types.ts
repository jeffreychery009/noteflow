export type Folder = {
  _id: string;
  title: string;
  notes: string[];
  itemCount: number;
  createdAt: string;
  updatedAt?: string;
};

export interface FolderData {
  success: boolean;
  data: {
    folders: Folder[];
  };
}

export const folderFetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (!json.success) throw new Error(json.message || "API Error");
      return json as FolderData;
    });
