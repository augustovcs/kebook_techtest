import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { copyApi } from "@/services/api";

export function useCopy(productId?: string) {
  return useQuery({
    queryKey: ["copy", productId],
    queryFn: () => copyApi.get(productId!),
    enabled: Boolean(productId),
  });
}

export function useGenerateCopy() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => copyApi.generate(productId),
    onSuccess: (_, productId) => {
      qc.invalidateQueries({ queryKey: ["copy", productId] });
    },
  });
}
