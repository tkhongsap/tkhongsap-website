import { useMemo } from "react";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/components/optimized-image";

type Aspect = "card" | "wide" | "hero" | "square";

interface CoverArtProps {
  seed: string; // stable per-article id → deterministic art
  label?: string; // title; first letter becomes a faint watermark
  src?: string; // real cover image; supersedes the generative fallback
  accent: string; // column accent hex
  aspect?: Aspect;
  className?: string;
  priority?: boolean;
}

const ASPECT: Record<Aspect, string> = {
  card: "aspect-[3/2]",
  wide: "aspect-[16/9]",
  hero: "aspect-[16/7]",
  square: "aspect-square",
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Single source of article imagery. With `src`, renders the real cover.
 * Without it, paints a deterministic dark gradient keyed by `seed` + `accent`
 * so every article has distinct-but-stable art and zero image assets are required.
 */
export default function CoverArt({
  seed,
  label,
  src,
  accent,
  aspect = "card",
  className,
  priority = false,
}: CoverArtProps) {
  const style = useMemo(() => {
    const n = hash(seed);
    const angle = 120 + (n % 90);
    const x1 = 12 + (n % 28);
    const y1 = 8 + ((n >> 2) % 24);
    const x2 = 58 + ((n >> 4) % 30);
    const y2 = 52 + ((n >> 5) % 32);
    // accent radial + a violet "surreal" pop + amber warmth, over near-black
    return {
      background: `
        radial-gradient(ellipse at ${x1}% ${y1}%, ${accent}66 0%, transparent 55%),
        radial-gradient(ellipse at ${x2}% ${y2}%, hsl(280 50% 45% / 0.30) 0%, transparent 50%),
        radial-gradient(circle at 82% 14%, hsl(32 80% 55% / 0.28) 0%, transparent 45%),
        linear-gradient(${angle}deg, #141417 0%, #0E0E10 100%)`,
    };
  }, [seed, accent]);

  return (
    <div className={cn("relative overflow-hidden bg-bg", ASPECT[aspect], className)}>
      {src ? (
        <OptimizedImage
          src={src}
          alt={label ?? ""}
          objectFit="cover"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="w-full h-full"
        />
      ) : (
        <div className="absolute inset-0 grain-overlay" style={style} aria-hidden="true">
          {label && (
            <span
              className="absolute -bottom-8 -right-3 font-display font-medium leading-none select-none pointer-events-none"
              style={{ fontSize: "11rem", color: "rgba(245,245,240,0.06)" }}
            >
              {label.charAt(0)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
