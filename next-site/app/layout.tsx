import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildOrganizationSchema, getBaseUrl } from "@/lib/schema";
import { SITE_CONFIG } from "@/lib/content";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseUrl = getBaseUrl();
const siteName = "Uzm. Dr. Doğukan Atabay | Girişimsel Radyoloji - Trabzon";
const defaultDescription =
  "Trabzon'da girişimsel radyoloji, ameliyatsız varis ve tiroid nodül tedavisi, biyopsi ve tanı işlemleri. İmperial Hastanesi – randevu ve bilgi.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: "Uzm. Dr. Doğukan Atabay - Girişimsel Radyoloji Trabzon",
  icons: {
    icon: "/favicon.webp",
  },
  title: {
    default: siteName,
    template: "%s | Uzm. Dr. Doğukan Atabay",
  },
  description: defaultDescription,
  keywords: [
    "girişimsel radyoloji Trabzon",
    "Trabzon varis tedavisi",
    "ameliyatsız varis tedavisi",
    "tiroid nodül tedavisi Trabzon",
    "lazer varis",
    "köpük skleroterapi",
    "biyopsi Trabzon",
    "Doğukan Atabay",
    "İmperial Hastanesi Trabzon",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: baseUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: "Uzm. Dr. Doğukan Atabay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: baseUrl },
};

const organizationSchema = buildOrganizationSchema({
  name: "Uzm. Dr. Doğukan Atabay",
  phone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: SITE_CONFIG.address,
  hours: SITE_CONFIG.hours,
  url: baseUrl,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PF6D5DB3');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PF6D5DB3"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <div className="page-container">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
