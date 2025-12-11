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
      className="group p-6 md:p-8 bg-white rounded-xl border border-[#E8E4DF] hover:border-[#C45B3E]/40 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-[#F5F0EB] flex items-center justify-center mb-5 group-hover:bg-[#C45B3E]/10 transition-colors duration-300">
        <Icon className="w-7 h-7 text-[#C45B3E]" />
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-3">
        {title}
      </h3>

      {/* Pain Point */}
      <p className="text-[#5C5C5C] text-sm md:text-base leading-relaxed mb-4">
        {painPoint}
      </p>

      {/* Divider */}
      <div className="w-12 h-0.5 bg-[#C45B3E]/30 mb-4" />

      {/* What I Do */}
      <div>
        <span className="text-xs font-semibold text-[#C45B3E] uppercase tracking-wider">
          What I do
        </span>
        <p className="mt-1 text-[#1A1A1A] text-sm md:text-base font-medium leading-relaxed">
          {whatIDo}
        </p>
      </div>
    </div>
  );
}
