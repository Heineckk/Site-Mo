"use client";

import { motion } from "framer-motion";

export default function FormLandingHero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-4 pt-24 pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,107,157,0.15)_0%,transparent_70%)]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute left-0 top-1/3 h-64 w-64 rounded-full bg-rose/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-[family-name:var(--font-playfair)] text-5xl leading-[1.1] font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Surpreenda quem
          <span className="mt-2 block gradient-text italic">você ama</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg"
        >
          Crie um site exclusivo com história, carta, fotos e muito carinho.
          Escolha o modelo, preencha o formulário e receba um presente único
          para compartilhar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#escolher-modelo"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-dark px-8 py-4 text-sm font-medium tracking-widest uppercase text-white shadow-lg shadow-rose/25 transition hover:shadow-rose/40"
          >
            Fazer meu pedido
            <span aria-hidden>↓</span>
          </a>
          <a
            href="#demonstracao"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-medium tracking-widest uppercase text-white/80 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            Ver demonstração
          </a>
        </motion.div>
      </div>
    </section>
  );
}
