import type {
  ExpertFormData,
  ProductFormData,
  TaskFormData,
  ApiResponse,
  PaginatedResponse,
  ExpertWithProducts,
  ProductWithRelations,
  TaskWithProduct,
} from "@/types";
import type { Expert, Copy } from "@/generated/prisma/client";

const BASE = "/api";

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erro ${res.status}`);
  }

  return res.json();
}

export const expertsApi = {
  list(search?: string, page = 1) {
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    return request<PaginatedResponse<ExpertWithProducts>>(
      `/experts?${params}`
    );
  },
  listAll() {
    return request<{ id: string; name: string; niche: string }[]>(
      "/experts?all=true"
    );
  },
  get(id: string) {
    return request<ExpertWithProducts>(`/experts/${id}`);
  },
  create(data: ExpertFormData) {
    return request<Expert>("/experts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(id: string, data: ExpertFormData) {
    return request<Expert>(`/experts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: string) {
    return request<void>(`/experts/${id}`, { method: "DELETE" });
  },
};

export const productsApi = {
  list(search?: string, page = 1) {
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    return request<PaginatedResponse<ProductWithRelations>>(
      `/products?${params}`
    );
  },
  get(id: string) {
    return request<ProductWithRelations>(`/products/${id}`);
  },
  create(data: ProductFormData) {
    return request<ProductWithRelations>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(id: string, data: ProductFormData) {
    return request<ProductWithRelations>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: string) {
    return request<void>(`/products/${id}`, { method: "DELETE" });
  },
};

export const tasksApi = {
  list(productId?: string) {
    const params = productId ? `?productId=${productId}` : "";
    return request<TaskWithProduct[]>(`/tasks${params}`);
  },
  create(data: TaskFormData) {
    return request<TaskWithProduct>("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(id: string, data: Partial<TaskFormData>) {
    return request<TaskWithProduct>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  updateStage(id: string, stage: string) {
    return request<TaskWithProduct>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ stage }),
    });
  },
  delete(id: string) {
    return request<void>(`/tasks/${id}`, { method: "DELETE" });
  },
};

export const copyApi = {
  generate(productId: string) {
    return request<ApiResponse<Copy>>("/copy/generate", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
  },
  get(productId: string) {
    return request<Copy>(`/copy?productId=${productId}`);
  },
};
