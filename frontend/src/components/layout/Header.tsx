import { NotebookPen } from "lucide-react";
import { CreateNoteDialog } from "@/features/notes/components/CreateNoteDialog";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <NotebookPen className="h-6 w-6" />
          <h1 className="text-xl font-bold">Notes</h1>
        </div>

        <CreateNoteDialog />
      </div>
    </header>
  );
}