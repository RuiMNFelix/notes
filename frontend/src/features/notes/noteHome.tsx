import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/features/notes/components/SearchBar";
import { useNotes } from "./hooks/useNotes";
import { NoteList } from "./components/NoteList";

export default function Home() {
  const { data: notes = [], isLoading, isError } = useNotes();
  return (
    <>
      <Header />

      <main className="mx-auto container mx-auto space-y-6 p-6">
        <SearchBar />

        {isLoading && <p>Loading notes...</p>}

        {isError && (
          <p className="text-destructive">
            An error occurred while loading the notes.
          </p>
        )}

        {!isLoading && !isError && notes.length === 0 && (
          <p className="text-muted-foreground">
            You don't have any notes yet.
          </p>
        )}

        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}
      </main>
    </>
  );
}