import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getBlogPostBySlug, BLOG_POSTS, BLOG_SLUGS } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/content";
import { buildFAQPageSchema, buildArticleSchema, buildBreadcrumbSchema, getBaseUrl } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog" };
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/blog-banner.webp`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: "article",
      locale: "tr_TR",
      publishedTime: post.date,
      images: [{ url: imageUrl, width: 720, height: 405, alt: post.imageAlt || post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
    robots: { index: true, follow: true },
  };
}

/** Blog SSS: 8 soru, tüm yazılarda aynı (okur / randevu odaklı). */
const BLOG_FAQS = [
  { q: "Bu konuda randevu alabilir miyim?", a: "Evet. Yazıda bahsedilen işlemler veya benzer konularda randevu ve bilgi için bizi arayabilir veya iletişim formunu kullanabilirsiniz." },
  { q: "Yazıdaki bilgiler güncel mi?", a: "Blog yazılarımız genel bilgilendirme amaçlıdır. Kişiye özel tanı ve tedavi için mutlaka muayene ve görüntüleme ile değerlendirme gerekir." },
  { q: "Randevu nasıl alırım?", a: "Telefon veya WhatsApp ile bize ulaşabilir, iletişim sayfamızdaki formu doldurabilirsiniz. En kısa sürede size dönüş yapılacaktır." },
  { q: "Ücretler hakkında bilgi alabilir miyim?", a: "İşlem ve muayene ücretleri hakkında randevu sırasında veya öncesi telefon ile detaylı bilgi alabilirsiniz." },
  { q: "Sigorta anlaşmalarınız var mı?", a: "Kurumumuzun anlaşmalı olduğu sigortalar ve ödeme seçenekleri hakkında iletişim numaramızdan bilgi alabilirsiniz." },
  { q: "İşlem öncesi hazırlık gerekir mi?", a: "İşleme göre açlık, ilaç kesimi veya başka hazırlıklar gerekebilir. Randevunuzda size özel talimatlar verilecektir." },
  { q: "Çalışma saatleriniz nedir?", a: "Pazartesi–Cuma 08:00–17:00, Cumartesi 08:00–13:00. Randevu alırken güncel saat bilgisi verilir." },
  { q: "Nerede hizmet veriyorsunuz?", a: "Kemerkaya, İller Sk. 27-29, İmperial Hastanesi – Ortahisar/Trabzon adresinde hizmet vermekteyiz." },
];

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const phoneUrl = "tel:" + SITE_CONFIG.phone.replace(/\s/g, "");
  const rest = BLOG_POSTS.filter((p) => p.slug !== slug);
  const sameCategory = rest.filter((p) => p.category === post.category);
  const otherCategory = rest.filter((p) => p.category !== post.category);
  const otherPosts = [...sameCategory, ...otherCategory].slice(0, 5);

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];
  const faqSchema = buildFAQPageSchema(BLOG_FAQS, `${post.title} – Sıkça Sorulan Sorular`);
  const articleSchema = buildArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    date: post.date,
    image: post.image,
    imageAlt: post.imageAlt,
    category: post.category,
  });
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <main className="main-inner">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="service-detail-layout">
        <aside className="service-detail-sidebar">
          <div className="service-detail-cta-card">
            <h2 className="service-detail-sidebar-title">Randevu ve bilgi</h2>
            <p>Bu konu veya diğer hizmetlerimiz hakkında sorularınız için bize ulaşabilirsiniz.</p>
            <div className="service-detail-cta-card-links">
              <a href={phoneUrl}>Hemen ara</a>
              <a href={SITE_CONFIG.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ile yaz</a>
            </div>
          </div>
          <nav className="service-detail-other" aria-label="Diğer yazılar">
            <h2 className="service-detail-other-title">Diğer yazılar</h2>
            <ul className="service-detail-other-list">
              {otherPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="section page-content service-detail-article blog-detail">
          <div className="blog-detail-meta">
            <span className="blog-card-category">{post.category}</span>
            <time dateTime={post.date}>{post.date}</time>
            <span className="blog-card-reading">{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <div className="blog-detail-hero">
            <Image
              src={post.image || "/blog-banner.webp"}
              alt={post.imageAlt || post.title}
              width={720}
              height={405}
              className="blog-detail-hero-img"
              sizes="(max-width: 900px) 100vw, 720px"
            />
          </div>
          <Breadcrumb items={breadcrumbItems} />
          {post.excerpt && (
            <p className="service-detail-excerpt">{post.excerpt}</p>
          )}
          <div className="service-detail-body">
            {post.body.map((p, i) => (
              <p key={i} className={i === 0 ? "service-detail-lead" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </article>
      </div>
      <section className="service-detail-sss" id="sss" aria-labelledby="sss-title">
        <h2 id="sss-title" className="service-detail-sss-title">Sıkça Sorulan Sorular</h2>
        <div className="service-detail-sss-list">
          {BLOG_FAQS.map((item, i) => (
            <details key={i} className="service-detail-sss-item">
              <summary className="service-detail-sss-q">{item.q}</summary>
              <p className="service-detail-sss-a">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="cta-card">
        <div className="cta-card-inner">
          <h2 className="cta-title">Randevu almak veya aklınıza takılanları sormak ister misiniz?</h2>
          <p className="cta-desc">Varis, girişimsel radyoloji ve tanı işlemleriyle ilgili sorularınız için buradayız.</p>
          <div className="cta-buttons">
            <a href={phoneUrl} className="btn btn-primary cta-btn">Hemen ara</a>
            <a href={SITE_CONFIG.whatsapp} className="btn cta-btn cta-btn-outline" target="_blank" rel="noopener noreferrer">WhatsApp ile yaz</a>
          </div>
        </div>
        <div className="cta-card-image" aria-hidden="true">
          <Image src="/Dogukan-atabay.webp" alt="" width={280} height={200} />
        </div>
      </div>
    </main>
  );
}
