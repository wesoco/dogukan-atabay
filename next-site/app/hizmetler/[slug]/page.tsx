import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getServiceBySlug, SERVICES, SERVICE_SLUGS } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/content";
import { buildFAQPageSchema, buildServiceSchema, buildBreadcrumbSchema, getBaseUrl } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Hizmet" };
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}/hizmetler/${slug}`;
  return {
    title: service.title,
    description: service.excerpt,
    alternates: { canonical },
    openGraph: {
      title: service.title,
      description: service.excerpt,
      url: canonical,
      type: "website",
      locale: "tr_TR",
    },
    twitter: { card: "summary_large_image", title: service.title, description: service.excerpt },
    robots: { index: true, follow: true },
  };
}

const SUBHEADING_PREFIXES = [
  "Kimlere uygulanır?",
  "İşlem nasıl yapılır?",
  "Avantajları:",
  "Hangi işlemler yapılır?",
  "Hangi bölgelere uygulanır?",
];

/** SSS için her zaman 8 soru: önce hizmete özel, eksikse genel sorularla tamamlanır. */
const GENERIC_FAQS = [
  { q: "Randevu nasıl alabilirim?", a: "Telefon veya WhatsApp ile bize ulaşabilir, iletişim sayfamızdaki formu doldurabilirsiniz. En kısa sürede size dönüş yapılacaktır." },
  { q: "İşlem ücretleri hakkında bilgi alabilir miyim?", a: "Ücretler işleme ve muayeneye göre değişir. Randevu sırasında veya öncesi telefon ile detaylı bilgi alabilirsiniz." },
  { q: "Sigorta anlaşmalarınız var mı?", a: "Kurumumuzun anlaşmalı olduğu sigortalar ve ödeme seçenekleri hakkında iletişim numaramızdan bilgi alabilirsiniz." },
  { q: "İşlem öncesi hazırlık gerekir mi?", a: "İşleme göre açlık, ilaç kesimi veya başka hazırlıklar gerekebilir. Randevunuzda size özel talimatlar verilecektir." },
  { q: "Sonuçları ne zaman alırım?", a: "İşlem türüne göre sonuç süresi değişir. Patoloji veya rapor süreleri randevu sonrası size bildirilir." },
  { q: "Yanımda refakatçi gerekir mi?", a: "Sedasyon veya genel anestezi uygulanacaksa refakatçi getirmeniz önerilir. Diğer işlemlerde hekiminiz bilgi verecektir." },
  { q: "Çalışma saatleriniz nedir?", a: "Pazartesi–Cuma 08:00–17:00, Cumartesi 08:00–13:00. Randevu alırken güncel saat bilgisi verilir." },
  { q: "Nerede hizmet veriyorsunuz?", a: "Kemerkaya, İller Sk. 27-29, İmperial Hastanesi – Ortahisar/Trabzon adresinde hizmet vermekteyiz." },
];

/** Paragraf "Başlık? Metin" veya "Başlık: Metin" ile başlıyorsa [başlık, metin] döner. */
function splitSubheading(paragraph: string): { heading: string; rest: string } | null {
  const t = paragraph.trim();
  for (const prefix of SUBHEADING_PREFIXES) {
    if (t.startsWith(prefix)) {
      const rest = t.slice(prefix.length).trim();
      return rest ? { heading: prefix, rest } : null;
    }
  }
  if (t.includes("? ") && t.length < 120) {
    const i = t.indexOf("? ");
    const heading = t.slice(0, i + 1).trim();
    const rest = t.slice(i + 1).trim();
    if (rest && heading.length < 50) return { heading, rest };
  }
  return null;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const phoneUrl = "tel:" + SITE_CONFIG.phone.replace(/\s/g, "");
  const otherServices = SERVICES.filter((s) => s.slug !== slug);
  const firstContentIndex = service.body.findIndex((p) => !splitSubheading(p));
  const faqList = [...(service.faq || []), ...GENERIC_FAQS].slice(0, 8);

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetler" },
    { label: service.title },
  ];
  const faqSchema = buildFAQPageSchema(faqList, `${service.title} – Sıkça Sorulan Sorular`);
  const serviceSchema = buildServiceSchema({ title: service.title, excerpt: service.excerpt, slug });
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <main className="main-inner">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
        <div className="page-hero-banner-content">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="service-detail-layout">
        <aside className="service-detail-sidebar">
          <div className="service-detail-cta-card">
            <h2 className="service-detail-sidebar-title">Randevu ve bilgi</h2>
            <p>Bu hizmet hakkında sorularınız veya randevu talebiniz için bize ulaşabilirsiniz.</p>
            <div className="service-detail-cta-card-links">
              <a href={phoneUrl}>Hemen ara</a>
              <a href={SITE_CONFIG.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ile yaz</a>
            </div>
          </div>
          <nav className="service-detail-other" aria-label="Diğer hizmetler">
            <h2 className="service-detail-other-title">Diğer hizmetler</h2>
            <ul className="service-detail-other-list">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="section page-content service-detail-article">
          <h1>{service.title}</h1>
          {service.excerpt && (
            <p className="service-detail-excerpt">{service.excerpt}</p>
          )}
          <div className="service-detail-body">
            {service.body.map((p, i) => {
              const split = splitSubheading(p);
              if (split) {
                return (
                  <div key={i} className="service-detail-block">
                    <h2 className="service-detail-subheading">{split.heading}</h2>
                    <p>{split.rest}</p>
                  </div>
                );
              }
              const isFirst = firstContentIndex === i;
              return (
                <p key={i} className={isFirst ? "service-detail-lead" : undefined}>
                  {p}
                </p>
              );
            })}
          </div>
        </article>
      </div>
      <section className="service-detail-sss" id="sss" aria-labelledby="sss-title">
        <h2 id="sss-title" className="service-detail-sss-title">Sıkça Sorulan Sorular</h2>
        <div className="service-detail-sss-list">
          {faqList.map((item, i) => (
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
