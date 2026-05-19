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

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3 shadow-lg shadow-rose/5"
          : "bg-transparent py-5"
      }`}
    >
      <motion.div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#inicio"
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
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`h-px w-6 bg-white transition-all duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass absolute top-full left-0 right-0 md:hidden"
          >
            <div className="flex flex-col gap-1 p-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-sm font-medium tracking-widest uppercase text-white/70 transition-colors hover:text-rose-light"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
