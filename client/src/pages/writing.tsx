import { articles } from "@/data/articles";
import ArticleCard from "@/components/article-card";
import NewsletterForm from "@/components/newsletter-form";

export default function Writing() {
  return (
    <div className="pt-20">
      <section id="writing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Writing</h2>
            <p className="text-lg text-gray-700 mb-10">Insights and thoughts on AI, technology, leadership, and well-being.</p>
            
            {/* Article List */}
            <div className="space-y-12">
              {articles.map(article => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                />
              ))}
            </div>
            
            {/* Newsletter CTA */}
            <div className="mt-16 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Never miss an article</h3>
              <p className="mb-4">Subscribe to my newsletter for weekly insights on AI, technology, and personal development.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
