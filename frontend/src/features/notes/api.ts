import client from "@/shared/api/client";

export interface NoteRequest {
  title: string;
  content: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const createNote = async (data: NoteRequest): Promise<void> => {
  await client.post<void>("/notes", data);
}

export const getNotes = async (): Promise<Note[]> => {
  const response = await client.get<Note[]>("/notes");
  return response.data;
}

export const updateNote = async (id: number, data: NoteRequest): Promise<void> => {
  await client.put<void>(`/notes/${id}`, data);
}

export const deleteNote = async (id: number): Promise<void> => {
  await client.delete<void>(`/notes/${id}`);
}