import * as Dialog from "@radix-ui/react-dialog";
import { Circle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreation: (content: string) => void;
}
let recognition: SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreation }: NewNoteCardProps) {
  const [shouldShowTextArea, setShouldShowTextArea] = useState(true);
  const [noteContent, setNoteContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleTextArea = () => {
    setShouldShowTextArea(false);
  };
  const handleContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value === "" ? setShouldShowTextArea(true) : "";
    setNoteContent(e.target.value);
  };
  const handleModalClose = () => {
    shouldShowTextArea === false ? setShouldShowTextArea(true) : "";
    setNoteContent("");
    isRecording ? setIsRecording(false) : "";
    setOpenDialog(false);
  };
  const handleNoteCreation = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent === "") {
      toast.error("Note content cannot be empty!", {
        style: { background: "#334155", border: "none", color: "white" },
        duration: 2000,
      });
      return;
    }
    toast.success("Note created!", {
      style: { background: "#334155", border: "none", color: "white" },
      duration: 2000,
    });
    onNoteCreation(noteContent);
    shouldShowTextArea === false ? setShouldShowTextArea(true) : "";
    setNoteContent("");
    setOpenDialog(false);
  };
  const handleStartRecording = () => {
    const isSpeechRecognitionAvailable =
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
    if (!isSpeechRecognitionAvailable) {
      toast.error("Speech recognition is not supported in your browser!", {
        style: { background: "#334155", border: "none", color: "white" },
        duration: 2000,
      });
      setIsRecording(false);
      return;
    }
    const SpeechRecognitionApi =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognitionApi();

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    handleTextArea();
    recognition.onresult = (e) => {
      const transcription = Array.from(e.results).reduce((text, results) => {
        return text.concat(results[0].transcript);
      }, "");
      setNoteContent(transcription);
    };
    recognition.onerror = (e) => {
      console.log(e.error);
    };
    recognition.start();
    setIsRecording(true);
  };
  const handleStopRecording = () => {
    setIsRecording(false);
    recognition ? recognition.stop() : "";
  };
  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Trigger className="rounded-md flex flex-col outline-none transition p-5 bg-slate-700 text-sm text-left space-y-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="font-medium text-slate-200">Add a new note</span>
        <p className="leading-6 text-slate-400">Create a new note</p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50">
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-4/5 h-[50vh] md:h-[70vh] overflow-hidden bg-slate-700 outline-none flex flex-col rounded-md md:w-full">
            <button
              onClick={handleModalClose}
              className="absolute right-0 top-0 bg-red-500 rounded-full m-2"
            >
              <Circle className="text-red-500 size-5" />
            </button>
            <form className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 p-5 gap-5">
                <span className="font-medium text-slate-300">
                  Create a new note
                </span>
                {shouldShowTextArea ? (
                  <p className="leading-6 text-slate-400">
                    Start by{" "}
                    <button
                      onClick={handleStartRecording}
                      type="button"
                      className="text-md text-lime-400 hover:underline"
                    >
                      recording
                    </button>{" "}
                    or{" "}
                    <button
                      onClick={handleTextArea}
                      type="button"
                      className="text-md text-lime-400 hover:underline"
                    >
                      typing
                    </button>{" "}
                    your note.
                  </p>
                ) : (
                  <textarea
                    autoFocus
                    required
                    className="flex-1 bg-transparent text-slate-400 outline-none resize-none"
                    placeholder="Type your note here..."
                    onChange={handleContentChanged}
                    value={noteContent}
                  ></textarea>
                )}
              </div>
              {isRecording ? (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="py-3 flex items-center justify-center gap-2 bg-slate-900 text-center text-sm outline-none transition-all duration-200 ease-in hover:text-base"
                >
                  <Circle className="size-4 text-red-500 bg-red-500 rounded-full m-2 animate-pulse"></Circle>
                  Click here to stop Recording
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNoteCreation}
                  className="py-3 bg-lime-500 text-center text-sm outline-none hover:bg-lime-600 transition-all duration-200 ease-in hover:text-base"
                >
                  Save this note
                </button>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
