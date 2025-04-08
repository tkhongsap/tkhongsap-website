import { useState, useEffect, useCallback } from "react";
import { articles } from "@/data/articles";
import ArticleCard from "@/components/article-card";
import NewsletterForm from "@/components/newsletter-form";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import { 
  ExternalLink, 
  Search, 
  X, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { scrollToElement } from "@/lib/utils";

export default function Writing() {
  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Constants
  const ARTICLES_PER_PAGE = 10;
  
  // Extract all unique categories from articles
  const uniqueCategories = Array.from(
    new Set(articles.flatMap(article => article.categories))
  ).sort();
  
  // Filter articles based on search query and selected category
  const filterArticles = useCallback(() => {
    let result = [...articles];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        article => 
          article.title.toLowerCase().includes(query) || 
          article.summary.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter(article => 
        article.categories.includes(selectedCategory)
      );
    }
    
    setFilteredArticles(result);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);
  
  // Update filtered articles when search query or category changes
  useEffect(() => {
    filterArticles();
  }, [filterArticles]);
  
  // Calculate pagination information
  const totalArticles = filteredArticles.length;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = Math.min(startIndex + ARTICLES_PER_PAGE, totalArticles);
  const displayedArticles = filteredArticles.slice(startIndex, endIndex);
  
  // Pagination controls
  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToElement("articles");
  };
  
  // Reset search
  const clearSearch = () => {
    setSearchQuery("");
  };
  
  // Handle category click from article card
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    scrollToElement("filters");
  };
  
  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Website schema data for Writing page with Articles schema
  const writingSchemaData = {
    name: 'Ta Khongsap | Articles & Insights',
    description: 'Executive summaries of articles on AI strategy, technology leadership, and business transformation by Ta Khongsap, AI Strategist.',
    url: 'https://totrakoolkhongsap.replit.app/writing'
  };

  return (
    <div>
      <SEO 
        title="Writing | Ta Khongsap - AI Strategist"
        description="Read executive summaries of Ta Khongsap's articles on AI strategy, data science, and business transformation published on LinkedIn and Medium."
        canonicalUrl="/writing"
        type="website"
        imageUrl={articles[0]?.imageUrl} // Use first article image for social sharing
        imageAlt="Ta Khongsap's Featured Article"
      />
      <SchemaMarkup type="website" data={writingSchemaData} />
      
      {/* Hero Section - Simplified and focused */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 pt-28 pb-12 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Writing</h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              Executive summaries of my articles on AI strategy, technology leadership, and digital transformation.
              Read here, then continue on LinkedIn or Medium for the full content.
            </p>
          </div>
        </div>
      </section>
      
      {/* Publishing Platforms Links */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                Follow my complete articles on:
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://medium.com/@kenji-onisuka" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                    aria-label="Follow me on Medium"
                  >
                    Medium
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://www.linkedin.com/in/totrakool-k-b504a912/recent-activity/posts/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                    aria-label="Follow me on LinkedIn"
                  >
                    LinkedIn
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search and Filtering Section */}
      <section id="filters" className="py-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Search Input */}
              <div className="w-full md:w-auto flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                    aria-label="Search articles"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="w-full md:w-auto flex items-center gap-2">
                <Filter className="text-gray-400 h-4 w-4 hidden md:block" />
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="min-w-[180px]" aria-label="Filter by category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Categories">All Categories</SelectItem>
                    {uniqueCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Search Results Summary */}
            <div className="mt-4 text-sm text-gray-500 flex flex-wrap items-center gap-3">
              <span>
                Showing {totalArticles} {totalArticles === 1 ? 'article' : 'articles'}
                {searchQuery && <span> for "{searchQuery}"</span>}
                {selectedCategory !== "All Categories" && <span> in </span>}
              </span>
              
              {selectedCategory !== "All Categories" && (
                <Badge variant="secondary" className="font-normal">
                  {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory("All Categories")}
                    className="ml-2 hover:text-primary"
                    aria-label={`Remove ${selectedCategory} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {(searchQuery || selectedCategory !== "All Categories") && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                  }}
                  className="text-xs h-7 px-2"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Grid Section */}
      <section id="articles" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Executive Summaries</h2>
            
            {displayedArticles.length > 0 ? (
              <>
                {/* Responsive Article Grid - 1 column on all screen sizes */}
                <div className="grid grid-cols-1 gap-6">
                  {displayedArticles.map(article => (
                    <ArticleCard 
                      key={article.id} 
                      article={article} 
                      className="h-full"
                      onCategoryClick={handleCategoryClick}
                    />
                  ))}
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col items-center">
                    <div className="text-sm text-gray-500 mb-4">
                      Page {currentPage} of {totalPages} ({startIndex + 1}-{endIndex} of {totalArticles})
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Previous Page Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          
                          // Logic to show appropriate page numbers
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          // For larger pagination sets, add ellipses
                          if (totalPages > 5) {
                            if (i === 0 && currentPage > 3) {
                              return (
                                <Button
                                  key="first"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => goToPage(1)}
                                  className="w-9 h-9"
                                  aria-label="First page"
                                >
                                  1
                                </Button>
                              );
                            }
                            
                            if (i === 1 && currentPage > 4) {
                              return (
                                <span key="ellipsis-start" className="px-1">
                                  ...
                                </span>
                              );
                            }
                            
                            if (i === 3 && currentPage < totalPages - 3) {
                              return (
                                <span key="ellipsis-end" className="px-1">
                                  ...
                                </span>
                              );
                            }
                            
                            if (i === 4 && currentPage < totalPages - 2) {
                              return (
                                <Button
                                  key="last"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => goToPage(totalPages)}
                                  className="w-9 h-9"
                                  aria-label="Last page"
                                >
                                  {totalPages}
                                </Button>
                              );
                            }
                          }
                          
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => goToPage(pageNum)}
                              className="w-9 h-9"
                              aria-label={`Page ${pageNum}`}
                              aria-current={currentPage === pageNum ? "page" : undefined}
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      
                      {/* Next Page Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  No articles found matching your search criteria.
                </p>
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                  }}
                  className="mt-4"
                >
                  Clear filters and show all articles
                </Button>
              </div>
            )}
            
            {/* Newsletter CTA */}
            <div className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-semibold mb-3">Never miss an article</h3>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  Subscribe to my newsletter for weekly insights on AI, technology, and digital transformation.
                  Be the first to receive new content directly in your inbox.
                </p>
                <NewsletterForm showNameField={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
