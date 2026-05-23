"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSite } from "@/contexts/SiteContext";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#historia", label: "História" },
  { href: "#motivos", label: "Motivos" },
  { href: "#fotos", label: "Fotos" },
  { href: "#carta", label: "Carta" },
];

export default function Navigation() {
  const { couple } = useSite();
  const lines = couple.toNameLines;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "glass py-3 shadow-lg shadow-rose/5"
            : "bg-transparent py-5"
        }`}
      >
        <motion.div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <a
            href="#inicio"
            onClick={() => setMenuOpen(false)}
            className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-wide text-white"
          >
            {lines[0]}
            {lines.length > 1 && (
              <>
                {" "}
                <span className="gradient-text">{lines.slice(1).join(" ")}</span>
              </>
            )}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium tracking-widest uppercase text-white/60 transition-colors hover:text-rose-light"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-rose to-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border transition-all duration-300 md:hidden ${
              menuOpen
                ? "border-rose/40 bg-rose/15 shadow-lg shadow-rose/20"
                : "border-white/25 bg-white/10 shadow-md shadow-black/30"
            }`}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-2 rotate-45 bg-rose-light" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45 bg-rose-light" : ""
              }`}
            />
          </button>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#050508]/80 backdrop-blur-sm md:hidden"
              aria-label="Fechar menu"
            />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-4 right-4 top-[4.5rem] z-50 overflow-hidden rounded-2xl border border-white/15 bg-[#0c0c14]/95 shadow-2xl shadow-black/50 md:hidden"
            >
              <div className="border-b border-white/10 px-5 py-3">
                <p className="text-xs font-medium tracking-[0.35em] uppercase text-gold/70">
                  Navegação
                </p>
              </div>
              <div className="flex flex-col p-3">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-4 text-base font-medium tracking-wide text-white transition-colors active:bg-rose/15 hover:bg-white/5 hover:text-rose-light"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
