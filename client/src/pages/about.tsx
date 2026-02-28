import { Linkedin, Github, Mail, Twitter } from "lucide-react";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import OptimizedImage from "@/components/optimized-image";

export default function About() {
  const personSchemaData = {
    name: "Ta Khongsap",
    jobTitle: "Builder | AI Agent Systems | Solopreneur",
    description:
      "Builder based in Bangkok. Running AI agent systems that ship code, draft content, and manage workflows autonomously.",
    url: "https://tkhongsap.io/about",
    sameAs: [
      "https://x.com/tkhongsap",
      "https://www.linkedin.com/in/totrakool-khongsap/",
      "https://github.com/tkhongsap",
    ],
  };

  return (
    <>
      <SEO
        title="About Ta Khongsap | Builder, AI Agent Systems"
        description="Builder based in Bangkok. After years in corporate roles spanning supply chain, data science, and AI, now building AI agent systems that ship autonomously."
        canonicalUrl="/about"
        keywords="Ta Khongsap, AI agents, OpenClaw, building in public, solopreneur, Bangkok"
      />
      <SchemaMarkup type="person" data={personSchemaData} />

      <div className="bg-[#FAF9F6] min-h-screen">
        {/* Header */}
        <section className="pt-32 pb-8 md:pt-40 md:pb-12">
          <div className="editorial-container">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#C45B3E] flex-shrink-0">
                <OptimizedImage
                  src="/images/Ta Khongsap OPEN-TEC.jpg"
                  alt="Ta Khongsap"
                  width={96}
                  height={96}
                  objectFit="cover"
                  className="w-full h-full"
                  priority={true}
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                  <span className="text-[#C45B3E]">Ta</span> Khongsap
                </h1>
                <p className="text-[#5C5C5C] text-lg">
                  Builder · AI Agent Systems · Solopreneur
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="pb-16 md:pb-24">
          <div className="editorial-container">
            {/* Intro */}
            <section className="mb-12">
              <p className="editorial-prose mb-4">
                After years working in corporate roles across supply chain, data science, and AI, I decided to build on my own terms. Not because the work wasn't interesting — it was. But because I kept seeing the same gap: the distance between what AI could do and what most teams were actually doing with it.
              </p>
              <p className="editorial-prose">
                So I started building. First small tools. Then products. Then something unexpected happened — I built a team of AI agents that started shipping work while I slept.
              </p>
            </section>

            <div className="divider-subtle" />

            {/* What I'm Building */}
            <section className="mb-12">
              <h2 className="editorial-subhead mb-6">What I'm Building</h2>

              <p className="editorial-prose mb-4">
                Today I run 4 specialized agents on a single VPS. They ship code, draft content, extract documents, and coordinate with each other. 20+ skills between them. It's not magic — it took weeks of careful iteration. But it works, and it compounds.
              </p>

              <p className="editorial-prose mb-4">
                Products that came out of this:
              </p>

              <ul className="space-y-3 mb-6 ml-1">
                <li className="flex items-start editorial-prose">
                  <span className="text-[#C45B3E] mr-3 font-bold">·</span>
                  <span><strong>TalentMatch AI</strong> — AI-powered candidate screening and matching</span>
                </li>
                <li className="flex items-start editorial-prose">
                  <span className="text-[#C45B3E] mr-3 font-bold">·</span>
                  <span><strong>Doc Extract</strong> — pull structured data from PDFs and images using AI</span>
                </li>
                <li className="flex items-start editorial-prose">
                  <span className="text-[#C45B3E] mr-3 font-bold">·</span>
                  <span><strong>Ava HQ</strong> — real-time dashboard for monitoring agent activity</span>
                </li>
              </ul>

              <p className="editorial-prose">
                I'm building in public because I think the best way to learn is to show your work. The wins and the failures. The elegant solutions and the ugly hacks that got things moving.
              </p>
            </section>

            <div className="divider-subtle" />

            {/* What I Believe In */}
            <section className="mb-12">
              <h2 className="editorial-subhead mb-6">What I Believe In</h2>

              <blockquote className="border-l-4 border-[#C45B3E] pl-6 py-4 my-8 bg-[#F5F0EB] rounded-r-lg">
                <p className="font-serif text-xl md:text-2xl italic text-[#1A1A1A] leading-relaxed">
                  Ethics over hype. Shipping over polishing. Systems that compound while you live your life.
                </p>
              </blockquote>

              <p className="editorial-prose mb-4">
                Ethics over hype. Shipping over polishing. Systems that compound while you live your life. Long-term thinking over short-term cash grabs. Always.
              </p>

              <p className="editorial-prose">
                I'm not interested in AI as a buzzword. I'm interested in AI as a tool — one that lets a single person build things that used to require a team. The goal isn't to automate everything. It's to automate the right things, so I can focus on the work that actually matters.
              </p>
            </section>

            <div className="divider-subtle" />

            {/* Connect */}
            <section className="mb-12">
              <h2 className="editorial-subhead mb-6">Connect</h2>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://x.com/tkhongsap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#5C5C5C] hover:text-[#C45B3E] hover:border-[#C45B3E] transition-colors"
                >
                  <Twitter size={18} /> X (@tkhongsap)
                </a>
                <a
                  href="https://linkedin.com/in/totrakool-khongsap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#5C5C5C] hover:text-[#C45B3E] hover:border-[#C45B3E] transition-colors"
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a
                  href="https://github.com/tkhongsap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#5C5C5C] hover:text-[#C45B3E] hover:border-[#C45B3E] transition-colors"
                >
                  <Github size={18} /> GitHub
                </a>
                <a
                  href="mailto:ta.khongsap@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[#5C5C5C] hover:text-[#C45B3E] hover:border-[#C45B3E] transition-colors"
                >
                  <Mail size={18} /> Email
                </a>
              </div>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
