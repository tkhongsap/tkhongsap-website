import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/seo";

export default function NotFound() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Page Not Found | Ta Khongsap"
        description="The page you are looking for does not exist. Navigate back to the homepage to explore Ta Khongsap's essays and insights."
        canonicalUrl="/404"
        noindex={true}
      />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <p className="text-[#C45B3E] font-medium text-sm tracking-wide uppercase mb-4">
            404 Error
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-6">
            Page Not Found
          </h1>
          <p className="text-[#5C5C5C] text-lg leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-[#C45B3E] hover:bg-[#A84832] text-white px-6 py-3 inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/writing">
              <Button
                variant="outline"
                className="border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E] px-6 py-3 inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Read Essays
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
