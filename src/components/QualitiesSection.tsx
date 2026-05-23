"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useSite } from "@/contexts/SiteContext";

export default function QualitiesSection() {
  const site = useSite();
  const { qualities } = site;
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="motivos"
      className="section-padding relative z-10 overflow-visible"
    >
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 h-80 w-80 rounded-full bg-gold/5 blur-[100px]" />

      <motion.div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center md:mb-20"
        >
          <span className="text-sm font-medium tracking-[0.4em] uppercase text-gold/80">
            {qualities.sectionLabel}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl">
            Motivos{" "}
            <span className="gradient-text italic">{qualities.titleHighlight}</span>
          </h2>
          {qualities.subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">
              {qualities.subtitle}
            </p>
          )}
          <motion.div className="mx-auto mt-6 h-px w-24 shimmer-border" />
        </motion.div>

        <div
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {qualities.items.map((quality, i) => (
            <motion.div
              key={`${quality.title}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group glass relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:border-rose/25 hover:shadow-xl hover:shadow-rose/10 md:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose/[0.07] via-transparent to-gold/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative mb-5 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-2xl text-rose-light shadow-inner transition-colors duration-500 group-hover:border-rose/20 group-hover:bg-rose/10">
                  <span className="leading-none">{quality.icon}</span>
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-sm tracking-widest text-gold/50 transition-colors duration-500 group-hover:text-gold/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="relative font-[family-name:var(--font-playfair)] text-xl leading-snug text-white md:text-[1.35rem]">
                {quality.title}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/55 md:text-[0.9375rem]">
                {quality.description}
              </p>

              <span className="pointer-events-none absolute -bottom-4 -right-2 font-[family-name:var(--font-playfair)] text-[5.5rem] leading-none text-white/[0.025] transition-colors duration-500 group-hover:text-rose/[0.06]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
