import type { Expert, Product, Task, Copy } from "@/generated/prisma";

export type ExpertWithProducts = Expert & {
  products: Product[];
};

export type ProductWithRelations = Product & {
  expert: Expert;
  tasks: Task[];
  copy: Copy | null;
};

export type ProductWithExpert = Product & {
  expert: Expert;
};

export type TaskWithProduct = Task & {
  product: Product;
};

export type CopyWithProduct = Copy & {
  product: ProductWithRelations;
};

export interface ExpertFormData {
  name: string;
  niche: string;
  instagram: string;
  youtube: string;
  email: string;
  notes: string;
}

export interface ProductFormData {
  name: string;
  type: string;
  price: number;
  targetAudience: string;
  mainPain: string;
  promisedTransformation: string;
  notes: string;
  expertId: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  stage: string;
  responsible: string;
  productId: string;
}

export interface CopyFormData {
  headline: string;
  subheadline: string;
  benefits: string;
  audience: string;
  cta: string;
  faq: string;
  productId: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
