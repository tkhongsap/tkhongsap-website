import { ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MathToBusinessCardProps {
  icon: LucideIcon;
  mathConcept: string;
  businessApplication: string;
  description: string;
  index?: number;
}

export default function MathToBusinessCard({
  icon: Icon,
  mathConcept,
  businessApplication,
  description,
  index = 0,
}: MathToBusinessCardProps) {
  return (
    <div
      className="editorial-card group p-6 md:p-8 bg-[#16161A]/80 backdrop-blur-sm rounded-xl border border-line hover:border-[#C45B3E]/30 transition-all duration-300 animate-fade-in-up h-full flex flex-col"
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-subtle flex items-center justify-center mb-4 group-hover:bg-[#C45B3E]/10 transition-colors duration-300">
        <Icon className="w-6 h-6 text-brand-text" />
      </div>

      {/* Math Concept */}
      <h3 className="font-serif text-lg md:text-xl font-semibold text-ink mb-2">
        {mathConcept}
      </h3>

      {/* Arrow */}
      <div className="flex justify-center my-3">
        <ArrowDown className="w-5 h-5 text-brand-text opacity-60" />
      </div>

      {/* Business Application */}
      <p className="font-sans text-sm font-medium text-brand-text uppercase tracking-wider mb-3">
        {businessApplication}
      </p>

      {/* Description */}
      <p className="font-sans text-ink-muted text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
