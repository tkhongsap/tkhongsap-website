import type { LucideIcon } from "lucide-react";

export interface PersonaCardProps {
  icon: LucideIcon;
  title: string;
  painPoint: string;
  whatIDo: string;
  index?: number;
}

export default function PersonaCard({
  icon: Icon,
  title,
  painPoint,
  whatIDo,
  index = 0,
}: PersonaCardProps) {
  return (
    <div
      className="group p-6 md:p-8 bg-surface rounded-xl border border-line hover:border-[#C45B3E]/40 transition-all duration-300 animate-fade-in-up h-full flex flex-col"
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-subtle flex items-center justify-center mb-5 group-hover:bg-[#C45B3E]/10 transition-colors duration-300">
        <Icon className="w-7 h-7 text-brand-text" />
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl md:text-2xl font-semibold text-ink mb-3">
        {title}
      </h3>

      {/* Pain Point */}
      <p className="text-ink-muted text-sm md:text-base leading-relaxed mb-4">
        {painPoint}
      </p>

      {/* Divider */}
      <div className="w-12 h-0.5 bg-[#C45B3E]/30 mb-4" />

      {/* What I Do */}
      <div>
        <span className="text-xs font-semibold text-brand-text uppercase tracking-wider">
          What I do
        </span>
        <p className="mt-1 text-ink text-sm md:text-base font-medium leading-relaxed">
          {whatIDo}
        </p>
      </div>
    </div>
  );
}
