import type { Note } from "@/features/notes/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="cursor-pointer transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{note.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {note.content}
        </p>
      </CardContent>
    </Card>
  );
}