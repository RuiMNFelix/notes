import { useState } from "react";
import { useCreateNote } from "../hooks/useCreateNote";
import { Plus } from "lucide-react";
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
import { getErrorMessage } from "../api";
import { Textarea } from "@/components/ui/textarea";

export function CreateNoteDialog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useCreateNote();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      await mutateAsync({
        title: title.trim(),
        content: content.trim(),
      });
      setTitle("");
      setContent("");

      setOpen(false);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Error creating note."));
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Note
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Note</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 pb-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter className="flex-col gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Note"}
              </Button>
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
