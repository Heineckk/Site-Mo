"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSite } from "@/contexts/SiteContext";

gsap.registerPlugin(ScrollTrigger);

export default function QualitiesSection() {
  const site = useSite();
  const { qualities } = site;
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
      <motion.div className="mx-auto max-w-6xl">
        <motion.div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-[0.4em] uppercase text-gold/80">
            {qualities.sectionLabel}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl">
            Motivos{" "}
            <span className="gradient-text italic">{qualities.titleHighlight}</span>
          </h2>
          <motion.div className="mx-auto mt-6 h-px w-24 shimmer-border" />
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {qualities.items.map((quality, i) => (
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
        </motion.div>
      </motion.div>
    </section>
  );
}
