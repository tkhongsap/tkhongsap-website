import { Link } from "wouter";
import { publications } from "@/data/publications";
import { getFeaturedEssay } from "@/data/essays";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import { ArrowRight, BookOpen, Newspaper } from "lucide-react";
import { FaLinkedin, FaMedium } from "react-icons/fa";

export default function Writing() {
  const featuredEssay = getFeaturedEssay();

  const writingSchemaData = {
    name: "Ta Khongsap | Writing",
    description:
      "Essays and insights on AI, software craftsmanship, and the evolving nature of knowledge work.",
    url: "https://tkhongsap.io/writing",
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Medium":
        return <FaMedium className="h-5 w-5" />;
      case "LinkedIn":
        return <FaLinkedin className="h-5 w-5" />;
      default:
        return <Newspaper className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Writing | Ta Khongsap"
        description="Essays and insights on AI, software craftsmanship, and the evolving nature of knowledge work. Published on Medium and LinkedIn."
        canonicalUrl="/writing"
        type="website"
        keywords="AI insights, technology analysis, software development, machine learning, data science, AI strategy"
      />
      <SchemaMarkup type="website" data={writingSchemaData} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="editorial-container text-center">
          <h1 className="editorial-headline mb-6">Writing</h1>
          <p className="editorial-prose max-w-2xl mx-auto text-[#5C5C5C]">
            Thoughts on AI, technology, and the future of work—published across
            platforms where ideas find their audience.
          </p>
        </div>
      </section>

      {/* Featured Essay Section */}
      {featuredEssay && (
        <section className="pb-16 md:pb-20">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#C45B3E] uppercase tracking-wider">
                <BookOpen className="h-4 w-4" />
                Featured Essay
              </span>
            </div>
            <Link href={`/essay/${featuredEssay.id}`}>
              <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#E8E4DF]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C45B3E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 md:p-12">
                  <div className="flex items-center gap-3 text-sm text-[#5C5C5C] mb-4">
                    <span>{featuredEssay.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#5C5C5C]" />
                    <span>{featuredEssay.readingTime}</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-4 group-hover:text-[#C45B3E] transition-colors duration-300 leading-tight">
                    {featuredEssay.title}
                  </h2>
                  <p className="text-[#5C5C5C] text-lg leading-relaxed mb-6 max-w-3xl">
                    {featuredEssay.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#C45B3E] font-medium group-hover:gap-3 transition-all duration-300">
                    Read essay
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C45B3E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="divider-subtle" />
      </div>

      {/* Publications Section */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-4">
              Where I Publish
            </h2>
            <p className="text-[#5C5C5C] max-w-xl mx-auto">
              Follow along on the platforms where I share insights regularly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {publications.map((pub) => (
              <a
                key={pub.id}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <article className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E8E4DF] h-full flex flex-col">
                  {/* Cover/Header Area */}
                  <div
                    className="relative h-48 md:h-56 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${pub.accentColor}15 0%, ${pub.accentColor}05 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="text-6xl md:text-7xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                        style={{ color: pub.accentColor }}
                      >
                        {getPlatformIcon(pub.platform)}
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div
                      className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-10"
                      style={{ backgroundColor: pub.accentColor }}
                    />
                    <div
                      className="absolute bottom-4 left-4 w-16 h-16 rounded-full opacity-5"
                      style={{ backgroundColor: pub.accentColor }}
                    />
                    {/* Platform badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: pub.accentColor }}
                      >
                        {getPlatformIcon(pub.platform)}
                        {pub.platform}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-3 group-hover:text-[#C45B3E] transition-colors duration-300">
                      {pub.title}
                    </h3>
                    <p className="text-[#5C5C5C] leading-relaxed mb-6 flex-1">
                      {pub.synopsis}
                    </p>

                    {/* Topic Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pub.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-[#FAF9F6] text-[#5C5C5C] border border-[#E8E4DF] group-hover:border-[#C45B3E]/30 group-hover:text-[#C45B3E] transition-colors duration-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all duration-300"
                        style={{ color: pub.accentColor }}
                      >
                        {pub.platform === "LinkedIn"
                          ? "Subscribe on LinkedIn"
                          : "Read on Medium"}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div
                    className="h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: pub.accentColor }}
                  />
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#5C5C5C] italic">
            New essays and insights published regularly. Follow on your
            preferred platform to stay updated.
          </p>
        </div>
      </section>
    </div>
  );
}
