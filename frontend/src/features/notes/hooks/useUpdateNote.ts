import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../api";
import type { NoteRequest } from "../api";

type UpdateNoteVariables = {id: number} & NoteRequest;

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateNoteVariables) => updateNote(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}