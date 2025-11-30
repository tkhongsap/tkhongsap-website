import { Link } from "wouter";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { getFeaturedEssay } from "@/data/essays";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";

export default function Home() {
  const featuredEssay = getFeaturedEssay();

  // SEO data for Home page
  const homeSchemaData = {
    url: "https://tkhongsap.io/",
    name: "Ta Khongsap | Math • Data Science • Code • AI • Supply Chain",
    description:
      "Essays and insights on AI, software craftsmanship, and the evolving nature of knowledge work.",
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Ta Khongsap | Math • Data Science • Code • AI • Supply Chain"
        description="Essays and insights on AI, software craftsmanship, and the evolving nature of knowledge work. Domain expertise in Mathematics, Data Science, and Supply Chain."
        canonicalUrl="/"
        keywords="AI, software development, data science, machine learning, tech thought leadership, essays, supply chain, mathematics"
        pageUrl="/"
      />
      <SchemaMarkup type="website" data={homeSchemaData} />

      {/* Hero Section - Minimalist intro */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="editorial-container text-center">
          <h1 className="editorial-headline mb-6">
            Thinking Out Loud
          </h1>
          <p className="editorial-prose max-w-xl mx-auto">
            Essays on AI, technology, and the questions that shape how we build and think.
          </p>
        </div>
      </section>

      {/* Featured Essay Section */}
      {featuredEssay && (
        <section className="pb-16 md:pb-24">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6">
            {/* Section Label */}
            <div className="mb-8">
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#C45B3E] bg-[#C45B3E]/10 rounded-full">
                Latest Essay
              </span>
            </div>

            {/* Featured Essay Card */}
            <article className="group">
              <Link href={`/essay/${featuredEssay.id}`}>
                <a className="block">
                  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#E8E4DF]">
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#5C5C5C] mb-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {featuredEssay.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {featuredEssay.readingTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-[#1A1A1A] leading-tight mb-4 group-hover:text-[#C45B3E] transition-colors duration-300">
                      {featuredEssay.title}
                    </h2>

                    {/* Subtitle */}
                    {featuredEssay.subtitle && (
                      <p className="text-lg text-[#5C5C5C] mb-6 italic">
                        {featuredEssay.subtitle}
                      </p>
                    )}

                    {/* Excerpt */}
                    <p className="text-[#5C5C5C] text-lg leading-relaxed mb-8 max-w-3xl">
                      {featuredEssay.excerpt}
                    </p>

                    {/* Read more link */}
                    <div className="flex items-center text-[#C45B3E] font-medium">
                      <span>Read the full essay</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>

                    {/* Accent line */}
                    <div className="mt-8 h-1 bg-gradient-to-r from-[#C45B3E] to-[#C45B3E]/30 rounded-full w-24 group-hover:w-32 transition-all duration-300" />
                  </div>
                </a>
              </Link>
            </article>
          </div>
        </section>
      )}

      {/* About Teaser Section */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="divider-subtle" style={{ margin: "0 0 3rem 0" }} />

          <div className="text-center">
            <p className="text-[#5C5C5C] text-lg mb-6">
              I write about technology, AI, and the evolving landscape of knowledge work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/about">
                <a className="inline-flex items-center px-6 py-3 text-[#1A1A1A] font-medium border border-[#E8E4DF] rounded-lg hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors">
                  <span>About me</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
              <Link href="/writing">
                <a className="inline-flex items-center px-6 py-3 text-white font-medium bg-[#C45B3E] rounded-lg hover:bg-[#A84832] transition-colors">
                  <span>All essays</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
