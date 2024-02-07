import * as Dialog from "@radix-ui/react-dialog";
import { Circle } from "lucide-react";

export function NewNoteCard() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col outline-none transition p-5 bg-slate-700 text-sm text-left space-y-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="font-medium text-slate-200">Adicionar nota</span>
        <p className="leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50">
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[70vh] overflow-hidden bg-slate-700 outline-none flex flex-col rounded-md">
            <Dialog.Close className="absolute right-0 top-0 bg-red-500 rounded-full m-2">
              <Circle className="text-red-500 size-5" />
            </Dialog.Close>
            <div className="flex flex-col flex-1 p-5 gap-5">
              <span className="font-medium text-slate-300">
                Create a new note
              </span>
              <p className="leading-6 text-slate-400">
                Start by{" "}
                <button className="text-md text-lime-400 hover:underline">
                  recording
                </button>{" "}
                or{" "}
                <button className="text-md text-lime-400 hover:underline">
                  typing
                </button>{" "}
                your note.
              </p>
            </div>
            <button
              type="button"
              className="py-3 bg-lime-500 text-center text-sm outline-none hover:bg-lime-600 transition-all duration-200 ease-in hover:text-base"
            >
              Save this note
            </button>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
