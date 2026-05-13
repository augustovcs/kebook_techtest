import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expertsApi } from "@/services/api";
import type { ExpertFormData } from "@/types";

export function useExperts(search?: string, page = 1) {
  return useQuery({
    queryKey: ["experts", search, page],
    queryFn: () => expertsApi.list(search, page),
  });
}

export function useExpertsList() {
  return useQuery({
    queryKey: ["experts", "all"],
    queryFn: () => expertsApi.listAll(),
  });
}

export function useCreateExpert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ExpertFormData) => expertsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["experts"] }),
  });
}

export function useUpdateExpert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExpertFormData }) =>
      expertsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["experts"] }),
  });
}

export function useDeleteExpert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expertsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["experts"] }),
  });
}
