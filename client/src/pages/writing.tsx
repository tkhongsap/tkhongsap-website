import { useState, useMemo } from "react";
import { Link } from "wouter";
import { publications } from "@/data/publications";
import {
  getAllPosts,
  getFeaturedPost,
  getAllCategories,
  getAllTags,
  type Post,
} from "@/lib/markdown";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import {
  ArrowRight,
  BookOpen,
  Linkedin,
  Newspaper,
  Filter,
  X,
  Tag,
} from "lucide-react";

// Custom Medium icon
function MediumIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

const POSTS_PER_PAGE = 6;

function PostCard({ post }: { post: Post }) {
  const displayDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/essay/${post.id}`}>
      <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#E8E4DF] h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C45B3E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative p-6 md:p-8 flex-1 flex flex-col">
          {/* Category + Meta */}
          <div className="flex items-center gap-3 text-sm text-[#5C5C5C] mb-3">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#C45B3E]/10 text-[#C45B3E]">
              {post.category}
            </span>
            <span>{displayDate}</span>
            <span className="w-1 h-1 rounded-full bg-[#5C5C5C]" />
            <span>{post.readingTime}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-3 group-hover:text-[#C45B3E] transition-colors duration-300 leading-tight">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[#5C5C5C] leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Tags + CTA */}
          <div className="flex items-center justify-between mt-auto">
            <span className="inline-flex items-center gap-2 text-[#C45B3E] font-medium group-hover:gap-3 transition-all duration-300">
              Read essay
              <ArrowRight className="h-4 w-4" />
            </span>
            {post.tags.length > 0 && (
              <div className="hidden sm:flex gap-1.5">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-[#FAF9F6] text-[#5C5C5C] border border-[#E8E4DF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C45B3E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </article>
    </Link>
  );
}

export default function Writing() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const categories = getAllCategories();
  const allTags = getAllTags();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  // Filter posts (exclude featured from listing if no filters active)
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    if (activeCategory) {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    if (activeTag) {
      posts = posts.filter((p) => p.tags.includes(activeTag));
    }

    return posts;
  }, [allPosts, activeCategory, activeTag]);

  // Show featured only when no filters are active
  const showFeatured = !activeCategory && !activeTag && featuredPost;
  const listingPosts = showFeatured
    ? filteredPosts.filter((p) => !p.featured)
    : filteredPosts;

  const visiblePosts = listingPosts.slice(0, visibleCount);
  const hasMore = visibleCount < listingPosts.length;

  const clearFilters = () => {
    setActiveCategory(null);
    setActiveTag(null);
    setVisibleCount(POSTS_PER_PAGE);
  };

  const isFiltered = activeCategory || activeTag;

  const writingSchemaData = {
    name: "Ta Khongsap | Writing",
    description:
      "Essays and insights on AI, software craftsmanship, and the evolving nature of knowledge work.",
    url: "https://tkhongsap.io/writing",
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Medium":
        return <MediumIcon className="h-5 w-5" />;
      case "LinkedIn":
        return <Linkedin className="h-5 w-5" />;
      default:
        return <Newspaper className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Writing | Ta Khongsap"
        description="Essays and insights on AI, software craftsmanship, and the evolving nature of knowledge work."
        canonicalUrl="/writing"
        type="website"
        keywords="AI insights, technology analysis, software development, machine learning, data science, AI strategy"
      />
      <SchemaMarkup type="website" data={writingSchemaData} />

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="editorial-container text-center">
          <h1 className="editorial-headline mb-6">Writing</h1>
          <p className="editorial-prose max-w-2xl mx-auto text-[#5C5C5C]">
            Thoughts on AI, technology, and the future of work—published across
            platforms where ideas find their audience.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-8 md:pb-12">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter toggle for mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
              {isFiltered && (
                <span className="w-2 h-2 rounded-full bg-[#C45B3E]" />
              )}
            </button>

            {/* Category pills - always visible on desktop */}
            <div
              className={`${showFilters ? "flex" : "hidden"} md:flex flex-wrap items-center gap-2 w-full md:w-auto`}
            >
              <button
                onClick={clearFilters}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  !activeCategory
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-white text-[#5C5C5C] border border-[#E8E4DF] hover:border-[#C45B3E] hover:text-[#C45B3E]"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(
                      activeCategory === category ? null : category,
                    );
                    setVisibleCount(POSTS_PER_PAGE);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === category
                      ? "bg-[#C45B3E] text-white"
                      : "bg-white text-[#5C5C5C] border border-[#E8E4DF] hover:border-[#C45B3E] hover:text-[#C45B3E]"
                  }`}
                >
                  {category}
                </button>
              ))}

              {/* Tag filter dropdown */}
              {allTags.length > 0 && (
                <div className="relative group">
                  <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full bg-white text-[#5C5C5C] border border-[#E8E4DF] hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors">
                    <Tag className="h-3.5 w-3.5" />
                    {activeTag || "Tags"}
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E8E4DF] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    {activeTag && (
                      <button
                        onClick={() => {
                          setActiveTag(null);
                          setVisibleCount(POSTS_PER_PAGE);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-[#C45B3E] hover:bg-[#FAF9F6] flex items-center gap-2"
                      >
                        <X className="h-3.5 w-3.5" />
                        Clear tag
                      </button>
                    )}
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setActiveTag(activeTag === tag ? null : tag);
                          setVisibleCount(POSTS_PER_PAGE);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#FAF9F6] transition-colors ${
                          activeTag === tag
                            ? "text-[#C45B3E] font-medium"
                            : "text-[#5C5C5C]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Active filter indicator */}
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[#C45B3E]/10 text-[#C45B3E] hover:bg-[#C45B3E]/20 transition-colors"
              >
                <X className="h-3 w-3" />
                Clear filters
              </button>
            )}

            {/* Result count */}
            <span className="text-sm text-[#5C5C5C] ml-auto">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "essay" : "essays"}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Essay Section (only when no filters) */}
      {showFeatured && featuredPost && (
        <section className="pb-12 md:pb-16">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#C45B3E] uppercase tracking-wider">
                <BookOpen className="h-4 w-4" />
                Featured Essay
              </span>
            </div>
            <Link href={`/essay/${featuredPost.id}`}>
              <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#E8E4DF]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C45B3E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 md:p-12">
                  <div className="flex items-center gap-3 text-sm text-[#5C5C5C] mb-4">
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#C45B3E]/10 text-[#C45B3E]">
                      {featuredPost.category}
                    </span>
                    <span>
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#5C5C5C]" />
                    <span>{featuredPost.readingTime}</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-4 group-hover:text-[#C45B3E] transition-colors duration-300 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-[#5C5C5C] text-lg leading-relaxed mb-6 max-w-3xl">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[#C45B3E] font-medium group-hover:gap-3 transition-all duration-300">
                      Read essay
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <div className="hidden sm:flex gap-2">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-full bg-[#FAF9F6] text-[#5C5C5C] border border-[#E8E4DF]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C45B3E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="pb-16 md:pb-20">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {!showFeatured && (
            <div className="mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
                {activeCategory ? activeCategory : "All Essays"}
                {activeTag && (
                  <span className="text-[#C45B3E]"> · #{activeTag}</span>
                )}
              </h2>
            </div>
          )}

          {visiblePosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                {visiblePosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={() =>
                      setVisibleCount((prev) => prev + POSTS_PER_PAGE)
                    }
                    className="px-8 py-3 text-sm font-medium rounded-full border border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors"
                  >
                    Load more essays
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#5C5C5C] text-lg mb-4">
                No essays found with these filters.
              </p>
              <button
                onClick={clearFilters}
                className="text-[#C45B3E] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
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
                    <div
                      className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-10"
                      style={{ backgroundColor: pub.accentColor }}
                    />
                    <div
                      className="absolute bottom-4 left-4 w-16 h-16 rounded-full opacity-5"
                      style={{ backgroundColor: pub.accentColor }}
                    />
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

                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-3 group-hover:text-[#C45B3E] transition-colors duration-300">
                      {pub.title}
                    </h3>
                    <p className="text-[#5C5C5C] leading-relaxed mb-6 flex-1">
                      {pub.synopsis}
                    </p>

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
