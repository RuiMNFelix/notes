import { NoteForm } from "./NoteDialog";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { useDeleteNote } from "../hooks/useDeleteNote";

type UpdateNoteDialogProps = {
  noteId: number;
  title: string;
  content: string;
};

export function UpdateNoteDialog({
  noteId,
  title,
  content,
}: UpdateNoteDialogProps) {
  const { mutateAsync: updateNote, isPending: isUpdating } = useUpdateNote();
  const { mutateAsync: deleteNote, isPending: isDeleting } = useDeleteNote();

  return (
    <NoteForm
      mode="edit"
      dialogTrigger={
        <button
          className="w-full text-left rounded-2xl border border-border bg-card p-5 
               transition-shadow hover:shadow-[var(--shadow)] cursor-pointer"
        >
          <h3 className="text-lg font-medium text-card-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {content}
          </p>
        </button>
      }
      initialTitle={title}
      initialContent={content}
      isSubmitting={isUpdating}
      onSubmit={async (data) => {
        await updateNote({ id: noteId, ...data });
      }}
      isDeleting={isDeleting}
      onDelete={async () => {
        await deleteNote(noteId);
      }}
    />
  );
}
