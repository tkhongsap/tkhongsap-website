export type ColumnSlug = "frontier" | "field-notes" | "signal";

export interface Column {
  slug: ColumnSlug;
  name: string;
  description: string; // one-sentence positioning, shown on column row + landing
  tagline?: string; // short eyebrow
  accent: string; // hex; drives badges + gradient fallback (tuned for dark bg)
}

export const columns: Column[] = [
  {
    slug: "frontier",
    name: "Frontier",
    description:
      "What just shipped at the edge of AI — models, agents, and tools, decoded for builders.",
    tagline: "Latest AI developments",
    accent: "#E0785A", // terracotta, lightened for dark
  },
  {
    slug: "field-notes",
    name: "Field Notes",
    description:
      "How I actually built it — agent systems, infrastructure, and the messy middle.",
    tagline: "Examples & build logs",
    accent: "#3F9B92", // brightened teal
  },
  {
    slug: "signal",
    name: "Signal",
    description: "Where the trend lines point, and what I think it means.",
    tagline: "Trend analysis & opinion",
    accent: "#D8923F", // brightened ochre
  },
];

export const DEFAULT_COLUMN: ColumnSlug = "signal";

export const getColumn = (slug?: string): Column | undefined =>
  columns.find((c) => c.slug === slug);

export const getColumnOrDefault = (slug?: string): Column =>
  getColumn(slug) ?? getColumn(DEFAULT_COLUMN)!;
