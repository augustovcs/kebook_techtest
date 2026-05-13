export const PRODUCT_TYPES = {
  COURSE: "Curso",
  EBOOK: "E-book",
  MENTORSHIP: "Mentoria",
  CONSULTING: "Consultoria",
  COMMUNITY: "Comunidade",
} as const;

export type ProductType = keyof typeof PRODUCT_TYPES;

export const PRODUCT_TYPE_OPTIONS = Object.entries(PRODUCT_TYPES).map(
  ([value, label]) => ({ value, label })
);

export const TASK_STAGES = {
  MARKET_ANALYSIS: "Análise de Mercado",
  COPY: "Copy",
  DESIGN: "Design",
  DEVELOPMENT: "Desenvolvimento",
  REVIEW: "Revisão",
  PUBLISHED: "Publicado",
} as const;

export type TaskStage = keyof typeof TASK_STAGES;

export const TASK_STAGE_ORDER: TaskStage[] = [
  "MARKET_ANALYSIS",
  "COPY",
  "DESIGN",
  "DEVELOPMENT",
  "REVIEW",
  "PUBLISHED",
];

export const PRODUCT_TYPE_COLORS: Record<string, string> = {
  COURSE: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  EBOOK: "bg-sky-500/15 text-sky-400 border-sky-500/20",
  MENTORSHIP: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  CONSULTING: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  COMMUNITY: "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

export const STAGE_COLORS: Record<string, string> = {
  MARKET_ANALYSIS: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  COPY: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  DESIGN: "bg-pink-500/15 text-pink-400 border-pink-500/20",
  DEVELOPMENT: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  REVIEW: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  PUBLISHED: "bg-green-500/15 text-green-400 border-green-500/20",
};
