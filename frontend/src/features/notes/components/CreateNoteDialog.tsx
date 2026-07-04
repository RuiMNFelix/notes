import { NoteForm } from "./NoteDialog";
import { useCreateNote } from "../hooks/useCreateNote";
import { Button } from "@/components/ui/button";
import { Plus} from "lucide-react";

export function CreateNoteDialog() {
  const { mutateAsync, isPending } = useCreateNote();

  return (
    <NoteForm
      mode="create"
      dialogTrigger={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      }
      isSubmitting={isPending}
      onSubmit={async (data) => {
        await mutateAsync(data);
      }}
    />
  );
}