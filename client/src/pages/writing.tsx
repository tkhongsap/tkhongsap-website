import { articles } from "@/data/articles";
import ArticleCard from "@/components/article-card";
import NewsletterForm from "@/components/newsletter-form";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Writing() {
  // Website schema data for Writing page
  const writingSchemaData = {
    name: 'Totrakool Khongsap | Articles & Insights',
    description: 'Read insights and thoughts on AI, technology, leadership, and well-being by Totrakool Khongsap, AI Strategist.',
    url: 'https://totrakoolkhongsap.replit.app/writing'
  };

  return (
    <div>
      <SEO 
        title="Writing | Totrakool Khongsap - AI Strategist"
        description="Read Totrakool Khongsap's articles and insights on AI strategy, data science, and business transformation. Subscribe to the newsletter for weekly updates."
        canonicalUrl="/writing"
        type="website"
      />
      <SchemaMarkup type="website" data={writingSchemaData} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 pt-28 pb-14 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Writing</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Insights and thoughts on AI, technology, leadership, and digital transformation.
              Follow my exploration of how emerging technologies reshape business and society.
            </p>
          </div>
        </div>
      </section>
      
      {/* Article List Section */}
      <section id="articles" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Social & Publishing Platforms Links */}
            <div className="mb-12 p-6 bg-white border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Follow my writing on:</h3>
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
                    LinkedIn Articles
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Article Grid */}
            <div className="space-y-12">
              {articles.map(article => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                />
              ))}
            </div>
            
            {/* Newsletter CTA */}
            <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-3">Never miss an article</h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Subscribe to my newsletter for weekly insights on AI, technology, and personal development.
                Be the first to receive new content directly in your inbox.
              </p>
              <NewsletterForm showNameField={true} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
