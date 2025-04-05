import { articles } from "@/data/articles";
import ArticleCard from "@/components/article-card";
import NewsletterForm from "@/components/newsletter-form";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Writing() {
  // Website schema data for Writing page with Articles schema
  const writingSchemaData = {
    name: 'Totrakool Khongsap | Articles & Insights',
    description: 'Executive summaries of articles on AI strategy, technology leadership, and business transformation by Totrakool Khongsap, AI Strategist.',
    url: 'https://totrakoolkhongsap.replit.app/writing'
  };

  return (
    <div>
      <SEO 
        title="Writing | Totrakool Khongsap - AI Strategist"
        description="Read executive summaries of Totrakool Khongsap's articles on AI strategy, data science, and business transformation published on LinkedIn and Medium."
        canonicalUrl="/writing"
        type="website"
        imageUrl={articles[0].imageUrl} // Use first article image for social sharing
        imageAlt="Totrakool Khongsap's Featured Article"
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
                    href="https://medium.com/@totrakool.khongsap" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
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
      
      {/* Article Grid Section */}
      <section id="articles" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Executive Summaries</h2>
            
            {/* Responsive Article Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  className="h-full"
                />
              ))}
            </div>
            
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
    </div>
  );
}
