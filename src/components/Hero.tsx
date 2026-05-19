"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        delay: 1.2,
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-6 text-sm font-medium tracking-[0.4em] uppercase text-rose-light/80"
          >
            Feito com amor, só para você
          </motion.p>

          <h1 className="font-[family-name:var(--font-playfair)] text-6xl leading-[1.1] font-light tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Ana
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="gradient-text block italic"
            >
              Lívia
            </motion.span>
          </h1>

          <p
            ref={subtitleRef}
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl"
          >
            Você é a estrela mais brilhante do meu universo. Cada batida do
            meu coração carrega seu nome.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div className="flex flex-col items-center gap-3">
            <span className="text-xs tracking-[0.3em] uppercase text-white/30">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-10 w-px bg-gradient-to-b from-rose/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
