import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { Circle } from "lucide-react";
interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  },
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="size-full rounded-md transition flex flex-col p-5 bg-slate-800 text-sm gap-3 relative overflow-hidden outline-none hover:ring-2 hover:ring-slate-800 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="font-medium text-slate-300">
          {formatDistanceToNow(note.date, { addSuffix: true })}
        </span>
        <p className="leading-6 text-slate-400">{note.content}</p>
        <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/40 to-black/0 pointer-events-none" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-4/5 h-[50vh] md:h-[70vh] overflow-hidden bg-slate-700 outline-none flex flex-col rounded-md md:w-full">
          <Dialog.Close className="absolute right-0 top-0 bg-red-500 rounded-full m-2">
            <Circle className="text-red-500 size-5" />
          </Dialog.Close>
          <div className="flex flex-col flex-1 p-5 gap-5">
            <span className="font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                addSuffix: true,
              })}
            </span>
            <p className="leading-6 text-slate-400">{note.content}</p>
          </div>
          <button onClick={() => onDelete(note.id)} type="button" className="py-3 bg-red-500 text-center text-sm outline-none hover:bg-red-600 transition-all duration-200 ease-in hover:text-base">
            Delete this note
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
