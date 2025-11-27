import { Linkedin, Github, Mail } from "lucide-react";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import OptimizedImage from "@/components/optimized-image";

export default function About() {
  const personSchemaData = {
    name: "Ta Khongsap",
    jobTitle: "Domain Expert: Math, Data Science, AI & Supply Chain",
    description:
      "Domain expert in Mathematics, Data Science, Software Development, AI, and Supply Chain. Leveraging mathematical rigor, data-driven insights, and programming skills to solve complex problems in finance, operations, and logistics.",
    url: "https://tkhongsap.io/about",
    sameAs: [
      "https://www.linkedin.com/in/totrakool-k-b504a912/",
      "https://github.com/tkhongsap",
    ],
  };

  return (
    <>
      <SEO
        title="About Ta Khongsap | Math, Data Science, AI & Supply Chain Expert"
        description="Learn about Ta Khongsap's expertise in mathematics, data science, software development, AI, and supply chain. Discover how mathematical rigor, data-driven insights, and domain knowledge solve complex problems in finance, operations, and logistics."
        canonicalUrl="/about"
        keywords="mathematician, data scientist, software developer, AI expert, supply chain optimization, operations research, logistics, quantitative analysis, machine learning, domain expertise"
      />
      <SchemaMarkup type="person" data={personSchemaData} />

      <div className="bg-[#FAF9F6] min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container text-center">
            <h1 className="editorial-headline mb-8">The Game Has Changed</h1>
          </div>
        </section>

        {/* Essay Content */}
        <article className="pb-16 md:pb-24">
          <div className="editorial-container">
            {/* Section 1: The Leverage Revolution */}
            <section className="mb-12">
              <h2 className="editorial-subhead mb-6">AI Is the New Leverage</h2>

              <p className="editorial-prose mb-4">
                The internet gave us <strong>access</strong>. AI gives us{" "}
                <strong>leverage</strong>.
              </p>

              <p className="editorial-prose mb-6">
                One person with the right AI tools now outproduces entire teams
                from five years ago.
              </p>

              <blockquote className="border-l-4 border-[#C45B3E] pl-6 py-4 my-8 bg-[#F5F0EB] rounded-r-lg">
                <p className="font-serif text-xl md:text-2xl italic text-[#1A1A1A] leading-relaxed">
                  What seemed impossible yesterday is Tuesday's work today.
                </p>
              </blockquote>

              <p className="editorial-prose">
                This isn't about being <em>tech-savvy</em>. It's about
                understanding <strong>systems of leverage</strong>.
              </p>
            </section>

            <div className="divider-subtle" />

            {/* Section 2: The Hidden Truth */}
            <section className="mb-12">
              <h2 className="editorial-subhead mb-6">
                Most People Use AI Wrong
              </h2>

              <p className="editorial-prose mb-4">
                They treat AI like Google. Ask once, get disappointed, quit.
              </p>

              <p className="editorial-prose mb-6">
                Real AI mastery is a conversation, not a transaction.
              </p>

              <p className="editorial-prose mb-4">The breakthrough happens when you:</p>

              <ul className="space-y-3 mb-6 ml-1">
                <li className="flex items-start editorial-prose">
                  <span className="text-[#C45B3E] mr-3 font-bold">·</span>
                  <span>
                    Ask better questions (specificity beats generality)
                  </span>
                </li>
                <li className="flex items-start editorial-prose">
                  <span className="text-[#C45B3E] mr-3 font-bold">·</span>
                  <span>
                    Provide context (AI needs to understand your world)
                  </span>
                </li>
                <li className="flex items-start editorial-prose">
                  <span className="text-[#C45B3E] mr-3 font-bold">·</span>
                  <span>
                    Iterate relentlessly (every conversation teaches both of
                    you)
                  </span>
                </li>
                <li className="flex items-start editorial-prose">
                  <span className="text-[#C45B3E] mr-3 font-bold">·</span>
                  <span>Think in systems (not just tasks)</span>
                </li>
              </ul>
            </section>

            <div className="divider-subtle" />

            {/* Section 3: Network Effects */}
            <section className="mb-12">
              <h2 className="editorial-subhead mb-6">Knowledge Compounds</h2>

              <p className="editorial-prose mb-4">
                The best teams don't hoard AI insights. They{" "}
                <strong>share them</strong>.
              </p>

              <p className="editorial-prose mb-4">
                When you discover a powerful technique and teach it to others,
                you create a network effect that benefits everyone—including
                you.
              </p>

              <p className="editorial-prose">
                Abundance mindset wins in the AI era.{" "}
                <em>Scarcity thinking loses</em>.
              </p>
            </section>

            <div className="divider-subtle" />

            {/* Section 4: The Bottom Line */}
            <section className="mb-12">
              <h2 className="editorial-subhead mb-6">The Real Opportunity</h2>

              <p className="editorial-prose mb-4">
                Most people are still figuring out email while others are
                building AI-powered empires.
              </p>

              <p className="editorial-prose">
                The question isn't whether AI will change everything. It's
                whether{" "}
                <strong>you'll be ahead of the curve or behind it</strong>.
              </p>
            </section>
          </div>
        </article>

        {/* Author Footer */}
        <section className="pb-20 md:pb-32">
          <div className="editorial-container">
            <div className="divider-subtle" style={{ marginBottom: "3rem" }} />

            <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-white rounded-xl editorial-card">
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

              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-1">
                  <span className="text-[#C45B3E]">Ta</span> Khongsap
                </h3>
                <p className="text-[#5C5C5C] mb-4">
                  Writing about AI, software craftsmanship, and the future of
                  knowledge work.
                </p>

                <div className="flex justify-center sm:justify-start gap-4">
                  <a
                    href="https://www.linkedin.com/in/totrakool-k-b504a912/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5C5C5C] hover:text-[#C45B3E] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/tkhongsap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5C5C5C] hover:text-[#C45B3E] transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="mailto:ta@tkhongsap.io"
                    className="text-[#5C5C5C] hover:text-[#C45B3E] transition-colors"
                    aria-label="Email"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
