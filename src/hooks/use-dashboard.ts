import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/services/api";
import type { DashboardStats } from "@/types";

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardApi.stats,
  });
}
