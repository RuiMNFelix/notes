import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input.js";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { Textarea } from "@/components/ui/textarea";

type NoteFormProps = {
  mode: "create" | "edit";
  dialogTrigger: React.ReactNode;
  initialTitle?: string;
  initialContent?: string;
  isSubmitting: boolean;
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  onDelete?: () => Promise<void>;
  isDeleting?: boolean;
};

export function NoteForm({
  mode,
  dialogTrigger,
  initialTitle = "",
  initialContent = "",
  isSubmitting,
  onSubmit,
  onDelete,
  isDeleting,
}: NoteFormProps) {
  const [formTitle, setTitle] = useState(initialTitle);
  const [formContent, setContent] = useState(initialContent);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formTitle.trim() || !formContent.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      await onSubmit({
        title: formTitle.trim(),
        content: formContent.trim(),
      });

      if (mode === "create") {
        setTitle("");
        setContent("");
      }
      setOpen(false);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong. Please try again."));
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }

    setError("");
    try {
      await onDelete();
      setOpen(false);
    } catch (err: unknown) {
      setError(
        getErrorMessage(err, "Could not delete note. Please try again."),
      );
      setConfirmingDelete(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setTitle(initialTitle);
      setContent(initialContent);
      setError("");
    }
    setOpen(next);
  };

  const Icon = mode === "create" ? Plus : Pencil;

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Icon className="h-6 w-6" />
                <h3 className="text-xxl font-bold">
                  {mode === "create" ? "New Note" : "Edit Note"}
                </h3>
              </div>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 pb-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={formTitle}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formContent}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter className="flex-col gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? mode === "create"
                    ? "Creating..."
                    : "Saving..."
                  : mode === "create"
                    ? "Create Note"
                    : "Save Changes"}
              </Button>
              {mode === "edit" && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting
                    ? "Deleting..."
                    : confirmingDelete
                      ? "Click again to confirm"
                      : "Delete Note"}
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
