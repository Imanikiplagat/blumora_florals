import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

import { supabase } from "@/intergrations/supabase/client";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: string[];
  published_at: string | null;
};

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select(
            "id,slug,title,excerpt,cover_image_url,tags,published_at"
          )
          .eq("published", true)
          .order("published_at", { ascending: false });

        if (error) {
          console.error("Error fetching articles:", error);
          return;
        }

        setArticles((data ?? []) as Article[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--cream)]">
      <section className="bloom-gradient">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--deep-rose)]">
            Blumora Journal
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight text-[color:var(--deep-olive)] sm:text-6xl">
            Stories from the studio
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-[color:var(--espresso)]/75">
            Floral inspiration, care guides, and behind-the-scenes stories
            from our florists.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {isLoading && (
          <p className="text-sm text-[color:var(--muted-foreground)]">
            Loading articles...
          </p>
        )}

        {!isLoading && articles.length === 0 && (
          <p className="text-sm text-[color:var(--muted-foreground)]">
            No articles published yet. Check back soon.
          </p>
        )}

        {!isLoading && articles.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--rose)] hover:shadow-[var(--shadow-soft)]"
              >
                {article.cover_image_url ? (
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-56 w-full bg-gradient-to-br from-[color:var(--soft-pink)] to-[color:var(--blush)]" />
                )}

                <div className="p-6">
                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[color:var(--secondary)] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--deep-olive)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="mt-4 font-display text-2xl leading-tight text-[color:var(--deep-olive)] transition-colors group-hover:text-[color:var(--deep-rose)]">
                    {article.title}
                  </h2>

                  {article.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                      {article.excerpt}
                    </p>
                  )}

                  {article.published_at && (
                    <div className="mt-5 flex items-center gap-2 border-t border-[color:var(--border)] pt-4">
                      <CalendarDays className="h-4 w-4 text-[color:var(--deep-rose)]" />

                      <span className="text-xs text-[color:var(--muted-foreground)]">
                        {new Date(
                          article.published_at
                        ).toLocaleDateString("en-KE", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}