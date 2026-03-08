import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getBaseUrl, buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/schema";

const baseUrl = getBaseUrl();
const title = "Hakkımızda | Uzm. Dr. Doğukan Atabay";
const description = "Uzm. Dr. Doğukan Atabay - Girişimsel Radyoloji Uzmanı, eğitim ve deneyim. Trabzon İmperial Hastanesi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/hakkimizda` },
  keywords: ["Doğukan Atabay", "girişimsel radyoloji uzmanı Trabzon", "İmperial Hastanesi", "hakkımızda"],
  openGraph: {
    url: `${baseUrl}/hakkimizda`,
    title,
    description,
    images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: "Uzm. Dr. Doğukan Atabay" }],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const breadcrumbItems = [{ label: "Anasayfa", href: "/" }, { label: "Hakkımızda" }];

export default function HakkimizdaPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = buildWebPageSchema({
    name: "Hakkımızda",
    description,
    url: `${baseUrl}/hakkimizda`,
    breadcrumb: breadcrumbItems,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main className="main-inner">
        <div className="page-hero-banner">
          <Image
            src="/images/about-banner.jpg"
            alt=""
            fill
            className="page-hero-banner-img"
            sizes="100vw"
            priority
          />
          <div className="page-hero-banner-overlay" aria-hidden="true" />
          <div className="page-hero-banner-content page-hero-banner-content--with-title">
            <header className="services-section-header services-section-header--on-banner">
              <span className="services-section-label">Biz kimiz</span>
              <h1 className="services-section-title">Hakkımızda</h1>
              <p className="services-section-desc">Uzm. Dr. Doğukan Atabay — Girişimsel Radyoloji Uzmanı.</p>
              <div className="services-section-line" aria-hidden="true" />
            </header>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <section className="section about-section">
          <div className="card about-card">
            <div className="about-photo-col">
              <div className="about-photo">
                <Image
                  src="/Dogukan-atabay.webp"
                  alt="Uzm. Dr. Doğukan Atabay"
                  className="about-doctor-img"
                  width={280}
                  height={340}
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="about-specialty-card">
                  <span className="about-specialty-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /></svg>
                  </span>
                  <span className="about-specialty-text">Girişimsel Radyoloji</span>
                </div>
              </div>
              <div className="about-photo-details">
                <Link href="/iletisim" className="about-more-card">
                  <span className="about-more-text">Randevu ve detaylı bilgi</span>
                  <span className="about-more-arrow" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              </div>
            </div>
            <div className="about-content">
              <h1 className="about-name">Uzm. Dr. Doğukan Atabay</h1>
              <p className="about-subtitle">Girişimsel Radyoloji Uzmanı</p>
              <p>1985 yılında Iğdır&apos;da dünyaya geldim. İlköğretim ve lise eğitimimi Iğdır&apos;da tamamladım. 2003 yılında Atatürk Üniversitesi Tıp Fakültesi&apos;nde başladığım lisans eğitimimden 2009 yılında Tıp Hekimi olarak mezun oldum. 2010-2015 yılları arasında Karadeniz Teknik Üniversitesi Tıp Fakültesi Radyoloji A.D.&apos;da Radyoloji ihtisasımı yaptım. Tez döneminde Endovasküler yolla Tedavi Edilmiş serebral Anevrizmaların orta uzun dönem takip sonuçlarını araştırdım.</p>
              <p>Devlet hizmet yükümlülüğümü Trabzon Kanuni Eğitim ve Araştırma Hastanesinde 2015-2020 yılları arasında uzman hekim olarak tamamladım. İhtisasım sırasında temel ve ileri girişimsel radyoloji kurslarını başarıyla tamamlayıp girişimsel radyoloji diplomasını aldım. Hem ihtisasım hem de zorunlu hizmetimi yaptığım Kanuni Eğitim ve Araştırma Hastanesi&apos;nde girişimsel radyolojik işlemlere ağırlık vererek çalışmalarımı sürdürdüm.</p>
              <p>Türk Tabipler Birliği, Türk Radyoloji Derneği ve Türk Girişimsel Radyoloji Derneği&apos;ne üyeyim. Günümüzde İmperial Hastanesi – Trabzon&apos;da girişimsel radyoloji, ameliyatsız varis ve tiroid nodül tedavisi ile tanı işlemlerinde hasta kabulü yapmaktayım.</p>
              <div className="about-badges">
                <span className="badge">Trabzon Tabip Odası</span>
                <span className="badge">Türk Radyoloji Derneği</span>
                <span className="badge">Türk Girişimsel Radyoloji Derneği</span>
                <span className="badge badge-lang">İngilizce</span>
              </div>
            </div>
          </div>
        </section>
        <section className="section hospital-card-section" aria-labelledby="hospital-card-title">
          <div className="card hospital-card">
            <div className="hospital-card-header">
              <span className="hospital-card-label">Çalıştığımız kurum</span>
              <h2 id="hospital-card-title" className="hospital-card-title">Özel İmperial Hastanesi</h2>
              <p className="hospital-card-lead">2007&apos;den bu yana Trabzon&apos;da hizmet veren Özel İmperial Hastanesi, Karadeniz Bölgesi&apos;nin önde gelen sağlık kuruluşlarından biridir. Uzman hekim kadrosu ve son teknoloji tanı–tedavi üniteleriyle 7/24 kesintisiz sağlık hizmeti sunmaktadır. Hastanemizde 30&apos;dan fazla tıbbi bölüm, modern ameliyathaneler, uzman anestezi ekibi ve kesintisiz acil servis bulunmaktadır. Online randevu ve e-sonuç imkânlarıyla hasta odaklı hizmet anlayışıyla çalışan İmperial Hastanesi, cerrahi, dahiliye, radyoloji ve girişimsel radyoloji dahil geniş bir yelpazede hizmet vermektedir.</p>
            </div>
            <div className="hospital-card-grid">
              <div className="hospital-card-block hospital-card-block--contact">
                <h3 className="hospital-card-block-title">Adres &amp; İletişim</h3>
                <ul className="hospital-contact-list">
                  <li className="hospital-contact-item">
                    <span className="hospital-contact-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </span>
                    <div className="hospital-contact-content">
                      <span className="hospital-contact-label">Çağrı merkezi</span>
                      <a href="tel:+904624444461" className="hospital-contact-value hospital-contact-value--link">0462 444 44 61</a>
                    </div>
                  </li>
                  <li className="hospital-contact-item">
                    <span className="hospital-contact-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </span>
                    <div className="hospital-contact-content">
                      <span className="hospital-contact-label">Diğer hatlar</span>
                      <div className="hospital-contact-numbers">
                        <a href="tel:+904624556464" className="hospital-contact-value hospital-contact-value--link">0462 455 64 64</a>
                        <a href="tel:+904624556425" className="hospital-contact-value hospital-contact-value--link">0462 455 64 25</a>
                      </div>
                    </div>
                  </li>
                  <li className="hospital-contact-item">
                    <span className="hospital-contact-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </span>
                    <div className="hospital-contact-content">
                      <span className="hospital-contact-label">E-posta</span>
                      <a href="mailto:info@imperialhastanesi.com" className="hospital-contact-value hospital-contact-value--link">info@imperialhastanesi.com</a>
                    </div>
                  </li>
                  <li className="hospital-contact-item">
                    <span className="hospital-contact-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </span>
                    <div className="hospital-contact-content">
                      <span className="hospital-contact-label">Web</span>
                      <a href="https://www.imperialhastanesi.com" target="_blank" rel="noopener noreferrer" className="hospital-contact-value hospital-contact-value--link">imperialhastanesi.com</a>
                    </div>
                  </li>
                </ul>
                <p className="hospital-contact-address">Kemerkaya Mah. Devlet Sahil Yolu Cad. İmperial Hast. No: 5, Ortahisar / Trabzon</p>
              </div>
              <div className="hospital-card-block hospital-card-block--features">
                <h3 className="hospital-card-block-title">Özellikler</h3>
                <ul className="hospital-features-list">
                  <li className="hospital-feature-item">
                    <span className="hospital-feature-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83" /></svg>
                    </span>
                    <div className="hospital-feature-content">
                      <span className="hospital-feature-name">Ameliyathane &amp; Anestezi</span>
                      <span className="hospital-feature-desc">Son teknoloji ameliyathaneler, uzman anestezi ekibi; açık ve kapalı cerrahi müdahaleler.</span>
                    </div>
                  </li>
                  <li className="hospital-feature-item">
                    <span className="hospital-feature-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    </span>
                    <div className="hospital-feature-content">
                      <span className="hospital-feature-name">7/24 Acil Servis</span>
                      <span className="hospital-feature-desc">Kesintisiz acil servis hizmeti ile hastanemiz her an ulaşılabilir durumdadır.</span>
                    </div>
                  </li>
                  <li className="hospital-feature-item">
                    <span className="hospital-feature-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    </span>
                    <div className="hospital-feature-content">
                      <span className="hospital-feature-name">Online Randevu &amp; E-sonuç</span>
                      <span className="hospital-feature-desc">Web ve telefon üzerinden randevu, e-sonuç takibi.</span>
                    </div>
                  </li>
                  <li className="hospital-feature-item">
                    <span className="hospital-feature-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                    </span>
                    <div className="hospital-feature-content">
                      <span className="hospital-feature-name">30+ Tıbbi Bölüm</span>
                      <span className="hospital-feature-desc">Cerrahi, dahiliye, radyoloji ve tanı görüntüleme dahil geniş bölüm yelpazesi.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="hospital-card-block hospital-card-block--departments">
                <h3 className="hospital-card-block-title">Bölümlerden bazıları</h3>
                <p className="hospital-card-deps-intro">Hastanemizde cerrahi, dahiliye ve tanı birimleriyle kapsamlı hizmet sunulmaktadır.</p>
                <div className="hospital-departments-tags">
                  <span className="hospital-dep-tag">Beyin ve Sinir Cerrahisi</span>
                  <span className="hospital-dep-tag">Genel Cerrahi</span>
                  <span className="hospital-dep-tag">Ortopedi</span>
                  <span className="hospital-dep-tag">Kardiyoloji</span>
                  <span className="hospital-dep-tag">Nöroloji</span>
                  <span className="hospital-dep-tag">Dahiliye</span>
                  <span className="hospital-dep-tag">Kadın Hastalıkları</span>
                  <span className="hospital-dep-tag">Çocuk Hastalıkları</span>
                  <span className="hospital-dep-tag">Göz</span>
                  <span className="hospital-dep-tag">KBB</span>
                  <span className="hospital-dep-tag">Radyoloji</span>
                  <span className="hospital-dep-tag">Acil Servis</span>
                  <span className="hospital-dep-tag">Üroloji</span>
                  <span className="hospital-dep-tag">Göğüs Hastalıkları</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
