import type { Note } from "@/features/notes/api";
import { UpdateNoteDialog } from "./UpdateNoteDialog";

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <UpdateNoteDialog
          key={note.id}
          noteId={note.id}
          title={note.title}
          content={note.content}
        />
      ))}
    </div>
  );
}
