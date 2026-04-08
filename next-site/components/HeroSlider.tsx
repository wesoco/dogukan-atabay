"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/content";

const SLIDES = [
  { bg: "/assets/varis-tedavisi.png", title: "AMELİYATSIZ VARİS<br>TEDAVİSİ", desc: "Köpük, lazer ve radyofrekans yöntemleri ile ağrısız, kesisiz ve konforlu varis tedavisi. Aynı gün taburcu." },
  { bg: "/assets/troid.png", title: "AMELİYATSIZ TİROİD<br>NODÜL TEDAVİSİ", desc: "Ultrason eşliğinde mikrodalga ablasyon ile hedef tedavi. Aynı gün taburcu, kesisiz." },
  { bg: "/assets/radyoloji.png", title: "GİRİŞİMSEL<br>RADYOLOJİ", desc: "Görüntüleme rehberliğinde minimal invaziv tanı ve tedavi. Cerrahiye gerek kalmadan işlemler." },
  { bg: "/assets/biopsi.png", title: "BİYOPSİ & TANI<br>İŞLEMLERİ", desc: "Meme, tiroid, karaciğer ve akciğer biyopsisi. Ultrason/BT eşliğinde kesin tanı." },
];

function pad(n: number) {
  return n + 1 < 10 ? "0" + (n + 1) : String(n + 1);
}

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % 4), 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setCurrent((index + 4) % 4);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % 4), 5000);
  };

  return (
    <div className="card hero-card" id="hero-card">
      <div className="hero-card-header">
        <div className="hero-icons">
          <a href="https://wa.me/905339483076" className="icon-btn" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          </a>
          <a href={SITE_CONFIG.instagram} className="icon-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
        </div>
      </div>
      <div className="hero-slides">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={"hero-slide" + (i === current ? " active" : "")}
            data-slide={i}
            style={{ backgroundImage: `url('${s.bg}')` }}
          >
            <div className="hero-slide-overlay" />
            <div className="hero-card-body">
              <h1 dangerouslySetInnerHTML={{ __html: s.title }} />
              <p>{s.desc}</p>
              <Link href="/iletisim" className="btn btn-primary btn-hero">İLETİŞİM</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-card-footer" id="hero-slider">
        <div className="pagination">
          <span className="current-slide-num" id="hero-current-num">{pad(current)}</span>
        </div>
        <div className="slide-bars" id="hero-bars" role="tablist" aria-label="Slayt göstergeleri">
          {[0, 1, 2, 3].map((i) => (
            <button key={i} type="button" className={"bar" + (i === current ? " active" : "")} data-slide={i} aria-label={"Slayt " + (i + 1)} aria-selected={i === current} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
