import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/lib/content";
import { getBaseUrl, buildBreadcrumbSchema, buildWebPageSchema, buildItemListSchema } from "@/lib/schema";

const baseUrl = getBaseUrl();
const title = "Hizmetlerimiz | Uzm. Dr. Doğukan Atabay";
const description = "Girişimsel radyoloji, varis tedavisi, tiroid nodül tedavisi, biyopsi ve tanı işlemleri. Trabzon İmperial Hastanesi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/hizmetler` },
  keywords: [
    "girişimsel radyoloji Trabzon",
    "varis tedavisi Trabzon",
    "tiroid nodül tedavisi",
    "biyopsi",
    "lazer varis",
    "köpük skleroterapi",
    "Doğukan Atabay hizmetler",
  ],
  openGraph: {
    url: `${baseUrl}/hizmetler`,
    title,
    description,
    images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: "Uzm. Dr. Doğukan Atabay" }],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const breadcrumbItems = [{ label: "Anasayfa", href: "/" }, { label: "Hizmetlerimiz" }];

export default function HizmetlerPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = buildWebPageSchema({
    name: "Hizmetlerimiz",
    description,
    url: `${baseUrl}/hizmetler`,
    breadcrumb: breadcrumbItems,
  });
  const itemListSchema = buildItemListSchema({
    name: "Hizmetler listesi",
    description,
    url: `${baseUrl}/hizmetler`,
    items: SERVICES.map((s) => ({ name: s.title, url: `/hizmetler/${s.slug}` })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <main className="main-inner">
        <div className="page-hero-banner">
          <Image
            src="/images/hizmet-banner.jpg"
            alt=""
            fill
            className="page-hero-banner-img"
            sizes="100vw"
            priority
          />
          <div className="page-hero-banner-overlay" aria-hidden="true" />
          <div className="page-hero-banner-content page-hero-banner-content--with-title">
            <header className="services-section-header services-section-header--on-banner">
              <span className="services-section-label">Ne Sunuyoruz</span>
              <h1 className="services-section-title">Hizmetlerimiz</h1>
              <p className="services-section-desc">Girişimsel radyoloji, varis tedavisi ve tanı işlemlerinde uzman kadromuzla yanınızdayız.</p>
              <div className="services-section-line" aria-hidden="true" />
            </header>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <section className="section services-section" id="hizmetlerimiz">
          <div className="services-grid">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="cta-card">
            <div className="cta-card-inner">
              <h2 className="cta-title">Randevu almak veya aklınıza takılanları sormak ister misiniz?</h2>
              <p className="cta-desc">Varis, girişimsel radyoloji ve tanı işlemleriyle ilgili sorularınız için buradayız.</p>
              <div className="cta-buttons">
                <a href="tel:+905339483076" className="btn btn-primary cta-btn">Hemen ara</a>
                <a href="https://wa.me/905339483076" className="btn cta-btn cta-btn-outline" target="_blank" rel="noopener noreferrer">WhatsApp ile yaz</a>
              </div>
            </div>
            <div className="cta-card-image" aria-hidden="true">
              <Image src="/Dogukan-atabay.webp" alt="" width={280} height={200} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
