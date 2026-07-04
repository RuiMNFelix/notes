import type { Note } from "@/features/notes/api";
import { NoteCard } from "./Notecard";

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
