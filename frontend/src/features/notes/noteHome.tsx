import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/features/notes/components/SearchBar";
import { useNotes } from "./hooks/useNotes";
import { NoteList } from "./components/NoteList";

export default function Home() {
  const { data: notes = [], isLoading, isError } = useNotes();
  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return notes;

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
  }, [notes, search]);

  return (
    <>
      <Header />

      <main className="mx-auto container mx-auto space-y-6 p-6">
        <SearchBar value={search} onChange={setSearch} />

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

        {!isLoading &&
          !isError &&
          notes.length > 0 &&
          (filteredNotes.length > 0 ? (
            <NoteList notes={filteredNotes} />
          ) : (
            <p className="text-muted-foreground">
              No notes match your search.
            </p>
          ))}
      </main>
    </>
  );
}