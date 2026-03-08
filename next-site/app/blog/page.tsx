import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BlogCard } from "@/components/BlogCard";
import { BLOG_POSTS } from "@/lib/content";
import { getBaseUrl, buildBreadcrumbSchema, buildWebPageSchema, buildItemListSchema } from "@/lib/schema";

const baseUrl = getBaseUrl();
const title = "Blog | Uzm. Dr. Doğukan Atabay";
const description = "Varis, girişimsel radyoloji ve sağlık üzerine güncel yazılar. Trabzon.";

const POSTS_PER_PAGE = 12;
const CATEGORIES = Array.from(new Set(BLOG_POSTS.map((p) => p.category))).sort();

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/blog` },
  keywords: [
    "varis blog",
    "girişimsel radyoloji yazıları",
    "tiroid nodülü",
    "biyopsi rehberi",
    "Doğukan Atabay blog",
  ],
  openGraph: {
    url: `${baseUrl}/blog`,
    title,
    description,
    images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: "Blog" }],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const breadcrumbItems = [{ label: "Anasayfa", href: "/" }, { label: "Blog" }];

type Props = { searchParams: Promise<{ page?: string; category?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const category = params.category && CATEGORIES.includes(params.category) ? params.category : null;

  const filtered = category ? BLOG_POSTS.filter((p) => p.category === category) : [...BLOG_POSTS];
  const totalPosts = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = filtered.slice(start, start + POSTS_PER_PAGE);

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = buildWebPageSchema({
    name: "Blog",
    description,
    url: `${baseUrl}/blog`,
    breadcrumb: breadcrumbItems,
  });
  const itemListSchema = buildItemListSchema({
    name: "Blog yazıları",
    description,
    url: `${baseUrl}/blog`,
    items: posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` })),
  });

  const query = (p: number, cat: string | null) => {
    const sp = new URLSearchParams();
    if (cat) sp.set("category", cat);
    if (p > 1) sp.set("page", String(p));
    const q = sp.toString();
    return q ? `?${q}` : "";
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <main className="main-inner">
        <div className="page-hero-banner">
          <Image
            src="/images/blog-banner.jpg"
            alt=""
            fill
            className="page-hero-banner-img"
            sizes="100vw"
            priority
          />
          <div className="page-hero-banner-overlay" aria-hidden="true" />
          <div className="page-hero-banner-content page-hero-banner-content--with-title">
            <header className="services-section-header services-section-header--on-banner">
              <span className="services-section-label">Yazılar</span>
              <h1 className="services-section-title">Blog</h1>
              <p className="services-section-desc">Varis, girişimsel radyoloji ve sağlık üzerine güncel yazılar.</p>
              <div className="services-section-line" aria-hidden="true" />
            </header>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <section className="section blog-section">
          <nav className="blog-categories" aria-label="Blog kategorileri">
            <Link href="/blog" className={`blog-category-pill${!category ? " blog-category-pill--active" : ""}`}>
              Tümü
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`blog-category-pill${category === cat ? " blog-category-pill--active" : ""}`}
              >
                {cat}
              </Link>
            ))}
          </nav>
          <div className="blog-grid">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Sayfa gezintisi">
              <ul className="blog-pagination-list">
                <li>
                  {currentPage > 1 ? (
                    <Link href={`/blog${query(currentPage - 1, category)}`} className="blog-pagination-link">
                      ← Önceki
                    </Link>
                  ) : (
                    <span className="blog-pagination-link blog-pagination-link--disabled" aria-disabled="true">
                      ← Önceki
                    </span>
                  )}
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <li key={p}>
                    {p === currentPage ? (
                      <span className="blog-pagination-link blog-pagination-link--current" aria-current="page">
                        {p}
                      </span>
                    ) : (
                      <Link href={`/blog${query(p, category)}`} className="blog-pagination-link">
                        {p}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  {currentPage < totalPages ? (
                    <Link href={`/blog${query(currentPage + 1, category)}`} className="blog-pagination-link">
                      Sonraki →
                    </Link>
                  ) : (
                    <span className="blog-pagination-link blog-pagination-link--disabled" aria-disabled="true">
                      Sonraki →
                    </span>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </section>
      </main>
    </>
  );
}
