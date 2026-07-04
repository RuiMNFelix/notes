import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api";

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
}