import { ChangeEvent, useState } from "react";
import logo from "./assets/logo-nlw.svg";
import { NewNoteCard } from "./components/New-note-card";
import { NoteCard } from "./components/Note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const storagedNotes = localStorage.getItem("notes");
    if (storagedNotes) {
      return JSON.parse(storagedNotes);
    }
    return [];
  });
  const [search, setSearch] = useState("");

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content,
    };
    const currentNotes = [newNote, ...notes];
    setNotes(currentNotes);
    localStorage.setItem("notes", JSON.stringify(currentNotes));
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
  };
  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img className="w-44" src={logo} alt="NLW logo" />
      <form className="w-full">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none"
          type="text"
          placeholder="Search in your notes..."
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard
          onNoteCreation={(content: string) => onNoteCreated(content)}
        />
        {filteredNotes.map((note) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
