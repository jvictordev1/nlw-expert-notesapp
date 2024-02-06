export function NoteCard() {
  return (
    <button className="rounded-md transition flex flex-col text-left p-5 bg-slate-800 text-sm space-y-3 relative overflow-hidden outline-none hover:ring-2 hover:ring-slate-800 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="font-medium text-slate-300">há 4 dias</span>
      <p className="leading-6 text-slate-400">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
        pariatur quis nisi optio in sit autem quas totam aliquam ab. Quidem
        veniam quibusdam corporis quo culpa rerum totam porro mollitia.
      </p>
      <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/40 to-black/0 pointer-events-none" />
    </button>
  );
}
