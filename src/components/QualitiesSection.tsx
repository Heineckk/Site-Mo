"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useSite } from "@/contexts/SiteContext";

export default function QualitiesSection() {
  const site = useSite();
  const { qualities } = site;
  const gridRef = useRef<HTMLDivElement>(null);

  if (!qualities.items.length) {
    return null;
  }

  return (
    <section
      id="motivos"
      className="section-padding relative z-10 overflow-visible"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-rose/8 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gold/6 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-rose/10 to-transparent" />

      <motion.div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center md:mb-20"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 inline-block text-2xl text-rose/40"
          >
            ♥
          </motion.span>
          <span className="block text-sm font-medium tracking-[0.4em] uppercase text-gold/80">
            {qualities.sectionLabel}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl">
            Motivos{" "}
            <span className="gradient-text italic">{qualities.titleHighlight}</span>
          </h2>
          {qualities.subtitle && (
            <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-playfair)] text-lg italic leading-relaxed text-white/50 md:text-xl">
              {qualities.subtitle}
            </p>
          )}
          <motion.div className="mx-auto mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose/40" />
            <span className="text-xs tracking-[0.35em] text-rose-light/50">♥</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>
        </motion.div>

        <div
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {qualities.items.map((quality, i) => (
            <motion.div
              key={`${quality.title}-${i}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: (i % 3) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.35 } }}
              className={`motive-card group relative flex flex-col overflow-hidden rounded-3xl p-7 md:p-8 ${
                quality.description ? "min-h-[220px]" : "min-h-[168px]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose/[0.08] via-transparent to-gold/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative mb-6 flex items-center gap-4">
                <div className="motive-number flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rose/20 text-sm font-medium tracking-wider text-gold-light">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-rose/25 via-rose/10 to-transparent" />
                <span className="motive-icon text-lg text-rose-light/70 transition-transform duration-500 group-hover:scale-110">
                  {quality.icon}
                </span>
              </div>

              {quality.description ? (
                <>
                  <h3 className="relative font-[family-name:var(--font-playfair)] text-xl leading-snug text-white md:text-[1.35rem]">
                    {quality.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/55 md:text-[0.9375rem]">
                    {quality.description}
                  </p>
                </>
              ) : (
                <p className="relative flex-1 font-[family-name:var(--font-playfair)] text-[1.05rem] italic leading-[1.75] text-white/85 md:text-[1.125rem]">
                  <span className="mr-1 text-rose-light/40">&ldquo;</span>
                  {quality.title}
                  <span className="ml-0.5 text-rose-light/40">&rdquo;</span>
                </p>
              )}

              <span className="pointer-events-none absolute -bottom-6 -right-1 select-none font-[family-name:var(--font-playfair)] text-[6rem] leading-none text-white/[0.02] transition-colors duration-500 group-hover:text-rose/[0.05]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
