"use client";

import { useEffect, useRef, useState } from "react";
import InstagramButton from "@/components/formulario/InstagramButton";

/**
 * Cabeçalho fixo no topo — aparece em /formulario e nos formulários Casal/Carta.
 * Instagram abre só ao clicar (botão, não link) para não redirecionar no app do Instagram.
 * Ao rolar a página, o fundo glass aparece suavemente (só opacity, sem bug de animação).
 */
export default function FormHeader() {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const next = scrolledRef.current ? y > 8 : y > 40;

      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="form-header fixed top-0 left-0 right-0 z-50">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 border-b border-white/[0.06] bg-[#050508]/75 backdrop-blur-xl transition-opacity duration-300 ease-out ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <a
          href="/formulario"
          className="font-[family-name:var(--font-playfair)] text-lg font-medium tracking-wide text-white md:text-xl"
        >
          Dotti <span className="gradient-text italic">303</span>
        </a>

        <InstagramButton variant="compact" />
      </div>
    </header>
  );
}
