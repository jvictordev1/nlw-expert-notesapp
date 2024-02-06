export function NewNoteCard() {
  return (
    <button className="rounded-md flex flex-col outline-none transition p-5 bg-slate-700 text-sm text-left space-y-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="font-medium text-slate-200">Adicionar nota</span>
      <p className="leading-6 text-slate-400">
        Grave uma nota em áudio que será convertida para texto automaticamente.
      </p>
    </button>
  );
}
