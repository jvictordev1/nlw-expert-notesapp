import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Circle } from "lucide-react";
import { useState } from "react";
interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const [isShowing, setIsShowing] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNoteDeleted = (id: string) => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsDialogOpen(false);
    }, 400);
    setIsShowing(false);
    setTimeout(() => {
      onDelete(id);
    }, 600);
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsDialogOpen(false);
    }, 400);
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={handleDialogOpen}>
      <AnimatePresence>
        {isShowing && (
          <motion.div
            key={note.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: [1, 0], y: -120 }}
            transition={{ duration: 0.5 }}
          >
            <Dialog.Trigger className="size-full rounded-md transition flex flex-col p-5 bg-slate-800 text-sm gap-3 relative overflow-hidden outline-none hover:ring-2 hover:ring-slate-800 focus-visible:ring-2 focus-visible:ring-lime-400">
              <span className="font-medium text-slate-300">
                {formatDistanceToNow(note.date, { addSuffix: true })}
              </span>
              <p className="leading-6 text-justify break-words text-slate-400 h-full max-w-full">
                {note.content}
              </p>
              <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/40 to-black/0 pointer-events-none" />
            </Dialog.Trigger>
          </motion.div>
        )}
      </AnimatePresence>
      <Dialog.Portal>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-4/5 h-[50vh] md:h-[70vh] overflow-hidden bg-slate-700 outline-none flex flex-col rounded-md md:w-full">
                <button
                  onClick={handleModalClose}
                  className="absolute right-0 top-0 bg-red-500 rounded-full m-2"
                >
                  <Circle className="text-red-500 size-5" />
                </button>
                <div className="flex flex-col flex-1 p-5 gap-5 h-1/2">
                  <span className="font-medium text-slate-300">
                    {formatDistanceToNow(note.date, {
                      addSuffix: true,
                    })}
                  </span>
                  <div className="overflow-auto px-3">
                    <p className="leading-6 break-words text-justify text-slate-400">
                      {note.content}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleNoteDeleted(note.id)}
                  type="button"
                  className="py-3 bg-red-500 text-center text-sm outline-none hover:bg-red-600 transition-all duration-200 ease-in hover:text-base"
                >
                  Delete this note
                </button>
              </Dialog.Content>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
