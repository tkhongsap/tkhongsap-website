import { cn } from "@/lib/utils";
import { getColumn, type ColumnSlug } from "@/data/columns";

interface ColumnBadgeProps {
  column?: ColumnSlug;
  className?: string;
  size?: "sm" | "md";
}

/** Small accent-colored pill identifying an article's column. */
export default function ColumnBadge({ column, className, size = "sm" }: ColumnBadgeProps) {
  const col = getColumn(column);
  if (!col) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium uppercase tracking-wider",
        size === "sm" ? "px-2.5 py-1 text-[0.7rem]" : "px-3 py-1.5 text-xs",
        className
      )}
      style={{
        color: col.accent,
        backgroundColor: `${col.accent}1F`, // ~12% tint
        border: `1px solid ${col.accent}3D`,
      }}
    >
      {col.name}
    </span>
  );
}
