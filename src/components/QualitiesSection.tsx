"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const qualities = [
  {
    icon: "✦",
    title: "Seu Sorriso",
    description:
      "Ilumina qualquer ambiente. É impossível olhar para você e não sentir que tudo vai ficar bem.",
  },
  {
    icon: "♡",
    title: "Sua Bondade",
    description:
      "Você cuida de todos ao redor com um coração enorme. Sua gentileza é contagiante e pura.",
  },
  {
    icon: "☽",
    title: "Sua Força",
    description:
      "Mesmo nos dias difíceis, você enfrenta tudo com coragem. Você me inspira a ser melhor.",
  },
  {
    icon: "✧",
    title: "Sua Risada",
    description:
      "A melhor música que já ouvi. Cada gargalhada sua é um presente que guardo no coração.",
  },
  {
    icon: "❋",
    title: "Sua Inteligência",
    description:
      "Conversar com você é descobrir novos universos. Sua mente brilhante me encanta.",
  },
  {
    icon: "∞",
    title: "Seu Amor",
    description:
      "O amor que você me dá é o tesouro mais precioso da minha vida. Eu te amo infinitamente.",
  },
];

export default function QualitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="motivos"
      ref={sectionRef}
      className="section-padding relative z-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-[0.4em] uppercase text-gold/80">
            Por que eu te amo
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl">
            Motivos <span className="gradient-text italic">Infinitos</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-24 shimmer-border" />
        </div>

        <div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {qualities.map((quality, i) => (
            <motion.div
              key={quality.title}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group glass relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:border-rose/20 hover:shadow-lg hover:shadow-rose/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative text-3xl text-rose-light">{quality.icon}</span>
              <h3 className="relative mt-4 font-[family-name:var(--font-playfair)] text-xl text-white">
                {quality.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-white/50">
                {quality.description}
              </p>
              <span className="absolute bottom-4 right-6 font-[family-name:var(--font-playfair)] text-6xl text-white/[0.03] transition-colors duration-500 group-hover:text-rose/10">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
