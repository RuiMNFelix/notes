import client from "@/shared/api/client";

interface NoteRequest {
  title: string;
  content: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const getErrorMessage = (err: any, fallback: string): string => {
  const data = err?.response?.data;

  if (typeof data === 'string') return data;

  if (data?.errors && typeof data.errors === 'object') {
    const firstError = Object.values(data.errors)[0];
    if (Array.isArray(firstError) && typeof firstError[0] === 'string') {
      return firstError[0];
    }
  }

  return fallback;
};

export const createNote = async (data: NoteRequest): Promise<void> => {
  await client.post<void>("/notes", data);
}

export const getNotes = async (): Promise<Note[]> => {
  const response = await client.get<Note[]>("/notes");
  return response.data;
}

export const updateNote = async (id: string, data: NoteRequest): Promise<void> => {
  await client.put<void>(`/notes/${id}`, data);
}

export const deleteNote = async (id: string): Promise<void> => {
  await client.delete<void>(`/notes/${id}`);
}