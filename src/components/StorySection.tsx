"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSite } from "@/contexts/SiteContext";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const site = useSite();
  const story = site.story;
  const isEmpty = !story.paragraphs.length && !story.quote?.trim();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEmpty) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(textRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isEmpty]);

  if (isEmpty) return null;

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="section-padding relative z-10"
    >
      <motion.div className="mx-auto max-w-4xl">
        <motion.div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-[0.4em] uppercase text-gold/80"
          >
            {story.sectionLabel}
          </motion.span>
          <h2
            ref={titleRef}
            className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl"
          >
            Nossa <span className="gradient-text italic">{story.titleHighlight}</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-24 shimmer-border" />
        </motion.div>

        <motion.div ref={textRef} className="space-y-8">
          {story.paragraphs.map((text) => (
            <p
              key={text.slice(0, 40)}
              className="text-center text-lg leading-relaxed text-white/50 md:text-xl first:text-white/60"
            >
              {text}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass glow-rose mx-auto mt-16 max-w-lg rounded-2xl p-8 text-center"
        >
          <p className="font-[family-name:var(--font-playfair)] text-2xl italic text-rose-light md:text-3xl">
            &ldquo;{story.quote}&rdquo;
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
