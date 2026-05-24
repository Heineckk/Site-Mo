"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmojiDisplay from "@/components/EmojiDisplay";
import LetterClosing from "@/components/LetterClosing";
import { isEmojiOnly } from "@/lib/emoji-display";
import { useSite } from "@/contexts/SiteContext";

gsap.registerPlugin(ScrollTrigger);

export default function LoveLetter() {
  const site = useSite();
  const letter = site.letter;
  const sectionRef = useRef<HTMLElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  const paragraphs = letter.paragraphs;
  const lastParagraph = paragraphs[paragraphs.length - 1];
  const hasEmojiSignature =
    paragraphs.length > 0 && isEmojiOnly(lastParagraph);
  const bodyParagraphs = hasEmojiSignature
    ? paragraphs.slice(0, -1)
    : paragraphs;
  const signatureEmoji = hasEmojiSignature ? lastParagraph.trim() : undefined;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(letterRef.current, {
        scrollTrigger: {
          trigger: letterRef.current,
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.to(heartRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -60,
        rotation: 10,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="carta"
      ref={sectionRef}
      className="section-padding relative z-10 overflow-hidden"
    >
      <motion.div
        ref={heartRef}
        className="pointer-events-none absolute top-20 right-10 text-[200px] text-rose/5 select-none md:right-20"
      >
        ♥
      </motion.div>

      <motion.div className="mx-auto max-w-3xl">
        <motion.div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-[0.4em] uppercase text-gold/80">
            {letter.sectionLabel}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl">
            Carta de <span className="gradient-text italic">{letter.titleHighlight}</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-24 shimmer-border" />
        </motion.div>

        <motion.div
          ref={letterRef}
          className="glass relative rounded-3xl p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-14"
        >
          <div className="absolute top-0 left-0 h-1 w-full rounded-t-3xl bg-gradient-to-r from-rose via-gold to-rose-light" />

          <div className="space-y-6">
            {bodyParagraphs.map((text, i) => {
              if (isEmojiOnly(text)) {
                return (
                  <EmojiDisplay
                    key={i}
                    text={text}
                    delay={i * 0.1}
                  />
                );
              }

              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`leading-relaxed ${
                    i === 0
                      ? "font-[family-name:var(--font-playfair)] text-2xl text-rose-light italic"
                      : "text-white/60"
                  }`}
                >
                  {text}
                </motion.p>
              );
            })}

            <LetterClosing
              closing={letter.closing}
              signature={signatureEmoji}
              delay={bodyParagraphs.length * 0.1 + 0.2}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
