"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const REVIEWS = [
  { author: "Rize'den gelen hastamız", sub: "Ameliyatsız varis tedavisi", text: "Aynı gün hem muayene hem tedavi yapıldı, iki damara lazer uygulandı. Ağrısız ve konforluydu, aynı gün taburcu oldum. Dr. Atabay'a ve ekibine teşekkürler." },
  { author: "Bayburt'tan gelen hasta", sub: "Köpük skleroterapi", text: "Varislerimde pıhtı oluşmuştu. Hem varisleri tedavi ettik hem pıhtının ana damarlara ilerlemesi engellendi. Çok memnunum, herkese tavsiye ederim." },
  { author: "Gümüşhane Şiran", sub: "Lazerle varis tedavisi", text: "Bu kadar kolay olduğunu bilseydim daha önce gelirdim. Bir saat içinde taburcu oldum. Ağrı ve şişlikler kısa sürede geçti." },
  { author: "Artvin'den gelen hasta", sub: "Ameliyatsız varis", text: "Uzaktan geliyordum, aynı gün muayene ve tedavi yapıldı. Sonuçlar mükemmel, varislerim kayboldu. Teşekkürler Dr. Atabay." },
  { author: "Trabzon / Öğretmen", sub: "İki bacak lazer + köpük", text: "Saat 15:00'te muayene için geldim, 17:00'de iki damara lazer tedavisi yapılarak taburcu edildim. Çok profesyonel ve ilgili bir ekip." },
  { author: "Batum'dan gelen hasta", sub: "Lazer tedavisi sonrası", text: "Bir ay önce lazer tedavisi yaptırdım. Kontrolde sonuçlar mükemmeldi, hatıra fotoğrafı çekilerek uğurlandım. Çok teşekkürler." },
  { author: "Lenfödem + varis hastası", sub: "Venöz yetmezlik", text: "İleri derecede lenfödemi ve venöz yetmezliğim vardı. Damar içi lazer tedavisi ile bir saat içinde taburcu oldum. Çok memnunum." },
  { author: "Köpük tedavisi sonrası", sub: "2. ay kontrol", text: "Köpük tedavisi sonrası yeşil varisler tama yakın kapandı. Kahverengi alanların da zamanla kaybolacağı söylendi. Süreç çok iyi gidiyor." },
  { author: "Her iki bacak tedavisi", sub: "1 yıl sonra kontrol", text: "Bir yıl önce her iki bacağa lazer ve köpük tedavisi yaptırdım. Kontrolde her şey yolunda, varisler bitti ağrılar geçti. Kesinlikle tavsiye ederim." },
  { author: "Varis + pıhtı hastası", sub: "Bayburt", text: "Pıhtı oluşan varislerime iki damara lazer yapıldı. Hem pıhtıların ana damara ilerlemesi engellendi hem varisler tedavi edildi. Çok teşekkürler." },
];

export function ReviewSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % 10), 6000);
    return () => clearInterval(t);
  }, []);

  const show = (i: number) => setCurrent((i + 10) % 10);

  return (
    <div className="card review-card">
      <div className="card-header">
        <h2>Hastalarımız Ne Diyor?</h2>
        <div className="review-nav-btns">
          <button type="button" className="review-nav-btn review-prev" id="review-prev" aria-label="Önceki yorum" onClick={() => show(current - 1)}>‹</button>
          <span className="review-counter" id="review-counter">{current + 1}/10</span>
          <button type="button" className="review-nav-btn review-next" id="review-next" aria-label="Sonraki yorum" onClick={() => show(current + 1)}>›</button>
        </div>
      </div>
      <div className="review-slider" id="review-slider">
        {REVIEWS.map((r, i) => (
          <div key={i} className={"review-item" + (i === current ? " active" : "")}>
            <div className="review-author">
              <div className="avatar-wrap">
                <Image src="/Dogukan-atabay.webp" alt="" className="avatar" width={56} height={56} />
              </div>
              <div className="author-info">
                <h3>{r.author}</h3>
                <p>{r.sub}</p>
              </div>
            </div>
            <p className="review-text">{r.text}</p>
            <div className="rating">★★★★★</div>
          </div>
        ))}
      </div>
    </div>
  );
}
