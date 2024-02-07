import logo from "./assets/logo-nlw.svg";
import { NewNoteCard } from "./components/New-note-card";
import { NoteCard } from "./components/Note-card";
const note = {
  date: new Date(),
  content: 'Hello world',
}
export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img className="w-44" src={logo} alt="NLW logo" />
      <form className="w-full">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none"
          type="text"
          placeholder="Search in your notes..."
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard/>
        <NoteCard note={note} />
      </div>
    </div>
  );
}
