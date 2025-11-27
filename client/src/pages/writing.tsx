import { useState, useEffect, useCallback } from "react";
import { articles } from "@/data/articles";
import { FeaturedArticle } from "@/components/featured-article";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

export default function Writing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const ARTICLES_PER_PAGE = 8;

  const uniqueCategories = Array.from(
    new Set(articles.flatMap((article) => article.categories))
  ).sort();

  const filterArticles = useCallback(() => {
    let result = [...articles];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.summary.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((article) =>
        article.categories.includes(selectedCategory)
      );
    }

    setFilteredArticles(result);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    filterArticles();
  }, [filterArticles]);

  const totalArticles = filteredArticles.length;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = Math.min(startIndex + ARTICLES_PER_PAGE, totalArticles);
  const displayedArticles = filteredArticles.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToElement("articles");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const writingSchemaData = {
    name: "Ta Khongsap | Essays & Insights",
    description:
      "Essays on AI, software craftsmanship, and the evolving nature of knowledge work.",
    url: "https://tkhongsap.io/writing",
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Essays & Insights | Ta Khongsap"
        description="Essays on AI, software craftsmanship, and the evolving nature of knowledge work. Distilled takeaways from experiments across tech, strategy, and the future of work."
        canonicalUrl="/writing"
        type="website"
        keywords="AI insights, technology analysis, software development, machine learning, data science, AI strategy, tech trends"
        imageUrl={articles[0]?.imageUrl}
        imageAlt="Ta Khongsap's Featured Article"
      />
      <SchemaMarkup type="website" data={writingSchemaData} />

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="editorial-container text-center">
          <h1 className="editorial-headline mb-6">Essays & Insights</h1>
          <p className="editorial-prose max-w-xl mx-auto">
            Distilled takeaways from experiments across tech, strategy, and the
            future of knowledge work.
          </p>
        </div>
      </section>

      {/* Search and Filtering Section */}
      <section id="filters" className="pb-8">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5C5C5C] h-4 w-4" />
              <input
                type="text"
                placeholder="Search essays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#C45B3E]/30 focus:border-[#C45B3E] transition-colors"
                aria-label="Search essays"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#5C5C5C] hover:text-[#C45B3E] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "All"
                    ? "bg-[#C45B3E] text-white"
                    : "bg-white border border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E]"
                }`}
              >
                All
              </button>
              {uniqueCategories.slice(0, 4).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#C45B3E] text-white"
                      : "bg-white border border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-[#5C5C5C]">
            {totalArticles} {totalArticles === 1 ? "essay" : "essays"}
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="divider-subtle" style={{ margin: "0 0 2rem 0" }} />
      </div>

      {/* Article Grid Section */}
      <section id="articles" className="pb-16 md:pb-24">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {displayedArticles.length > 0 ? (
            <>
              {/* 2-column grid on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {displayedArticles.map((article) => (
                  <FeaturedArticle
                    key={article.id}
                    article={article}
                    variant="secondary"
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-16 flex flex-col items-center">
                  <div className="text-sm text-[#5C5C5C] mb-4">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      className="border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E] disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(pageNum)}
                            className={`w-9 h-9 ${
                              currentPage === pageNum
                                ? "bg-[#C45B3E] hover:bg-[#A84832] text-white"
                                : "border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E]"
                            }`}
                            aria-label={`Page ${pageNum}`}
                            aria-current={currentPage === pageNum ? "page" : undefined}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      className="border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E] disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-[#5C5C5C] mb-4">
                No essays found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-[#C45B3E] hover:bg-[#A84832] text-white"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#C45B3E] text-white rounded-full p-3 shadow-lg hover:bg-[#A84832] transition-all z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
