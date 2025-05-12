export type Note = {
  _id: string;
  title: string;
  content: string;
  owner: string;
  folder: string;
  createdAt: string;
  updatedAt: string;
};

export interface NoteData {
  success: boolean;
  data: Note[];
}

export const noteFetcher = async (url: string): Promise<NoteData> => {
  const response = await fetch(url);
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || "Failed to fetch notes");
  }
  return data;
};
