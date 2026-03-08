"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/content";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="logo-tab-container">
        <Link href="/" className="logo-tab" aria-label="Anasayfa" onClick={closeMenu}>
          <Image
            src="/D-atabay-logo-laci-1.webp"
            alt="Dr. Doğukan Atabay"
            className="logo-img"
            width={300}
            height={56}
          />
        </Link>
        <div className="logo-curve" />
      </div>

      <button
        type="button"
        className="header-hamburger"
        aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={menuOpen}
        aria-controls="nav-drawer"
        onClick={toggleMenu}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      <div id="nav-drawer" className={`nav-container ${menuOpen ? "nav-open" : ""}`} role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen ? "true" : undefined} aria-label={menuOpen ? "Ana menü" : undefined}>
        <Link href="/" className="nav-drawer-logo" aria-label="Anasayfa" onClick={closeMenu}>
          <Image
            src="/D-atabay-logo-laci-1.webp"
            alt="Dr. Doğukan Atabay"
            className="nav-drawer-logo-img"
            width={200}
            height={40}
          />
        </Link>
        <nav className="nav-links">
          <Link href="/" onClick={closeMenu}>Anasayfa</Link>
          <Link href="/hakkimizda" onClick={closeMenu}>Hakkımızda</Link>
          <Link href="/hizmetler" onClick={closeMenu}>Hizmetlerimiz</Link>
          <Link href="/blog" onClick={closeMenu}>Blog</Link>
          <Link href="/iletisim" onClick={closeMenu}>İletişim</Link>
          <a href={SITE_CONFIG.whatsapp} className="btn btn-primary nav-cta" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            WhatsApp
          </a>
        </nav>
      </div>

      {menuOpen && (
        <div
          className="nav-overlay"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
