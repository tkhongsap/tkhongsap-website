import { Link } from "wouter";
import { ArrowRight, Bot, BarChart2, CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Build targeted AI tools: exception triage, document summarization, coding assistants. Integrate agents or RAG with evaluation baked in.",
  },
  {
    icon: BarChart2,
    title: "Analytics & Optimization",
    description:
      "Design routing & allocation models. Improve pipelines and performance—like taking 4-hour nightly jobs down to under an hour.",
  },
  {
    icon: CheckCircle,
    title: "AI Evaluation",
    description:
      "Create rubrics and testbeds for LLMs, RAG, and coding agents. Deliver scorecards that non-technical leaders can understand.",
  },
  {
    icon: Users,
    title: "Advisory & Reviews",
    description:
      "One-off reviews of AI plans, data strategy, or architecture. Fresh eyes on what's working and what's not.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 relative z-10 bg-[#1A1A1A]">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[#C45B3E] font-sans text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in-up">
            Work With Me
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white animate-fade-in-up delay-100">
            How I Usually{" "}
            <span className="italic text-[#C45B3E]">Help Teams</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#C45B3E]/40 hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <service.icon className="w-8 h-8 text-[#C45B3E] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 animate-fade-in-up delay-500">
          <p className="text-white/80 text-lg md:text-xl font-sans mb-6 max-w-2xl mx-auto">
            Not sure where to start? Send me 3-4 sentences about your current
            data or AI pain point. I'll reply with 1-2 concrete project ideas.
          </p>
          <Button
            asChild
            className="bg-[#C45B3E] hover:bg-[#A84832] text-white px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/contact" className="inline-flex items-center gap-2">
              <span>Get in Touch</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
