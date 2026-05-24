"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import EmojiDisplay from "@/components/EmojiDisplay";
import { isEmojiOnly } from "@/lib/emoji-display";
import { useSite } from "@/contexts/SiteContext";

export default function Hero() {
  const site = useSite();
  const { hero, couple } = site;
  const subtitleRef = useRef<HTMLDivElement | HTMLParagraphElement>(null);
  const emojiSubtitle = isEmojiOnly(hero.subtitle);

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
      <motion.div className="relative z-10 mx-auto max-w-5xl text-center">
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
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-[family-name:var(--font-playfair)] text-6xl leading-[1.1] font-light tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            {couple.toNameLines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.2,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`block ${i > 0 ? "gradient-text italic" : ""}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {emojiSubtitle ? (
            <div ref={subtitleRef} className="mt-12 md:mt-14">
              <EmojiDisplay text={hero.subtitle} delay={1.15} />
            </div>
          ) : (
            <p
              ref={subtitleRef}
              className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl"
            >
              {hero.subtitle}
            </p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
